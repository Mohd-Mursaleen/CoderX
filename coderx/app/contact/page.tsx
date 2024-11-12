"use client";
import {
  Box,
  Container,
  Heading,
  VStack,
  SimpleGrid,
  Text,
  Avatar,
  Flex,
  useColorModeValue,
} from "@chakra-ui/react";

interface ContactCardProps {
  name: string;
  role: string;
  email: string;
  phone: string;
  avatarUrl: string;
}

const ContactCard = ({
  name,
  role,
  email,
  phone,
  avatarUrl,
}: ContactCardProps) => {
  const cardBg = useColorModeValue("gray.800", "gray.700");
  const textColor = useColorModeValue("green.300", "green.200");

  return (
    <Box bg={cardBg} p={6} borderRadius="md" boxShadow="md">
      <VStack spacing={4} align="center">
        <Avatar size="xl" name={name} src={avatarUrl} />
        <VStack spacing={1} align="center">
          <Text fontWeight="bold" fontSize="xl" color={textColor}>
            {name}
          </Text>
          <Text fontSize="md" color="gray.400">
            {role}
          </Text>
        </VStack>
        <VStack spacing={1} align="center">
          <Text fontSize="sm">{email}</Text>
          <Text fontSize="sm">{phone}</Text>
        </VStack>
      </VStack>
    </Box>
  );
};

export default function Contact() {
  const bgColor = useColorModeValue("gray.900", "black");
  const headingColor = useColorModeValue("white", "green.300");

  const contacts = [
    {
      name: "John Doe",
      role: "Lead Developer",
      email: "john.doe@coderx.com",
      phone: "+1 (555) 123-4567",
      avatarUrl: "https://i.pravatar.cc/150?img=1",
    },
    {
      name: "Jane Smith",
      role: "UX Designer",
      email: "jane.smith@coderx.com",
      phone: "+1 (555) 234-5678",
      avatarUrl: "https://i.pravatar.cc/150?img=2",
    },
    {
      name: "Mike Johnson",
      role: "Project Manager",
      email: "mike.johnson@coderx.com",
      phone: "+1 (555) 345-6789",
      avatarUrl: "https://i.pravatar.cc/150?img=3",
    },
    {
      name: "Sarah Lee",
      role: "QA Engineer",
      email: "sarah.lee@coderx.com",
      phone: "+1 (555) 456-7890",
      avatarUrl: "https://i.pravatar.cc/150?img=4",
    },
  ];

  return (
    <Box minH="100vh" bg={bgColor}>
      <Container maxW="container.xl" py={16}>
        <VStack spacing={12} align="stretch">
          <Heading as="h1" size="2xl" textAlign="center" color={headingColor}>
            Contact Us
          </Heading>
          <SimpleGrid columns={{ base: 1, md: 2, lg: 4 }} spacing={8}>
            {contacts.map((contact, index) => (
              <ContactCard key={index} {...contact} />
            ))}
          </SimpleGrid>
        </VStack>
      </Container>
    </Box>
  );
}
