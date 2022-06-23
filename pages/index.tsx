import type { NextPage } from "next";
import Head from "next/head";
import { useRouter } from "next/router";
import { useState } from "react";

const PARLIAMENT_URL = "https://members-api.parliament.uk/api";

const Home: NextPage = () => {
  const [name, setName] = useState("");
  const router = useRouter();

  const runLandlordCheck = async () => {
    const memberId = await fetch(
      `${PARLIAMENT_URL}/Members/Search?Name=${encodeURI(name)}`
    )
      .then((res) => res.json())
      .then((body) => body.items[0].value.id);

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

  return (
    <div className="flex min-h-screen flex-col items-center justify-center py-2">
      <Head>
        <title>Create Next App</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main className="flex w-full flex-1 flex-col items-center justify-center px-20 text-center">
        <h1 className="text-6xl font-bold">
          Is your MP a <span className="text-red-500">private landlord</span>?
        </h1>
        <br />
        <p className="mt-3 text-2xl">Enter your MP&apos;s name to find out:</p>
        <input
          className="border rounded py-2 px-3 mt-5 w-full text-center"
          onChange={(event) => setName(event.target.value)}
        />
        <button
          className="bg-blue-500 text-white rounded py-2 px-3 mt-5"
          onClick={runLandlordCheck}
        >
          Submit
        </button>
      </main>

      <footer className="flex h-12 text-sm w-full items-center justify-center border-t">
        Created by Ross Clark.
      </footer>
    </div>
  );
};

export default Home;
