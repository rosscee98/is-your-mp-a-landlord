import { useRouter } from "next/router";
import { ChevronLeftIcon } from "@heroicons/react/solid";

const BackButton = () => {
  const router = useRouter();

  return (
    <button
      className="absolute top-0 left-0 flex items-center text-white p-3"
      onClick={() => router.back()}
    >
      <ChevronLeftIcon className="h-6 w-6" />
      Back
    </button>
  );
};

export default BackButton;
