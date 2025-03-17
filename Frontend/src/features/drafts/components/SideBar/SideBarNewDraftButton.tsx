import { FC } from "react";
import { Button } from "@/components";
import { FilePlus2, ShieldAlert } from "@/Utils/Icons";
import { useCreateDraft } from "../../hooks/useCreateDraft";
// import Logo from "@/components/Logo";
import SpinLoader from "@/components/Loader/SpinLoader";

const SideBarNewDraftButton: FC = () => {
  const { createDraftMutation } = useCreateDraft();

  const handleNewDraft = async () => {
    await createDraftMutation.mutateAsync();
  };

  return (
    <div className="w-full rounded-xl">
      <Button
        variant="default"
        size={"sm"}
        onClick={handleNewDraft}
        className="w-full flex items-center justify-start gap-2 bg-purple-600 text-white py-3 rounded-md hover:bg-purple-700 transition pl-4"
      >
        {createDraftMutation.isPending ? (
          <>
            <SpinLoader />
            Creating Draft
          </>
        ) : createDraftMutation.isError ? (
          <>
            <ShieldAlert size={20} />
            Error Creating Draft
          </>
        ) : (
          <>
            <FilePlus2 size={20} />
            New Draft
          </>
        )}
      </Button>
    </div>
  );
};

export default SideBarNewDraftButton;
