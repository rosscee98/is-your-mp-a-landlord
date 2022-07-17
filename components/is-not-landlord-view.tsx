import BackButton from "./back-button";

const IsNotLandlordView: React.FC = () => {
  return (
    <div className="flex flex-col items-center justify-center py-2 bg-green-500">
      <h1 className="text-6xl font-bold text-white">Not a landlord!</h1>
      <br />
      <p className="text-white">
        Your MP has not declared rental income of £10,000 or more per year.
      </p>
    </div>
  );
};

export default IsNotLandlordView;
