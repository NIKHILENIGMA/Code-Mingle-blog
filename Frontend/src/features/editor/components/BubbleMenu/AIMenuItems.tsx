import { LucideProps } from "lucide-react";
import { FC, ForwardRefExoticComponent } from "react";

interface AIMenuItemsProps {
  icon: ForwardRefExoticComponent<Omit<LucideProps, "ref">>;
  label: string;
  hasSubmenu?: boolean;
  submenuItems?: string[];
  handleAction: (action: string, item?: string) => void;
  action: string;
}

const AIMenuItems: FC<AIMenuItemsProps> = ({
  icon: Icon,
  label,
  hasSubmenu,
  submenuItems,
  handleAction,
  action,
}) => {
  return (
    <li className="relative group">
      <div
        className="flex items-center px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-700 cursor-pointer"
        onClick={() => !hasSubmenu && handleAction(action)}
      >
        <Icon className="w-5 h-5 mr-3 text-gray-500" />
        <span className="text-sm font-medium">{label}</span>
      </div>

      {hasSubmenu && submenuItems && (
        <ul className="absolute left-full top-0 w-64 bg-white dark:bg-gray-800 rounded-lg shadow-lg border border-gray-200 hidden group-hover:block">
          {submenuItems.map((item) => (
            <li
              key={item}
              className="flex items-center px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-700 cursor-pointer"
              onClick={() => handleAction(action, item)}
            >
              <span className="text-sm font-medium">{item}</span>
            </li>
          ))}
        </ul>
      )}
    </li>
  );
};

export default AIMenuItems;
