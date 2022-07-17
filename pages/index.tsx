import type { NextPage } from "next";
import Head from "next/head";
import { useState } from "react";
import getConstituencies from "../public/get-constituencies.js";
import DisclosureBox from "../components/disclosure-box";
import SearchView from "../components/search-view";
import IsLandlordView from "../components/is-landlord-view";
import BackButton from "../components/back-button";
import IsNotLandlordView from "../components/is-not-landlord-view";
import Spinner from "../components/spinner";

const constituencies = getConstituencies();
const lowercaseConstituencies = constituencies.map((c) => c.toLowerCase());
const PARLIAMENT_URL = "https://members-api.parliament.uk/api";

const Home: NextPage = () => {
  const [showSearch, setShowSearch] = useState(true);
  const [isLandlord, setIsLandlord] = useState<boolean | null>(null);
  const [constituencyNameInput, setConstituencyNameInput] = useState("");
  const [constituencyNameSuggestions, setConstituencyNameSuggestions] =
    useState<string[]>(constituencies);
  const [isError, setIsError] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

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
    const isLandlord =
      propertyInterests &&
      propertyInterests.some((entry: any) => {
        const desc = entry.interest;
        return desc.includes("(ii)");
      });

    setIsLandlord(isLandlord);
  };

  const handleUserInput = (input: string) => {
    const lowercaseInput = input.toLowerCase();
    setIsError(false);
    setConstituencyNameInput(lowercaseInput);
    const filteredConstituencies = constituencies.filter((c) =>
      c.toLowerCase().includes(lowercaseInput)
    );
    setConstituencyNameSuggestions(filteredConstituencies);
  };

  const handleUserSubmit = async () => {
    setIsLoading(true);
    if (lowercaseConstituencies.indexOf(constituencyNameInput) === -1) {
      setIsError(true);
      setIsLoading(false);
      return false;
    }
    await runLandlordCheck();
    setShowSearch(false);
    setIsLoading(false);
  };

  if (isLoading) return <Spinner />;

  return (
    <div
      className={`flex min-h-screen flex-col items-center justify-center py-2 
        ${!showSearch && isLandlord && "bg-red-500"}
        ${!showSearch && !isLandlord && "bg-green-500"}
      `}
    >
      <Head>
        <title>Create Next App</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main className="flex flex-1 flex-col items-center justify-center px-20 text-center md:w-9/12">
        {!showSearch && <BackButton setShowSearch={setShowSearch} />}
        {showSearch && (
          <>
            <SearchView
              handleUserSubmit={handleUserSubmit}
              handleUserInput={handleUserInput}
              isError={isError}
              constituencyNameSuggestions={constituencyNameSuggestions}
            />
            <p className="mt-2">
              Not sure what constituency you&apos;re in? Check on the{" "}
              <a
                href="https://members.parliament.uk/constituencies"
                target="_blank"
                className="text-blue-500 underline"
                rel="noreferrer"
              >
                official Parliament website.
              </a>
            </p>
          </>
        )}
        {!showSearch && isLandlord && <IsLandlordView />}
        {!showSearch && !isLandlord && <IsNotLandlordView />}
        <DisclosureBox />
      </main>

      <footer className="flex h-12 text-sm w-full items-center justify-center">
        Created by Ross Clark :)
      </footer>
    </div>
  );
};

export default Home;
