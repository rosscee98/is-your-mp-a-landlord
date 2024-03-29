import {
  Accordion,
  AccordionButton,
  AccordionIcon,
  AccordionItem,
  AccordionPanel,
  Flex,
  Heading,
  Icon,
  Link,
  ListItem,
  Text,
  UnorderedList,
} from "@chakra-ui/react";
import { FiExternalLink } from "react-icons/fi";

export default function FAQ() {
  return (
    <Accordion allowMultiple mt={{ base: undefined, md: "3" }}>
      <Flex direction="column" gap="4">
        <AccordionItem borderRadius="md" backgroundColor="#f8f1f3">
          <AccordionButton>
            <Heading as="h3" size="md" textAlign="left" p="2">
              Why does it matter whether my MP is a landlord?
            </Heading>
            <AccordionIcon ml="auto" />
          </AccordionButton>
          <AccordionPanel px="6">
            <Text>
              Parliament refuses to ban no-fault evictions or put in place rent
              caps. Meanwhile:
            </Text>
            <UnorderedList ml="8">
              <ListItem>
                1 in 3 tenants spend at least half their monthly income on rent.
              </ListItem>
              <ListItem>
                More than half suffer from damp, mould, and/or excessive cold.
              </ListItem>
              <ListItem>
                2.5 million people are struggling or behind on their rent.
              </ListItem>
            </UnorderedList>
            <Text mt="4">
              Rather than getting better, it&apos;s getting worse. When those in
              parliament are disproportionately private landlords themselves,
              they have material reason to legislate against the interests of UK
              tenants. The question becomes: who are they really serving?
            </Text>
          </AccordionPanel>
        </AccordionItem>
        <AccordionItem borderRadius="md" backgroundColor="#f8f1f3">
          <AccordionButton>
            <Heading as="h3" size="md" textAlign="left" p="2">
              What can we do about it?
            </Heading>
            <AccordionIcon ml="auto" />
          </AccordionButton>
          <AccordionPanel px="6">
            <Text>
              Join a tenants union! Landlords are powerful, but they&apos;re
              nothing without us paying off their mortgages and lifestyles.
              Where we unite, and pool our power and our resources, we win.
            </Text>
            <Text mt="4">It takes 2min to join a union near you:</Text>
            <UnorderedList ml="8">
              <ListItem>
                Scotland:{" "}
                <Link
                  color="blue"
                  fontWeight="bold"
                  href="https://www.livingrent.org"
                  isExternal
                >
                  Living Rent <Icon mb="-0.5" as={FiExternalLink} />
                </Link>
              </ListItem>
              <ListItem>
                Ireland:{" "}
                <Link
                  color="blue"
                  fontWeight="bold"
                  href="https://catuireland.org"
                  isExternal
                >
                  CATU <Icon mb="-0.5" as={FiExternalLink} />
                </Link>
              </ListItem>
              <ListItem>
                London:{" "}
                <Link
                  color="blue"
                  fontWeight="bold"
                  href="https://londonrentersunion.org"
                  isExternal
                >
                  London Renters Union <Icon mb="-0.5" as={FiExternalLink} />
                </Link>
              </ListItem>
              <ListItem>
                England & Wales:{" "}
                <Link
                  color="blue"
                  fontWeight="bold"
                  href="https://www.acorntheunion.org.uk"
                  isExternal
                >
                  ACORN <Icon mb="-0.5" as={FiExternalLink} />
                </Link>
              </ListItem>
            </UnorderedList>
          </AccordionPanel>
        </AccordionItem>
      </Flex>
    </Accordion>
  );
}
