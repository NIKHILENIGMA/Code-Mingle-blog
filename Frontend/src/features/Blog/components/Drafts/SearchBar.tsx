import React from "react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Search } from "@/Utils/Icons";
import { Input } from "@/components";

interface SearchBarProps {
  size?: number;
}

const SearchBar: React.FC<SearchBarProps> = ({ size }) => {
  return (
    <div>
      <Dialog>
        <DialogTrigger>
          <Search size={size} />
        </DialogTrigger>
        <DialogContent className="w-full top-20">
          <DialogHeader>
            <DialogTitle>
              Search for tags, people, articles, and more
            </DialogTitle>
            <div className="flex flex-col items-start justify-around w-full h-20">
              <Input
                type="text"
                id="search"
                autoComplete="off"
                autoCorrect="on"
                aria-label="Search"
                className="border-none outline-none focus:ring focus:outline-blue-600 focus:outline-dotted"
                placeholder="Search post and creators by username ..."
              />
            </div>
          </DialogHeader>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default SearchBar;
