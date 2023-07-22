import { Button, Input, Text } from "@chakra-ui/react";
import { useQuery } from "@tanstack/react-query";
import { useState } from "react";

async function fetchData(input: string) {
  console.log("fetching!");
  return input;
}

export default function App() {
  const [input, setInput] = useState("");

  const { isInitialLoading, isError, error, data, refetch } = useQuery<
    string,
    Error
  >({
    queryKey: [input],
    queryFn: () => fetchData(input),
    enabled: false,
  });

  if (isInitialLoading) return <Text>Loading...</Text>;

  if (isError) return <Text>An error occurred: {error.message}</Text>;

  return (
    <>
      <Text>Is your MP a private landlord?</Text>
      <Text>Enter your postcode below to find out:</Text>
      <Input
        value={input}
        onChange={({ target: { value } }) => setInput(value)}
        placeholder="SW1A 1AA"
      />
      <Button onClick={() => refetch()}>Submit</Button>
      <Text>{data}</Text>
    </>
  );
}
