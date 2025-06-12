import { loginService } from "@/services/api/authApiServices";
import { zodResolver } from "@hookform/resolvers/zod";
import { useMutation } from "@tanstack/react-query";
import { SubmitHandler, useForm } from "react-hook-form";
import { useDispatch } from "react-redux";
import { z } from "zod";
import { setCredentials, setUser } from "../authSlice";
import { useLocation, useNavigate } from "react-router-dom";
import { LoginSchema } from "@/features/auth/schema/schema";
import { useUser } from "@/features/Profile/hooks/useUser";

type LoginFormInputs = z.infer<typeof LoginSchema>;

export const useLoginForm = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const location = useLocation();
  const destination = location.state?.from;

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors, isSubmitting },
  } = useForm<LoginFormInputs>({
    resolver: zodResolver(LoginSchema),
  });

  const { currentUser } = useUser();

  const loginUserMutation = useMutation({
    mutationKey: ["login"],
    mutationFn: async ({ email, password }: LoginFormInputs) => {
      try {
        return await loginService(email, password);
      } catch (error) {
        throw new Error(`Login service failed: ${(error as Error).message}`);
      }
    },
    onSuccess: async (response) => {
      try {
        // Check if the response contains a token
        if (!response?.data?.token) {
          throw new Error("Invalid response structure from server");
        }

        // Set the access token and persist true
        dispatch(
          setCredentials({
            isAuthenticated: true,
            persist: true,
            accessToken: response?.data?.token,
          })
        );

        // Reset the form
        reset();

        // Fetch user immediately after successful login
        const user = currentUser;

        // Set the user data
        dispatch(setUser({ user: user }));

        // Navigate to last path or home
        if (destination && typeof destination === 'object' && typeof destination.pathname === 'string') {
          navigate(destination.pathname, { replace: true });
        } else {
          navigate("/", { replace: true });
        }
      } catch (error) {
        throw new Error(`Failed to login: ${error}`);
      }
    },

    onError: (error) => {
      throw new Error(`Failed to login: ${error}`);
    },
  });

  const onSubmit: SubmitHandler<LoginFormInputs> = async (data) => {
    await loginUserMutation.mutateAsync(data);
  };

  return { register, handleSubmit, errors, isSubmitting, onSubmit };
};
