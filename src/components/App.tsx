import {
  Box,
  Button,
  Flex,
  FormControl,
  FormErrorMessage,
  FormLabel,
  Heading,
  Icon,
  Image,
  Input,
  Skeleton,
  Text,
  useBoolean,
} from "@chakra-ui/react";
import { useQuery } from "@tanstack/react-query";
import { Suspense, useState } from "react";
import { BiCheck, BiErrorCircle } from "react-icons/bi";
import getLandlordInterests from "../utils/getLandlordInterests";

function ResultPanel({
  isError,
  data: { landlordInterests, name, constituency, thumbnailUrl },
}: {
  isError: boolean;
  data: {
    landlordInterests: string[];
    name: string;
    constituency: string;
    thumbnailUrl: string;
  };
}) {
  if (isError) return <Heading>Something went wrong</Heading>;

  return (
    <Box bg="white" borderRadius="2xl" py="4" px="6">
      {landlordInterests?.length ? (
        <Heading as="h3" size="2xl" color="red">
          <Icon as={BiErrorCircle} />
          Landlord
        </Heading>
      ) : (
        <Heading as="h3" size="2xl" color="green.500">
          <Icon as={BiCheck} />
          Not a landlord
        </Heading>
      )}
      <Flex flexDirection="row">
        <Image
          src={thumbnailUrl}
          borderRadius="sm"
          alt={`Headshot of ${name}`}
          fallback={<Suspense />}
        />
        <Box>
          <Heading as="h4">{name}</Heading>
          <Text>MP for {constituency}</Text>
        </Box>
      </Flex>
    </Box>
  );
}

export default function App() {
  const [currentInput, setCurrentInput] = useState("");
  const [submittedInput, setSubmittedInput] = useState("");
  const [isPostcodeError, setIsPostcodeError] = useBoolean();

  const { isInitialLoading, isError, data } = useQuery({
    queryKey: [submittedInput],
    queryFn: () => getLandlordInterests(submittedInput),
    enabled: !!submittedInput,
  });

  function handleChange(value: string) {
    if (isPostcodeError) setIsPostcodeError.off();
    setCurrentInput(value);
  }

  function handleSubmit() {
    const isValid = new RegExp(
      /^[A-Z]{1,2}[0-9]{1,2}[A-Z]?(\s*[0-9][A-Z]{1,2})?$/i
    ).test(currentInput);

    if (isValid) {
      setIsPostcodeError.off();
      setSubmittedInput(currentInput);
    } else {
      setIsPostcodeError.on();
    }
  }

  return (
    <Box m="8">
      <Heading as="h1" size="4xl" fontWeight="semibold">
        Is your MP a <span className="text-red">private landlord</span>?
      </Heading>
      <Box my="6">
        <Heading as="h2" size="lg" fontWeight="medium">
          4% of the UK public are landlords. Among MPs, it&apos;s 14%.
        </Heading>
        <Heading as="h2" size="lg" fontWeight="medium">
          Find out if your MP&apos;s one of them.
        </Heading>
      </Box>
      <Flex direction="row" gap="2">
        <FormControl isRequired isInvalid={isPostcodeError}>
          <FormLabel requiredIndicator={<></>}>Postcode</FormLabel>
          <Input
            value={currentInput}
            onChange={({ target: { value } }) => handleChange(value)}
            onKeyDown={({ key }) => {
              if (key === "Enter") handleSubmit();
            }}
            placeholder="SW1A 1AA"
            size="lg"
          />
          <FormErrorMessage>Invalid postcode</FormErrorMessage>
        </FormControl>
        <Button onClick={handleSubmit}>Search</Button>
      </Flex>
      <Skeleton isLoaded={!isInitialLoading} height="2rem">
        {data && !isPostcodeError ? (
          <ResultPanel isError={isError} data={data} />
        ) : null}
      </Skeleton>
    </Box>
  );
}
