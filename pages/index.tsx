import type { NextPage } from 'next'
import Head from 'next/head'
import Image from 'next/image'
import { useRouter } from 'next/router'
import { useState } from 'react'

const PARLIAMENT_URL = 'https://members-api.parliament.uk/api'

const Home: NextPage = () => {
  const [name, setName] = useState('');
  const router = useRouter();

  const isLandlord = async () => {
    const memberId = await fetch(`${PARLIAMENT_URL}/Members/Search?Name=${encodeURI(name)}`)
      .then((res) => res.json())
      .then((body) => body.items[0].value.id);

    const interests = await fetch(`${PARLIAMENT_URL}/Members/${memberId}/RegisteredInterests`)
      .then((response) => response.json())
      .then((body) => body.value);

    const propertyInterestsOverview = interests
      .find((i) => i.name === '6. Land and property portfolio: (i) value over £100,000 and/or (ii) giving rental income of over £10,000 a year');

    const propertyInterests = propertyInterestsOverview?.interests;

    if (!propertyInterests) {
      router.push('/is-not-landlord');
      return;
    }

    const isLandlord = propertyInterests.some((entry) => {
      const desc = entry.interest;
      return desc.includes("(ii)");
    });

    router.push(`${isLandlord ? '/is-landlord' : '/is-not-landlord'}`);
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
        <p className="mt-3 text-2xl">
          Enter your MP's name to find out:
        </p>
        <input className="border rounded py-2 px-3 mt-10 w-full text-center" onChange={(event) => setName(event.target.value)} />
        <button className="bg-blue-500 text-white rounded py-2 px-3 mt-5" onClick={isLandlord}>Submit</button>
      </main>

      <footer className="flex h-24 w-full items-center justify-center border-t">
        Created by Ross Clark.
      </footer>
    </div>
  )
}

export default Home
