import { FC } from "react";
import { Button } from "@/components";
import { FilePlus2 } from "@/Utils/Icons";
import { useCreateDraft } from "../../hooks/useCreateDraft";
import Logo from "@/components/Logo";

const NewDraft: FC = () => {
  const { handleNewDraft, isPending } = useCreateDraft();

  return (
    <div className="w-full p-2 rounded-xl">
      <Logo />
      
      <div className="w-full px-1 py-2">
        <Button
          variant="default"
          size={"sm"}
          onClick={handleNewDraft}
          className="flex items-center justify-start w-full md:w-[80%] px-2 py-1 space-x-3 text-sm rounded-xl hover:bg-slate-200 hover:text-black"
        >
          {isPending ? (
            "Creating Draft..."
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

export default NewDraft;
