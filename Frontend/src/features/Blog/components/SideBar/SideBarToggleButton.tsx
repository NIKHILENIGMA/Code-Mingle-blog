import { FC } from "react";
import { Button } from "@/components/ui/button";
import { useDispatch, useSelector } from "react-redux";
import { setSideBar } from "../../slices/blogSlice";
import { RootState } from "@/app/store/store";
import { PanelLeft, PanelRight } from "@/Utils/Icons";

const SideBarToggleButton: FC = () => {
  const dispatch = useDispatch();
  const sideBarState: boolean = useSelector(
    (state: RootState) => state.blog.sideBar
  );
  const handleShowSideBar = () => {
    dispatch(setSideBar({ sideBar: !sideBarState }));
  };
  return (
    <Button
      onClick={handleShowSideBar}
      className="fixed sm:absolute z-20 right-[-20%]"
      variant="link"
    >
      {sideBarState ? <PanelRight size={18} /> : <PanelLeft size={18} />}
    </Button>
  );
};

export default SideBarToggleButton;
