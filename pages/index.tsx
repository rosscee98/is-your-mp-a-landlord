import type { NextPage } from "next";
import Head from "next/head";
import { useRouter } from "next/router";
import { useState } from "react";
import getConstituencies from "../public/get-constituencies.js";
import DisclosureBox from "../components/disclosure-box";

const constituencies = getConstituencies();
const PARLIAMENT_URL = "https://members-api.parliament.uk/api";

const Home: NextPage = () => {
  const [constituencyNameInput, setConstituencyNameInput] = useState("");
  const [constituencyNameSuggestions, setConstituencyNameSuggestions] =
    useState<string[]>(constituencies);
  const [isError, setIsError] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const router = useRouter();

  const runLandlordCheck = async () => {
    const memberId = await fetch(
      `${PARLIAMENT_URL}/Location/Constituency/Search?searchText=${encodeURI(
        constituencyNameInput
      )}`
    )
      .then((res) => res.json())
      .then(
        (body) => body.items[0].value.currentRepresentation.member.value.id
      );

    const interests = await fetch(
      `${PARLIAMENT_URL}/Members/${memberId}/RegisteredInterests`
    )
      .then((response) => response.json())
      .then((body) => body.value);

    const propertyInterestsOverview = interests.find(
      (i: any) =>
        i.name ===
        "6. Land and property portfolio: (i) value over £100,000 and/or (ii) giving rental income of over £10,000 a year"
    );

    const propertyInterests = propertyInterestsOverview?.interests;

    if (!propertyInterests) {
      router.push({
        pathname: "/is-not-landlord",
        query: { property: false },
      });
      return;
    }

    const isLandlord = propertyInterests.some((entry: any) => {
      const desc = entry.interest;
      return desc.includes("(ii)");
    });

    router.push(
      isLandlord
        ? `/is-landlord`
        : {
            pathname: `/is-not-landlord`,
            query: { property: true },
          }
    );
  };

  const handleUserInput = (userInput: string) => {
    setIsError(false);
    setConstituencyNameInput(userInput);
    const filteredConstituencies = constituencies.filter((c) =>
      c.includes(userInput)
    );
    setConstituencyNameSuggestions(filteredConstituencies);
  };

  const handleUserSubmit = async () => {
    setIsLoading(true);
    if (constituencies.indexOf(constituencyNameInput) === -1) {
      setIsError(true);
      return false;
    }
    await runLandlordCheck();
  };

  if (isLoading)
    return (
      <div className="text-center min-h-screen">
        <svg
          role="status"
          className="inline w-8 h-8 mr-2 text-gray-200 animate-spin dark:text-gray-600 fill-blue-600"
          viewBox="0 0 100 101"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z"
            fill="currentColor"
          />
          <path
            d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z"
            fill="currentFill"
          />
        </svg>
      </div>
    );

  return (
    <div className="flex min-h-screen flex-col items-center justify-center py-2">
      <Head>
        <title>Create Next App</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main className="flex flex-1 flex-col items-center justify-center px-20 text-center">
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
        <DisclosureBox />
      </main>

      <footer className="flex h-12 text-sm w-full items-center justify-center border-t">
        Created by Ross Clark.
      </footer>
    </div>
  );
};

export default Home;
