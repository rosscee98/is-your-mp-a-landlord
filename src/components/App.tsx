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
  ListItem,
  Skeleton,
  Text,
  UnorderedList,
  useBoolean,
} from "@chakra-ui/react";
import { useQuery } from "@tanstack/react-query";
import { useState } from "react";
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

  const isLandlord = landlordInterests?.length;

  return (
    <Flex
      direction="column"
      bg="white"
      borderRadius="2xl"
      py="4"
      px="6"
      border="3px dashed"
      borderColor={isLandlord ? "red" : "green"}
      gap="4"
    >
      {isLandlord ? (
        <Heading
          as="h3"
          size="2xl"
          color="red"
          textDecoration="underline"
          display="flex"
        >
          Landlord <Icon as={BiErrorCircle} ml="2" />
        </Heading>
      ) : (
        <Heading
          as="h3"
          size="2xl"
          color="green.500"
          textDecoration="underline"
          display="flex"
        >
          Not a landlord <Icon as={BiCheck} />
        </Heading>
      )}
      <Flex flexDirection={{ base: "column", md: "row" }} gap="4">
        <Image
          src={thumbnailUrl}
          borderRadius="sm"
          alt={`Headshot of ${name}`}
          fallback={<Skeleton maxHeight="240px" maxWidth="240px" />}
          maxHeight="240px"
          maxWidth="240px"
        />
        <Box>
          <Heading as="h4">{name}</Heading>
          <Heading as="h5" size="md">
            MP for {constituency}
          </Heading>
          <Box my="2">
            {isLandlord ? (
              <>
                <Text>Your MP has declared rental income.</Text>
                <Text>
                  They make £10,000 or more in rent annually from each of the
                  following:
                </Text>
                <UnorderedList>
                  {landlordInterests.map((interest) => (
                    <ListItem key={interest}>&quot;{interest}&quot;</ListItem>
                  ))}
                </UnorderedList>
              </>
            ) : (
              <>
                <Text>They haven&apos;t declared any rental income.</Text>
                <Text>
                  Note that MPs don&apos;t need to declare any interests that
                  make them under £10,000 in annual rental income. This means
                  they could still be a landlord on a smaller scale, or have
                  multiple smaller interests.
                </Text>
              </>
            )}
          </Box>
        </Box>
      </Flex>
    </Flex>
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
          1 in 6 MPs are landlords. Find out if your MP&apos;s one of them.
        </Heading>
      </Box>
      <FormControl isRequired isInvalid={isPostcodeError}>
        <FormLabel requiredIndicator={<></>} fontWeight="bold" size="lg">
          Postcode
        </FormLabel>
        <Flex>
          <Input
            value={currentInput}
            onChange={({ target: { value } }) => handleChange(value)}
            onKeyDown={({ key }) => {
              if (key === "Enter") handleSubmit();
            }}
            placeholder="SW1A 1AA"
            size="lg"
            maxWidth="12rem"
            backgroundColor="white"
          />
          <Button size="lg" ml="4" colorScheme="blue" onClick={handleSubmit}>
            Search
          </Button>
        </Flex>
        <FormErrorMessage>Invalid postcode</FormErrorMessage>
      </FormControl>
      <Skeleton isLoaded={!isInitialLoading} height="20rem" mt="6">
        {data && !isPostcodeError ? (
          <ResultPanel isError={isError} data={data} />
        ) : null}
      </Skeleton>
    </Box>
  );
}
