import { FC, useState, useEffect } from "react";
import {
  Select,
  SelectTrigger,
  SelectValue,
  SelectContent,
  SelectGroup,
  SelectLabel,
  SelectItem,
} from "@/components/ui/select"; // Adjust to your component path
import { LanguageType } from "../../types";
import { languageOptions } from "@/constants/constants";

interface SelectLanguageProps {
  currentLanguage: LanguageType;
  updateAttributes: (attrs: { language: LanguageType }) => void;
}

export const SelectLanguage: FC<SelectLanguageProps> = ({
  currentLanguage,
  updateAttributes,
}) => {
  const [language, setLanguage] = useState<LanguageType>(currentLanguage);

  useEffect(() => {
    setLanguage(currentLanguage);
  }, [currentLanguage]);

  const handleLanguageChange = (value: LanguageType) => {
    setLanguage(value);
    updateAttributes({ language: value });
  };

  return (
    <Select value={language} onValueChange={handleLanguageChange} >
      <SelectTrigger className="w-[96px] text-foreground bg-background">
        <SelectValue placeholder="Language" />
      </SelectTrigger>
      <SelectContent>
        <SelectGroup>
          <SelectLabel>Languages</SelectLabel>
          {languageOptions.map((lang) => (
            <SelectItem key={lang} value={lang}>
              {lang.charAt(0).toUpperCase() + lang.slice(1)}
            </SelectItem>
          ))}
        </SelectGroup>
      </SelectContent>
    </Select>
  );
};
