import { ChevronLeftIcon } from "@heroicons/react/solid";
import { Dispatch, SetStateAction } from "react";

interface Props {
  setShowSearch: Dispatch<SetStateAction<boolean>>;
}

const BackButton = ({ setShowSearch }: Props) => {
  return (
    <button
      className="absolute top-0 left-0 flex items-center text-white p-3"
      onClick={() => setShowSearch(true)}
    >
      <ChevronLeftIcon className="h-6 w-6" />
      Back
    </button>
  );
};

export default BackButton;
