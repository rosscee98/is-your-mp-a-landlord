import type { NextPage } from "next";

const IsLandlord: NextPage = () => {
  return (
    <div className="flex min-h-screen flex-col items-center justify-center py-2 bg-red-500">
      <main className="flex w-full flex-1 flex-col items-center justify-center px-20 text-center">
        <h1 className="text-6xl font-bold text-white">
          Your MP is a landlord.
        </h1>
        <br />
        <p className="text-white">
          According to the Register of Members&apos; Financial Interests, your
          MP makes £10,000 or more per year from rental income.
        </p>
      </main>
    </div>
  );
};

export default IsLandlord;
