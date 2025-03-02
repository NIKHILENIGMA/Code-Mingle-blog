import { useDispatch, useSelector } from "react-redux";
import { RootState } from "@/app/store/store";
import { useUser } from "@/features/Profile/hooks/useUser";
import { setUser } from "@/features/auth/authSlice";
import { useEffect } from "react";

export const useUserLoggedIn = () => {
  const dispatch = useDispatch();
  const { user } = useSelector((state: RootState) => state.auth);
  const { currentUser } = useUser();

  useEffect(() => {
    if (!user) {
      dispatch(setUser({ user: currentUser }));
    }
  }, [currentUser, dispatch, user]);

  return { user };
};
