import { FC } from "react";
import { Button } from "@/components";
import { FilePlus2, ShieldAlert } from "@/Utils/Icons";
import { useCreateDraft } from "../../hooks/useCreateDraft";
import Logo from "@/components/Logo";
import SpinLoader from "@/components/Loader/SpinLoader";

const SideBarNewDraftButton: FC = () => {
  const { createDraftMutation } = useCreateDraft();

  const handleNewDraft = async () => {
    await createDraftMutation.mutateAsync();
  };

  return (
    <div className="w-full p-2 rounded-xl">
      <Logo />

      <div className="w-full px-1 py-2">
        <Button
          variant="secondary"
          size={"sm"}
          onClick={handleNewDraft}
          className="flex items-center justify-start w-full md:w-[80%] px-2 py-1 space-x-3 text-sm rounded-xl hover:bg-slate-200 hover:text-black"
        >
          {createDraftMutation.isPending ? (
            <p className="flex items-center w-full justify-evenly">
              <SpinLoader />
              Creating Draft...
            </p>
          ) : createDraftMutation.isError ? (
            <span className="flex items-center w-full justify-evenly">
              <ShieldAlert /> Error 
            </span>
          ) : (
            <p className="flex items-center w-full justify-evenly">
              <FilePlus2 size={18} /> New Draft
            </p>
          )}
        </Button>
      </div>
    </div>
  );
};

export default SideBarNewDraftButton;
