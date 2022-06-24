import type { NextPage } from "next";
import Head from "next/head";
import { useRouter } from "next/router";
import { useState } from "react";
import getConstituencies from "../public/get-constituencies.js";

const constituencies = getConstituencies();
const PARLIAMENT_URL = "https://members-api.parliament.uk/api";

const Home: NextPage = () => {
  const [constituencyNameInput, setConstituencyNameInput] = useState("");
  const [constituencyNameSuggestions, setConstituencyNameSuggestions] =
    useState<string[]>([]);
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
    setConstituencyNameInput(userInput);
    const filteredConstituencies = constituencies.filter((c) =>
      c.includes(userInput)
    );
    setConstituencyNameSuggestions(filteredConstituencies);
  };

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
        <p className="mt-3 text-2xl">Enter your MP&apos;s name to find out:</p>
        <form
          onSubmit={async (e) => {
            e.preventDefault();
            await runLandlordCheck();
          }}
        >
          <div className="flex gap-3">
            <input
              className="border rounded py-2 px-3 mt-5 w-full text-center"
              type="text"
              name="name"
              list="constituency-names"
              onChange={(event) => handleUserInput(event.target.value)}
            />
            <datalist id="constituency-names">
              {constituencyNameSuggestions.map((constituencyName, i) => {
                return <option key={i} value={constituencyName} />;
              })}
            </datalist>
            <button
              className="bg-blue-500 text-white rounded py-2 px-3 mt-5"
              type="submit"
            >
              Submit
            </button>
          </div>
        </form>
      </main>

      <footer className="flex h-12 text-sm w-full items-center justify-center border-t">
        Created by Ross Clark.
      </footer>
    </div>
  );
};

export default Home;
