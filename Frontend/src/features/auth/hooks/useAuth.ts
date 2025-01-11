import { RootState } from "@/app/store/store";
import { useSelector } from "react-redux";

export const useAuth = () => {
  /// This hook is used to get the token and persist value from the redux store
  const token = useSelector((state: RootState) => state.auth?.accessToken);

  const persist = useSelector((state: RootState) => state.auth.persist);

  return { token, persist };
};
