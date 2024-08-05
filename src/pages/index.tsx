import React, { useEffect, useState, useCallback } from "react";
import { Link as GatsbyLink } from "gatsby";
import axios from "axios";
import {
  Box,
  Container,
  Heading,
  Text,
  SimpleGrid,
  VStack,
  Image,
  Badge,
  Link,
  Flex,
  useColorModeValue,
  Spinner,
  Button,
  useColorMode,
  Icon,
} from "@chakra-ui/react";
import { MoonIcon, SunIcon } from "@chakra-ui/icons";

interface Variant {
  id: string;
  name: string;
  retail_price: string;
  currency: string;
}

interface Product {
  id: string;
  name: string;
  thumbnail_url: string;
  variants: Variant[];
}

const IndexPage: React.FC = () => {
  const [products, setProducts] = useState<Product[]>([]);
  const [error, setError] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const { colorMode, toggleColorMode } = useColorMode();

  const bgColor = useColorModeValue("darkBg", "lightBg");
  const cardBgColor = useColorModeValue("whiteAlpha.100", "white");
  const textColor = useColorModeValue("darkText", "lightText");
  const accentColor = useColorModeValue("darkAccent", "lightAccent");

  const fetchProducts = useCallback(async () => {
    try {
      setIsLoading(true);
      setError(null);
      const response = await axios.get('https://yolo-8yva.onrender.com/api/products', { timeout: 5000 });
      if (response.data && Array.isArray(response.data.result)) {
        setProducts(response.data.result);
      } else {
        throw new Error("Unexpected response format");
      }
    } catch (err) {
      console.error("Error fetching products:", err);
      setError(err instanceof Error ? err.message : "An unexpected error occurred");
    } finally {
      setIsLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchProducts();
  }, [fetchProducts]);

  if (isLoading) {
    return (
      <Box bg={bgColor} minH="100vh" display="flex" alignItems="center" justifyContent="center">
        <Spinner size="xl" color={accentColor} thickness="4px" />
      </Box>
    );
  }

  if (error) {
    return (
      <Box bg={bgColor} minH="100vh" display="flex" alignItems="center" justifyContent="center">
        <VStack spacing={4}>
          <Text color="red.500" fontSize="xl">{error}</Text>
          <Button onClick={fetchProducts} colorScheme={colorMode === "dark" ? "green" : "brand"}>Retry</Button>
        </VStack>
      </Box>
    );
  }

  return (
    <Box bg={bgColor} minH="100vh" py={8} transition="background-color 0.2s">
      <Container maxW="container.xl">
        <Flex justifyContent="space-between" alignItems="center" mb={8}>
          <Heading as="h1" size="2xl" color={textColor} fontWeight="bold">
            IVES_HUB
          </Heading>
          <Button onClick={toggleColorMode} variant="ghost" size="md">
            <Icon as={colorMode === "light" ? MoonIcon : SunIcon} color={accentColor} />
          </Button>
        </Flex>
        {products.length === 0 ? (
          <Text color={textColor} fontSize="lg" textAlign="center">No products found.</Text>
        ) : (
          <SimpleGrid columns={{ base: 1, md: 2, lg: 3, xl: 4 }} spacing={6}>
            {products.map((product) => (
              <Link
                as={GatsbyLink}
                to={`/product/${product.id}`}
                state={{ product }}
                key={product.id}
                _hover={{ textDecoration: 'none' }}
              >
                <VStack
                  bg={cardBgColor}
                  borderRadius="lg"
                  overflow="hidden"
                  boxShadow="lg"
                  borderColor={cardBgColor}
                  borderWidth="1px"
                  transition="all 0.3s"
                  _hover={{ transform: 'translateY(-5px)', boxShadow: 'xl' }}
                >
                  <Image src={product.thumbnail_url} alt={product.name} h="200px" w="100%" objectFit="cover" />
                  <Box p={4} w="100%">
                    <Heading as="h2" size="md" mb={2} color={textColor}>{product.name}</Heading>
                    {product.variants && product.variants.length > 0 ? (
                      <Text fontWeight="bold" mb={2} color={accentColor}>
                        From: {product.variants[0].retail_price} {product.variants[0].currency}
                      </Text>
                    ) : (
                      <Text fontWeight="bold" mb={2} color={accentColor}>
                        Price: Not Available
                      </Text>
                    )}
                    <Badge colorScheme={colorMode === "dark" ? "green" : "brand"}>
                      {product.variants.length} variants
                    </Badge>
                  </Box>
                </VStack>
              </Link>
            ))}
          </SimpleGrid>
        )}
      </Container>
    </Box>
  );
};

export default IndexPage;
