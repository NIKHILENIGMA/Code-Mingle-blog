import { useState } from "react";
import { ChevronDownIcon, ChevronRightIcon } from "lucide-react";
import { Checkbox } from "@/components/ui/checkbox";

const FilterSidebar = () => {
  // Toggle states for collapsible sections
  const [isSizeOpen, setIsSizeOpen] = useState(false);
  const [isPriceOpen, setIsPriceOpen] = useState(false);

  return (
    <aside className="w-full md:w-1/4 max-h-[60vh] overflow-y-auto bg-background border rounded-lg p-4 shadow-xs hide-scrollbar">
      {/* Header */}
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-lg font-semibold text-purple-600">Filters</h2>
        <button className="text-sm text-gray-500 hover:text-purple-600">
          Reset
        </button>
      </div>

      {/* Category Filter */}
      <div className="mb-4">
        <button className="text-md font-semibold flex items-center justify-between cursor-pointer">
          Category
          <ChevronDownIcon className="w-4 h-4" />
        </button>
        <div className="mt-3 space-y-2">
          {["Technology", "Meditation", "Lifestyle", "Food"].map(
            (item, idx) => (
              <label key={idx} className="flex items-center text-gray-700 space-x-2">
                <Checkbox />
                <span>{item}</span>
              </label>
            )
          )}
          <button className="text-sm text-purple-600 hover:underline mt-2">
            See More
          </button>
        </div>
      </div>

      <hr className="my-4" />

      {/* Size Filter (Collapsible) */}
      <div className="mb-4">
        <button
          onClick={() => setIsSizeOpen(!isSizeOpen)}
          className="w-full flex justify-between items-center text-md font-semibold cursor-pointer"
        >
          Size
          {isSizeOpen ? (
            <ChevronDownIcon className="w-4 h-4" />
          ) : (
            <ChevronRightIcon className="w-4 h-4" />
          )}
        </button>

        {isSizeOpen && (
          <div className="mt-3 space-y-2 ">
            {["Small", "Medium", "Large"].map((size, idx) => (
              <label key={idx} className="flex items-center text-gray-700">
                <Checkbox />
                <span className="px-2">{size}</span>
              </label>
            ))}
          </div>
        )}
      </div>

      <hr className="my-4" />

      {/* Price Filter (Collapsible) */}
      <div className="mb-4">
        <button
          onClick={() => setIsPriceOpen(!isPriceOpen)}
          className="w-full flex justify-between items-center text-md font-semibold cursor-pointer"
        >
          Price
          {isPriceOpen ? (
            <ChevronDownIcon className="w-4 h-4" />
          ) : (
            <ChevronRightIcon className="w-4 h-4" />
          )}
        </button>

        {isPriceOpen && (
          <div className="mt-3 space-y-2">
            {["$0 - $50", "$50 - $100", "$100+"].map((price, idx) => (
              <label key={idx} className="flex items-center text-gray-700 space-x-2">
                <Checkbox />
                <span>{price}</span>
              </label>
            ))}
          </div>
        )}
      </div>

      <hr className="my-4" />
    </aside>
  );
};

export default FilterSidebar;
