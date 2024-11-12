import { Box, Container } from "@chakra-ui/react";

const Footer = () => (
  <Box as="footer" bg="gray.900" color="green.400" py={4}>
    <Container maxW="container.xl" textAlign="center">
      <p>&copy; 2024 CoderX. All rights reserved.</p>
    </Container>
  </Box>
);

export default Footer;
