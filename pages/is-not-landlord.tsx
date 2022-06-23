import type { NextPage } from "next";
import BackButton from "../components/back-button";

type Props = {
  router?: {
    query: {
      property: string;
    };
  };
};

const IsNotLandlord: NextPage = (props: Props) => {
  const property = props?.router?.query?.property;

  return (
    <div className="flex min-h-screen flex-col items-center justify-center py-2 bg-green-500">
      <main className="flex w-full flex-1 flex-col items-center justify-center px-20 text-center">
        <BackButton />
        <h1 className="text-6xl font-bold text-white">Not a landlord!</h1>
        <br />
        {property === "true" ? (
          <p className="text-white">
            Your MP has declared property interests, but they do not report
            rental income of £10,000 or more per year.
          </p>
        ) : (
          <p className="text-white">
            Your MP has declared no property interests.
          </p>
        )}
      </main>
    </div>
  );
};

export default IsNotLandlord;
