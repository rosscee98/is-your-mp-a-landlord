import BackButton from "./back-button";

const IsLandlordView: React.FC = () => {
  return (
    <div className="flex flex-col items-center justify-center py-2 bg-red-500">
      <h1 className="text-6xl font-bold text-white">Your MP is a landlord.</h1>
      <br />
      <p className="text-white">
        According to the Register of Members&apos; Financial Interests, your MP
        makes £10,000 or more per year from rental income.
      </p>
    </div>
  );
};

export default IsLandlordView;
