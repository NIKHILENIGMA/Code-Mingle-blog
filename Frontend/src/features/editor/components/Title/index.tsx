import { Input } from "@/components";
import { useDebounce } from "@/hooks/useDebounce";
import { FC, useEffect, useState } from "react";

const Title: FC = () => {
  const [title, setTitle] = useState("");
  const debouncedValue = useDebounce(title, 2000);
  console.log(debouncedValue);

  useEffect(() => {}, [debouncedValue]);

  return (
    <div>
      <Input
        type="text"
        value={title}
        placeholder="Title"
        onChange={() => setTitle(debouncedValue)}
        className="w-full text-4xl font-bold focus:outline-hidden p-5 py-8 outline-hidden border-0 focus:border-0 focus:ring-0"
      />
    </div>
  );
};

export default Title;
