"use client";

import { useState } from "react";
import {
  Box,
  Button,
  Flex,
  Heading,
  Textarea,
  useToast,
  Container,
  VStack,
  Text,
} from "@chakra-ui/react";
import { FaCopy, FaPlay } from "react-icons/fa";

export default function GenerateCode() {
  const [input, setInput] = useState("");
  const [output, setOutput] = useState("");
  const [runOutput, setRunOutput] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [isRunning, setIsRunning] = useState(false);
  const toast = useToast();

  const handleGenerate = async () => {
    setIsLoading(true);
    try {
      const response = await fetch("http://localhost:8080/api/generate", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ input }),
      });
      const data = await response.json();
      // Remove all backticks and 'c' language identifier if present
      const cleanedCode = data.code.replace(/^```c?\n?|```$/gm, "").trim();
      setOutput(cleanedCode);
    } catch (error) {
      console.error("Error:", error);
      toast({
        title: "An error occurred.",
        description: "Unable to generate code.",
        status: "error",
        duration: 3000,
        isClosable: true,
      });
    }
    setIsLoading(false);
  };

  const handleCopy = () => {
    navigator.clipboard.writeText(output);
    toast({
      title: "Copied!",
      description: "Code copied to clipboard.",
      status: "success",
      duration: 2000,
      isClosable: true,
    });
  };

  const handleRun = async () => {
    setIsRunning(true);
    try {
      const response = await fetch("http://localhost:8080/api/run", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ code: output }),
      });
      const data = await response.json();
      setRunOutput(data.output);
    } catch (error) {
      console.error("Error:", error);
      toast({
        title: "An error occurred.",
        description: "Unable to run the code.",
        status: "error",
        duration: 3000,
        isClosable: true,
      });
    }
    setIsRunning(false);
  };

  return (
    <Container maxW="container.xl" py={8}>
      <VStack spacing={8} align="center" w="full">
        <Heading
          as="h2"
          size="2xl"
          textAlign="center"
          color="yellow.400"
          mb={6}
        >
          Get Flawless C code from your Pseudocode
        </Heading>

        <VStack w="full" maxW="800px" spacing={4}>
          <Textarea
            placeholder="Enter your pseudocode here..."
            value={input}
            onChange={(e) => setInput(e.target.value)}
            minH="150px"
            bg="gray.900"
            borderColor="green.500"
            w="full"
          />
          
          <Button
            onClick={handleGenerate}
            isLoading={isLoading}
            loadingText="Generating..."
            size="lg"
            colorScheme="green"
          >
            Generate Code
          </Button>
        </VStack>

        {output && (
          <Box position="relative" w="full" maxW="800px">
            <Textarea
              value={output}
              onChange={(e) => setOutput(e.target.value)}
              minH="400px"
              bg="gray.900"
              borderColor="green.500"
              fontFamily="monospace"
              w="full"
            />
            <Flex position="absolute" top={2} right={2} gap={2}>
              <Button
                onClick={handleRun}
                size="sm"
                leftIcon={<FaPlay />}
                isLoading={isRunning}
                loadingText="Running..."
                colorScheme="green"
              >
                Run
              </Button>
              <Button 
                onClick={handleCopy} 
                size="sm" 
                leftIcon={<FaCopy />}
                colorScheme="green"
              >
                Copy
              </Button>
            </Flex>
          </Box>
        )}

        {runOutput && (
          <Box w="full" maxW="800px">
            <Heading as="h3" size="md" mb={2} textAlign="center">
              Output:
            </Heading>
            <Box
              bg="gray.900"
              borderColor="green.500"
              borderWidth={1}
              borderRadius="md"
              p={4}
              fontFamily="monospace"
              whiteSpace="pre-wrap"
              w="full"
            >
              <Text>{runOutput}</Text>
            </Box>
          </Box>
        )}
      </VStack>
    </Container>
  );
}
