import { Button, Input, Text } from "@chakra-ui/react";
import { useState } from "react";

export default function App() {
  const [input, setInput] = useState("");

  return (
    <>
      <Text>Is your MP a private landlord?</Text>
      <Text>Enter your postcode below to find out:</Text>
      <Input
        value={input}
        onChange={({ target: { value } }) => setInput(value)}
        placeholder="SW1A 1AA"
      />
      <Button>Submit</Button>
      <Text>{input}</Text>
    </>
  );
}
