import { RootState } from "@/app/store/store";
import { useSelector } from "react-redux";

export const useImage = () => {
  const blogCoverImg = useSelector(
    (state: RootState) => state.blog?.coverImageUrl
  );
  return { blogCoverImg };
};
