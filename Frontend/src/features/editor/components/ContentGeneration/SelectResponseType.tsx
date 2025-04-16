import { FC } from "react";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "@/components";
import { ToneType, PromptType } from "@/Types/types";

interface SelectResponseTypeProps {
  value: ToneType | PromptType;
  onChange: (value: string) => void;
  placeholder?: string;
  label?: string;
  options: {
    value: string;
    label: string;
  }[];
}

const SelectResponseType: FC<SelectResponseTypeProps> = ({
  value,
  onChange,
  placeholder = "Select Tone",
  label = "Response Tone",
  options,
}) => {
  return (
    <Select value={value} onValueChange={onChange}>
      <SelectTrigger className="w-[180px] border-secondary shadow-none">
        <SelectValue placeholder={placeholder} />
      </SelectTrigger>
      <SelectContent>
        <SelectGroup>
          <SelectLabel>{label}</SelectLabel>
          {options?.map((option) => (
            <SelectItem value={option?.value}>{option?.label}</SelectItem>
          ))}
        </SelectGroup>
      </SelectContent>
    </Select>
  );
};

export default SelectResponseType;
