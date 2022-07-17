interface Props {
  handleUserSubmit: () => Promise<false | undefined>;
  handleUserInput: (userInput: string) => void;
  isError: boolean;
  constituencyNameSuggestions: string[];
}

const SearchView: React.FC<Props> = ({
  handleUserSubmit,
  handleUserInput,
  isError,
  constituencyNameSuggestions,
}) => {
  return (
    <>
      <h1 className="text-6xl font-bold">
        Is your MP a <span className="text-red-500">private landlord</span>?
      </h1>
      <br />
      <p className="mt-3 text-2xl">Enter your constituency to find out:</p>
      <form
        className="self-stretch items-center"
        onSubmit={async (e) => {
          e.preventDefault();
          await handleUserSubmit();
        }}
      >
        <div className="flex gap-3">
          <div className="flex flex-col w-full">
            <input
              className={`border rounded py-2 px-3 mt-5 h-10 w-full text-center ${
                isError && "border-red-500"
              }`}
              type="search"
              name="constituency-name"
              list="constituency-names"
              enterKeyHint="search"
              onChange={(event) => handleUserInput(event.target.value)}
            />
            <datalist id="constituency-names">
              {constituencyNameSuggestions.map((constituencyName, i) => {
                return <option key={i} value={constituencyName} />;
              })}
            </datalist>
            {isError && (
              <p className="text-red-500">Enter a valid constituency name</p>
            )}
          </div>
          <button
            className="bg-blue-500 text-white rounded py-2 px-3 mt-5 h-10"
            type="submit"
          >
            Submit
          </button>
        </div>
      </form>
    </>
  );
};

export default SearchView;
