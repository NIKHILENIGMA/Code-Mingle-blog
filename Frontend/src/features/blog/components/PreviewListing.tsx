import React from "react";
import { Button } from "@/components";
import { Dialog, DialogContent, DialogTrigger } from "@/components/ui/dialog";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { CalendarIcon } from "@radix-ui/react-icons";
import { cn } from "@/lib/utils";
import { Calendar } from "@/components/ui/calendar";
import { format } from "date-fns";

const PreviewListing: React.FC = () => {
    const [date, setDate] = React.useState<Date>()

  return (
    <div className="space-y-2 text-black">
      <h2 className="text-lg font-semibold">Preview</h2>
      <div>
        <ul className="space-y-2 text-xs cursor-pointer">
          <li className="text-blue-600 underline active hover:text-slate-400/70">
            Heading 1
          </li>
          <li className="hover:text-slate-400/70">Heading 2</li>
          <li className="hover:text-slate-400/70">Heading 3</li>
        </ul>
      </div>
      <Button variant="outline">Save Draft</Button>
      <Dialog>
        <DialogTrigger>
          <Button variant="default">Published</Button>
        </DialogTrigger>
        <DialogContent>
          <div className="flex flex-col space-y-2">
            <Popover>
              <PopoverTrigger>
                <Button
                  variant={"outline"}
                  className={cn(
                    "w-[240px] justify-start text-left font-normal",
                    !date && "text-muted-foreground"
                  )}
                >
                  <CalendarIcon />
                  {date ? format(date, "PPP") : <span>Pick a date</span>}
                </Button>
              </PopoverTrigger>
              <PopoverContent className="w-auto p-0" align="start">
                <Calendar
                  mode="single"
                  selected={date}
                  onSelect={setDate}
                  initialFocus
                />
              </PopoverContent>
            </Popover>
          </div>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default PreviewListing;
