"use client";
import {
  Box,
  Container,
  Heading,
  Text,
  VStack,
  Image,
  Flex,
  useColorModeValue,
} from "@chakra-ui/react";
import { motion } from "framer-motion";

const MotionBox = motion(Box);

export default function About() {
  const bgColor = useColorModeValue("gray.900", "gray.800");
  const textColor = useColorModeValue("white", "green.300");

  return (
    <Box minH="100vh" bg={bgColor} color={textColor}>
      <Container maxW="container.xl" py={16}>
        <VStack spacing={12} align="stretch">
          <MotionBox
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
          >
            <Heading as="h1" size="2xl" textAlign="center" mb={6}>
              About CoderX
            </Heading>
            <Text fontSize="xl" textAlign="center">
              Empowering developers with AI-driven code generation
            </Text>
          </MotionBox>

          <Flex
            direction={{ base: "column", md: "row" }}
            align="center"
            justify="space-between"
            gap={8}
          >
            <MotionBox
              initial={{ opacity: 0, x: -50 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8, delay: 0.2 }}
              flex={1}
            >
              <Image
                src="/coder-illustration.svg"
                alt="Coder Illustration"
                maxW="400px"
                w="100%"
              />
            </MotionBox>
            <MotionBox
              initial={{ opacity: 0, x: 50 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8, delay: 0.4 }}
              flex={1}
            >
              <VStack align="stretch" spacing={6}>
                <Text fontSize="lg">
                  CoderX is at the forefront of revolutionizing the coding
                  experience. Our platform harnesses the power of advanced AI to
                  transform your ideas into functional code, bridging the gap
                  between concept and implementation.
                </Text>
                <Text fontSize="lg">
                  Whether you're a seasoned developer looking to accelerate your
                  workflow or a beginner taking your first steps in programming,
                  CoderX is designed to enhance your productivity and unleash
                  your creativity.
                </Text>
              </VStack>
            </MotionBox>
          </Flex>

          <MotionBox
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.6 }}
          >
            <Heading as="h2" size="xl" mb={4}>
              Our Mission
            </Heading>
            <Text fontSize="lg">
              To democratize coding by providing intelligent, accessible tools
              that empower developers of all skill levels to bring their ideas
              to life efficiently and effectively.
            </Text>
          </MotionBox>
        </VStack>
      </Container>
    </Box>
  );
}
