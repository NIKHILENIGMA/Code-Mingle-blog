import { RootState } from "@/app/store/store";
import { useSelector } from "react-redux";

export const useAuth = () => {
  const token = useSelector((state: RootState) => state.auth?.accessToken);

  const persist = useSelector((state: RootState) => state.auth.persist);

  return { token, persist };
};
