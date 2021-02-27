import { AiOutlineCopy, AiOutlineEdit, AiOutlineDelete, AiOutlineShareAlt } from "react-icons/ai";
import { IconType } from "react-icons";

interface IMenu {
  text: string;
  icon: IconType;
};

const menuList: IMenu[] = [
  { text: "Edit", icon: AiOutlineEdit },
  { text: "Duplicate", icon: AiOutlineCopy },
  { text: "Share", icon: AiOutlineShareAlt },
];

export default function ContextMenu({ show }: { show: boolean }) {
  return (
    <div className={`mx-3 origin-top-right absolute right-7 top-0 w-48 mt-1 rounded-md shadow-lg z-10 bg-white ring-1 ring-black ring-opacity-5 divide-y divide-gray-200 ${show ? "" : "hidden"}`}>
      <div className="py-1">
        {
          menuList.map(m => {
            return (
              <div className="cursor-pointer group flex items-center px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 hover:text-gray-900">
                <m.icon className="mr-3 h-5 w-5 text-gray-400 group-hover:text-gray-500" />
                {m.text}
              </div>
            );
          })
        }
      </div>
      <div className="py-1">
        <div className="cursor-pointer group flex items-center px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 hover:text-gray-900">
          <AiOutlineDelete className="mr-3 h-5 w-5 text-gray-400 group-hover:text-gray-500" />
          Delete
        </div>
      </div>
    </div>
  );
}
