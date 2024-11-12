"use client";
import {
  Box,
  Container,
  VStack,
  HStack,
  Heading,
  Text,
  Button,
  Flex,
  Image,
  keyframes,
} from "@chakra-ui/react";
import { FaCode} from "react-icons/fa";
import Link from "next/link";

// Keyframes for animations
const fadeIn = keyframes`
  from { opacity: 0; }
  to { opacity: 1; }
`;

const zoomIn = keyframes`
  from { transform: scale(1); }
  to { transform: scale(1.05); }
`;

export default function Home() {
  return (
    <Box
      minH="80vh"
      display="flex"
      flexDirection="column"
      animation={`${fadeIn} 1s ease-in`}
    >
      <Container maxW="container.xl" flex={1} py={8}>
        <VStack spacing={10} align="stretch">
          <Heading as="h1" size="2xl" textAlign="center">
            Welcome to Our Software
          </Heading>
          <Text fontSize="xl" textAlign="center">
            Discover the amazing features of our software that will boost your
            productivity and streamline your workflow.
          </Text>

          <HStack spacing={10} justify="center">
            <Box
              bg="gray.900"
              borderColor="green.500"
              borderWidth={1}
              borderRadius="md"
              p={6}
              flex={1}
              _hover={{ animation: `${zoomIn} 0.3s forwards` }}
            >
              <Heading as="h2" size="lg" mb={4}>
                Feature 1: Code Generation
              </Heading>
              <Text fontSize="md" mb={4}>
                Automatically generate code from your pseudocode with our
                powerful code generation tool.
              </Text>
              <Flex justifyContent="center">
                <Link href="/coder">
                  <Button leftIcon={<FaCode />} colorScheme="green">
                    Try Code Generation
                  </Button>
                </Link>
              </Flex>
            </Box>

            <Box
              bg="gray.900"
              borderColor="green.500"
              borderWidth={1}
              borderRadius="md"
              p={6}
              flex={1}
              _hover={{ animation: `${zoomIn} 0.3s forwards` }}
            >
              <Heading as="h2" size="lg" mb={4}>
                Doubly Linked List Visualizer
              </Heading>
              <Text fontSize="md" mb={4}>
                Interactive visualization of a doubly linked list data structure.
                Add nodes and see the connections in real-time.
              </Text>
              <Flex justifyContent="center">
                <Link href="/visualizer">
                  <Button leftIcon={<FaCode />} colorScheme="green">
                    Try Visualizer
                  </Button>
                </Link>
              </Flex>
            </Box>
          </HStack>

          <Box mt={8}>
            <Heading as="h2" size="lg" textAlign="center" mb={4}>
              Our Software Branding
            </Heading>
            <Flex justifyContent="center">
              <Image
                src="/path/to/software-branding.jpg"
                alt="Software Branding"
                borderRadius="md"
              />
            </Flex>
          </Box>

          {/* Add more sections as needed */}
        </VStack>
      </Container>
    </Box>
  );
}
