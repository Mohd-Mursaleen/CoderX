import { Box, Container, Flex, Heading, Button } from "@chakra-ui/react";
import Link from "next/link";

const Navbar = () => (
  <Box as="nav" bg="gray.900" color="white" py={4}>
    <Container maxW="container.xl">
      <Flex justify="space-between" align="center">
        <Heading as="h1" size="lg">
          <Link href="/" style={{ color: "white" }}>
            CoderX
          </Link>
        </Heading>
        <Flex gap={4}>
          <Button as={Link} href="/about" variant="ghost" color="green.400">
            About
          </Button>
          <Button as={Link} href="/contact" variant="ghost" color="green.400">
            Contact
          </Button>
        </Flex>
      </Flex>
    </Container>
  </Box>
);

export default Navbar;
