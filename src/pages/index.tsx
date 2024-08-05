import React, { useEffect, useState, useCallback } from "react"
import { Link as GatsbyLink } from "gatsby"
import axios from "axios"
import {
  Box,
  Container,
  Heading,
  Text,
  Select,
  Input,
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
  InputGroup,
  InputRightElement,
} from "@chakra-ui/react"
import { MoonIcon, SunIcon, SearchIcon } from "@chakra-ui/icons"

interface Product {
  id: string;
  name: string;
  thumbnail_url: string;
  variants: number;
  retail_price?: string;
  currency?: string;
  description?: string;
  synced: number;
}

const IndexPage = () => {
  const [products, setProducts] = useState<Product[]>([])
  const [error, setError] = useState<string | null>(null)
  const [isLoading, setIsLoading] = useState(true)
  const [sortBy, setSortBy] = useState<'name' | 'price'>('name')
  const [filterByPrice, setFilterByPrice] = useState<number | null>(null)
  const { colorMode, toggleColorMode } = useColorMode()

  const bgColor = useColorModeValue("lightBg", "darkBg")
  const cardBgColor = useColorModeValue("white", "gray.700")
  const textColor = useColorModeValue("lightText", "darkText")
  const borderColor = useColorModeValue("gray.200", "gray.600")
  const accentColor = useColorModeValue("lightAccent", "darkAccent")

  const fetchProducts = useCallback(async () => {
    try {
      setIsLoading(true);
      const response = await axios.get('http://localhost:3000/api/products', { timeout: 5000 });
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

  const getProductPrice = (product: Product): number => {
    return product.retail_price ? parseFloat(product.retail_price) : 0;
  };

  const sortedAndFilteredProducts = React.useMemo(() => {
    return products
      .filter(product => !filterByPrice || getProductPrice(product) <= filterByPrice)
      .sort((a, b) => {
        if (sortBy === 'name') {
          return a.name.localeCompare(b.name);
        } else {
          return getProductPrice(a) - getProductPrice(b);
        }
      });
  }, [products, sortBy, filterByPrice]);

  if (isLoading) {
    return (
      <Box bg={bgColor} minH="100vh" display="flex" alignItems="center" justifyContent="center">
        <Spinner size="xl" color={accentColor} thickness="4px" />
      </Box>
    )
  }

  if (error) {
    return (
      <Box bg={bgColor} minH="100vh" display="flex" alignItems="center" justifyContent="center">
        <VStack spacing={4}>
          <Text color="red.500" fontSize="xl">{error}</Text>
          <Button onClick={fetchProducts} colorScheme={colorMode === "dark" ? "blue" : "brand"}>Retry</Button>
        </VStack>
      </Box>
    );
  }

  return (
    <Box bg={bgColor} minH="100vh" py={8} transition="background-color 0.2s">
      <Container maxW="container.xl">
        <Flex justifyContent="space-between" alignItems="center" mb={8}>
          <Heading as="h1" size="2xl" color={textColor} fontWeight="bold">
            Our Products
          </Heading>
          <Button onClick={toggleColorMode} variant="ghost" size="md">
            <Icon as={colorMode === "light" ? MoonIcon : SunIcon} color={accentColor} />
          </Button>
        </Flex>
        <Flex mb={8} flexWrap="wrap" gap={4}>
          <Select
            value={sortBy}
            onChange={(e) => setSortBy(e.target.value as 'name' | 'price')}
            w={{ base: "full", md: "auto" }}
            bg={cardBgColor}
            borderColor={borderColor}
            color={textColor}
          >
            <option value="name">Sort by Name</option>
            <option value="price">Sort by Price</option>
          </Select>
          <InputGroup w={{ base: "full", md: "auto" }}>
            <Input
              type="number"
              placeholder="Max Price"
              value={filterByPrice || ''}
              onChange={(e) => setFilterByPrice(e.target.value ? Number(e.target.value) : null)}
              bg={cardBgColor}
              borderColor={borderColor}
              color={textColor}
            />
            <InputRightElement>
              <Icon as={SearchIcon} color={accentColor} />
            </InputRightElement>
          </InputGroup>
        </Flex>
        {sortedAndFilteredProducts.length === 0 ? (
          <Text color={textColor} fontSize="lg" textAlign="center">No products found.</Text>
        ) : (
          <SimpleGrid columns={{ base: 1, md: 2, lg: 3, xl: 4 }} spacing={6}>
            {sortedAndFilteredProducts.map((product: Product) => (
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
                  borderColor={borderColor}
                  borderWidth="1px"
                  transition="all 0.3s"
                  _hover={{ transform: 'translateY(-5px)', boxShadow: 'xl' }}
                >
                  <Image src={product.thumbnail_url} alt={product.name} h="200px" w="100%" objectFit="cover" />
                  <Box p={4} w="100%">
                    <Heading as="h2" size="md" mb={2} color={textColor}>{product.name}</Heading>
                    <Text fontWeight="bold" mb={2} color={accentColor}>
                      Price: {getProductPrice(product)} {product.currency}
                    </Text>
                    <Flex justifyContent="space-between">
                      <Badge colorScheme={colorMode === "dark" ? "blue" : "purple"} variant="solid">Variants: {product.variants}</Badge>
                      <Badge colorScheme={colorMode === "dark" ? "teal" : "green"} variant="solid">
                        Synced: {new Date(product.synced).toLocaleDateString()}
                      </Badge>
                    </Flex>
                  </Box>
                </VStack>
              </Link>
            ))}
          </SimpleGrid>
        )}
      </Container>
    </Box>
  )
}

export default IndexPage