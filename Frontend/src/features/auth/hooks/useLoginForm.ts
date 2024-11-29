import { loginService } from "@/services/api/authServices";
import { zodResolver } from "@hookform/resolvers/zod";
import { useMutation } from "@tanstack/react-query";
import { SubmitHandler, useForm } from "react-hook-form";
import { useDispatch } from "react-redux";
import { z } from "zod";
import { setAccessToken, setPersist } from "../authSlice";
import { useNavigate } from "react-router-dom";

const schema = z.object({
  email: z.string().email(),
  password: z.string().min(8),
});

type LoginFormInputs = z.infer<typeof schema>;

export const useLoginForm = () => {
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors, isSubmitting },
  } = useForm<LoginFormInputs>({
    resolver: zodResolver(schema),
  });

  const dispatch = useDispatch();
  const navigate = useNavigate();

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

      console.log("Login successfully: ", response.data);

      // Set the access token in the store
      dispatch(
        setAccessToken({
          accessToken: response.data?.token,
        })
      );

      // Set the persist flag in the store
      dispatch(setPersist({ persist: true }));
      
      // Reset the form
      reset();

      // Navigate to the home page
      navigate("/");
    } catch (error) {
      throw new Error(`Failed to login: ${error}`);
    }
  };

  return { register, handleSubmit, errors, isSubmitting, onSubmit };
};
