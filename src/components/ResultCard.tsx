import {
  Box,
  Card,
  CardBody,
  CardHeader,
  Code,
  Flex,
  Heading,
  Icon,
  Image,
  ListItem,
  Skeleton,
  Text,
  UnorderedList,
} from "@chakra-ui/react";
import { BiCheck, BiErrorCircle } from "react-icons/bi";

export default function ResultCard({
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
    <Card
      direction="column"
      border="2px dashed"
      borderColor={isLandlord ? "red" : "green.500"}
    >
      <CardHeader pb="0">
        <Heading
          as="h2"
          size="2xl"
          color={isLandlord ? "red" : "green.500"}
          display="flex"
          alignItems="center"
          gap="2"
        >
          {isLandlord ? (
            <>
              <Icon as={BiErrorCircle} />
              Landlord
            </>
          ) : (
            <>
              <Icon as={BiCheck} />
              Not a landlord
            </>
          )}
        </Heading>
      </CardHeader>
      <CardBody>
        <Flex flexDirection={{ base: "column", md: "row" }} gap="4">
          <Image
            src={thumbnailUrl}
            borderRadius="sm"
            alt={`Headshot of ${name}`}
            fallback={<Skeleton height="240px" width="240px" />}
            maxHeight="240px"
            maxWidth="240px"
          />
          <Box>
            <Heading as="h3">{name}</Heading>
            <Heading as="h4" size="md">
              MP for {constituency}
            </Heading>
            <Box mt="4">
              {isLandlord ? (
                <>
                  <Text mb="2">Your MP has declared rental income.</Text>
                  <Text mb="2">
                    They make £10,000 or more in rent annually from each of the
                    following:
                  </Text>
                  <UnorderedList>
                    {landlordInterests.map((interest) => (
                      <ListItem key={interest} m={{ base: "2", md: "1" }}>
                        <Code>&quot;{interest}&quot;</Code>
                      </ListItem>
                    ))}
                  </UnorderedList>
                </>
              ) : (
                <>
                  <Text mb="2">
                    They haven&apos;t declared any rental income.
                  </Text>
                  <Text>
                    Note: MPs don&apos;t need to declare any interests that make
                    them under £10,000 in annual rental income. This means they
                    could still be a landlord on a smaller scale, or have
                    multiple smaller interests.
                  </Text>
                </>
              )}
            </Box>
          </Box>
        </Flex>
      </CardBody>
    </Card>
  );
}
