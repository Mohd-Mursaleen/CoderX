"use client";

import { Box, Container } from "@chakra-ui/react";
import DoublyLinkedList from "../components/DoublyLinkedList";

export default function Visualizer() {
  return (
    <Container maxW="container.xl" py={8}>
      <Box minH="70vh">
        <DoublyLinkedList />
      </Box>
    </Container>
  );
} 