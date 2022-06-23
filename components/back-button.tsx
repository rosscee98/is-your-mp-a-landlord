import { useRouter } from "next/router";

const BackButton = () => {
  const router = useRouter();

  return (
    <button
      className="absolute top-0 left-0 flex items-center text-white p-3"
      onClick={() => router.back()}
    >
      <svg
        xmlns="http://www.w3.org/2000/svg"
        className="h-6 w-6"
        fill="none"
        viewBox="0 0 24 24"
        stroke="currentColor"
        strokeWidth={2}
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          d="M15 19l-7-7 7-7"
        />
      </svg>
      Back
    </button>
  );
};

export default BackButton;
