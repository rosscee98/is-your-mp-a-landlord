import { Button, Heading, Input, Text } from "@chakra-ui/react";
import { useQuery } from "@tanstack/react-query";
import { useState } from "react";
import getMember from "../utils/getMember";

export default function App() {
  const [currentInput, setCurrentInput] = useState("");
  const [submittedInput, setSubmittedInput] = useState("");

  const { isInitialLoading, isError, error, data } = useQuery<string, Error>({
    queryKey: [submittedInput],
    queryFn: () => getMember(submittedInput),
    enabled: !!submittedInput,
  });

  function handleSubmit() {
    setSubmittedInput(currentInput);
  }

  if (isInitialLoading) return <Text>Loading...</Text>;

  if (isError) return <Text>An error occurred: {error.message}</Text>;

  return (
    <>
      <Text>Is your MP a private landlord?</Text>
      <Text>Enter your postcode below to find out.</Text>
      <Input
        value={currentInput}
        onChange={({ target: { value } }) => setCurrentInput(value)}
        onKeyDown={({ key }) => {
          if (key === "Enter") handleSubmit();
        }}
        placeholder="SW1A 1AA"
      />
      <Button onClick={() => handleSubmit()}>Submit</Button>
      <Heading>{data}</Heading>
    </>
  );
}
