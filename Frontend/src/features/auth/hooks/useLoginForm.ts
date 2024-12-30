import { currentUserService, loginService } from "@/services/api/authServices";
import { zodResolver } from "@hookform/resolvers/zod";
import { useMutation } from "@tanstack/react-query";
import { SubmitHandler, useForm } from "react-hook-form";
import { useDispatch } from "react-redux";
import { z } from "zod";
import { setAccessToken, setPersist, setUser } from "../authSlice";
import { useLocation, useNavigate } from "react-router-dom";
import { LoginSchema } from "@/features/auth/schema/schema";

type LoginFormInputs = z.infer<typeof LoginSchema>;

export const useLoginForm = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const location = useLocation();
  const from = location.state?.from?.pathname || "/";
  console.log("From: ", location.state?.from);

  
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors, isSubmitting },
  } = useForm<LoginFormInputs>({
    resolver: zodResolver(LoginSchema),
  });


  /**
   * Custom hook that provides a mutation function to log in a user.
   *
   * @returns An object containing the `mutateAsync` function renamed to `loginUserMutation`.
   *
   *
   * @throws Will throw an error if the login service fails.
   */

  const { mutateAsync: loginUserMutation } = useMutation({
    mutationFn: async ({ email, password }: LoginFormInputs) => {
      try {
        const response = await loginService(email, password);

        return response;
      } catch (error) {
        throw new Error(`Login service failed: ${(error as Error).message}`);
      }
    },
  });

  const onSubmit: SubmitHandler<LoginFormInputs> = async (data) => {
    try {
      // Call the loginService function with the email and password
      const response = await loginUserMutation(data);

      if (!response?.data?.token) {
        throw new Error("Invalid response structure from server");
      }

      console.info("Login successfully: ", response.data);

      // Set the access token in the store
      dispatch(setAccessToken({ accessToken: response.data?.token }));

      // Set the persist flag in the store
      dispatch(setPersist({ persist: true }));

      // Reset the form
      reset();

      const user = await currentUserService();

      dispatch(setUser({ user }));

      // Navigate to the home page
      navigate(from)
    } catch (error) {
      throw new Error(`Failed to login: ${error}`);
    }
  };

  return { register, handleSubmit, errors, isSubmitting, onSubmit };
};
