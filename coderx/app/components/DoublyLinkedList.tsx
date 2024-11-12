import { useState } from 'react';
import {
  Box,
  Button,
  Input,
  VStack,
  HStack,
  Text,
  useToast,
  Flex,
  
  IconButton,
  Container,
  
} from '@chakra-ui/react';
import { FaArrowLeft, FaArrowRight,FaTrash } from 'react-icons/fa';

interface Node {
  value: string;
  id: number;
  next: number | null;
  prev: number | null;
  address: string;
}

export default function DoublyLinkedList() {
  const [nodes, setNodes] = useState<Node[]>([]);
  const [inputValue, setInputValue] = useState('');
  const [position, setPosition] = useState('');
  const [nextId, setNextId] = useState(0);
  const toast = useToast();

  const generateAddress = () => {
    return '0x' + Math.floor(Math.random() * 16777215).toString(16).padStart(6, '0');
  };

  const addToFront = () => {
    if (!inputValue.trim()) {
      toast({
        title: "Value required",
        description: "Please enter a value to add",
        status: "warning",
        duration: 2000,
      });
      return;
    }
    
    const newNode = {
      value: inputValue,
      id: nextId,
      next: nodes.length > 0 ? nodes[0].id : null,
      prev: null,
      address: generateAddress(),
    };

    if (nodes.length > 0) {
      const updatedNodes = nodes.map((node, index) => 
        index === 0 ? { ...node, prev: newNode.id } : node
      );
      setNodes([newNode, ...updatedNodes]);
    } else {
      setNodes([newNode]);
    }
    
    setNextId(nextId + 1);
    setInputValue('');
  };

  const addToBack = () => {
    if (!inputValue.trim()) {
      toast({
        title: "Value required",
        status: "warning",
        duration: 2000,
      });
      return;
    }

    const newNode = {
      value: inputValue,
      id: nextId,
      next: null,
      prev: nodes.length > 0 ? nodes[nodes.length - 1].id : null,
      address: generateAddress(),
    };

    if (nodes.length > 0) {
      const updatedNodes = nodes.map((node, index) =>
        index === nodes.length - 1 ? { ...node, next: newNode.id } : node
      );
      setNodes([...updatedNodes, newNode]);
    } else {
      setNodes([newNode]);
    }

    setNextId(nextId + 1);
    setInputValue('');
  };

  const insertAtPosition = () => {
    const pos = parseInt(position);
    if (isNaN(pos) || pos < 0 || pos > nodes.length) {
      toast({
        title: "Invalid position",
        status: "error",
        duration: 2000,
      });
      return;
    }

    const newNode = {
      value: inputValue,
      id: nextId,
      next: pos < nodes.length ? nodes[pos].id : null,
      prev: pos > 0 ? nodes[pos - 1].id : null,
      address: generateAddress(),
    };

    const updatedNodes = [...nodes];
    updatedNodes.splice(pos, 0, newNode);
    
    // Update connections
    updatedNodes.forEach((node, index) => {
      node.next = index < updatedNodes.length - 1 ? updatedNodes[index + 1].id : null;
      node.prev = index > 0 ? updatedNodes[index - 1].id : null;
    });

    setNodes(updatedNodes);
    setNextId(nextId + 1);
    setInputValue('');
    setPosition('');
  };

  const deleteNode = (id: number) => {
    const nodeIndex = nodes.findIndex(node => node.id === id);
    if (nodeIndex === -1) return;

    const updatedNodes = nodes.filter(node => node.id !== id);
    
    // Update connections
    updatedNodes.forEach((node, index) => {
      node.next = index < updatedNodes.length - 1 ? updatedNodes[index + 1].id : null;
      node.prev = index > 0 ? updatedNodes[index - 1].id : null;
    });

    setNodes(updatedNodes);
  };

  return (
    <VStack spacing={8} w="full" maxW="100vw" mx="auto" p={4}>
      <Text fontSize="2xl" fontWeight="bold" color="green.400">
        Doubly Linked List Visualization
      </Text>

      <Box w="full" overflowX="auto" py={8} minH="60vh">
        <Flex justify="flex-start" align="center" minW="max-content" px={8}>
          {nodes.map((node, index) => (
            <Flex key={node.id} align="center">
              <Box position="relative">
                <IconButton
                  aria-label="Delete node"
                  icon={<FaTrash />}
                  size="xs"
                  position="absolute"
                  top={-3}
                  right={-3}
                  colorScheme="red"
                  onClick={() => deleteNode(node.id)}
                  zIndex={2}
                />
                <Flex 
                  align="stretch" 
                  h="80px"
                  borderRadius="md"
                  overflow="hidden"
                >
                  {/* Previous Address Box */}
                  <Box
                    w="100px"
                    bg="gray.900"
                    borderColor="green.500"
                    borderWidth={2}
                    borderRight="none"
                    display="flex"
                    alignItems="center"
                    justifyContent="center"
                    p={2}
                  >
                    <Text 
                      color="yellow.400" 
                      fontSize="xs" 
                      textAlign="center"
                      wordBreak="break-all"
                    >
                      {node.prev !== null 
                        ? nodes.find(n => n.id === node.prev)?.address 
                        : 'NULL'}
                    </Text>
                  </Box>

                  {/* Value Box */}
                  <Box
                    w="120px"
                    bg="gray.800"
                    borderColor="green.500"
                    borderWidth={2}
                    display="flex"
                    flexDirection="column"
                    alignItems="center"
                    justifyContent="center"
                    p={2}
                  >
                    <Text color="white" fontSize="md" fontWeight="bold">
                      {node.value}
                    </Text>
                    <Text color="gray.400" fontSize="xs">
                      {node.address}
                    </Text>
                  </Box>

                  {/* Next Address Box */}
                  <Box
                    w="100px"
                    bg="gray.900"
                    borderColor="green.500"
                    borderWidth={2}
                    borderLeft="none"
                    display="flex"
                    alignItems="center"
                    justifyContent="center"
                    p={2}
                  >
                    <Text 
                      color="yellow.400" 
                      fontSize="xs" 
                      textAlign="center"
                      wordBreak="break-all"
                    >
                      {node.next !== null 
                        ? nodes.find(n => n.id === node.next)?.address 
                        : 'NULL'}
                    </Text>
                  </Box>
                </Flex>
              </Box>

              {/* Connection Arrows */}
              {index < nodes.length - 1 && (
                <Flex w="40px" align="center" justify="center">
                  <Box 
                    h="2px" 
                    bg="green.500" 
                    flex={1}
                    position="relative"
                  >
                    <Box
                      position="absolute"
                      right="-6px"
                      top="-3px"
                      color="green.500"
                    >
                      <FaArrowRight size={12} />
                    </Box>
                  </Box>
                </Flex>
              )}
            </Flex>
          ))}
        </Flex>
      </Box>

      <Box
        position="fixed"
        bottom={0}
        left={0}
        right={0}
        bg="gray.900"
        p={4}
        borderTop="2px"
        borderColor="green.500"
      >
        <Container maxW="container.xl">
          <VStack spacing={4}>
            <HStack spacing={4} w="full">
              <Input
                value={inputValue}
                onChange={(e) => setInputValue(e.target.value)}
                placeholder="Enter node value"
                bg="gray.800"
                borderColor="green.500"
                flex={1}
              />
              <Input
                value={position}
                onChange={(e) => setPosition(e.target.value)}
                placeholder="Position (optional)"
                bg="gray.800"
                borderColor="green.500"
                w="200px"
                type="number"
              />
            </HStack>
            <HStack spacing={4} w="full">
              <Button onClick={addToFront} colorScheme="green" flex={1}>
                Add to Front
              </Button>
              <Button onClick={addToBack} colorScheme="green" flex={1}>
                Add to Back
              </Button>
              <Button 
                onClick={insertAtPosition} 
                colorScheme="green" 
                flex={1}
                isDisabled={!position}
              >
                Insert at Position
              </Button>
            </HStack>
          </VStack>
        </Container>
      </Box>
    </VStack>
  );
} 