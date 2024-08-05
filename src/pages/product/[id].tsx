import React, { useEffect, useState, useCallback } from "react";
import { Link as GatsbyLink, PageProps } from "gatsby";
import axios from "axios";
import {
    Box,
    Container,
    Flex,
    Image,
    Heading,
    Text,
    Button,
    VStack,
    HStack,
    NumberInput,
    NumberInputField,
    NumberInputStepper,
    NumberIncrementStepper,
    NumberDecrementStepper,
    useToast,
    Spinner,
    Link,
    Badge,
    Divider,
    useColorModeValue,
    useColorMode,
} from "@chakra-ui/react";
import { ArrowBackIcon, StarIcon } from '@chakra-ui/icons';

interface Product {
    id: string;
    name: string;
    thumbnail_url: string;
    retail_price: string;
    currency: string;
    description: string;
    variants: number;
}

const ProductPage = ({ params, location }: PageProps<{}, {}, { product: Product }>) => {
    const [product, setProduct] = useState<Product | null>(location.state?.product || null);
    const [error, setError] = useState<string | null>(null);
    const [isLoading, setIsLoading] = useState(!location.state?.product);
    const [quantity, setQuantity] = useState(1);
    const toast = useToast();
    const { colorMode } = useColorMode();

    const bgColor = useColorModeValue("lightBg", "darkBg");
    const cardBgColor = useColorModeValue("white", "gray.700");
    const textColor = useColorModeValue("lightText", "darkText");
    const borderColor = useColorModeValue("gray.200", "gray.600");
    const accentColor = useColorModeValue("lightAccent", "darkAccent");

    const fetchProduct = useCallback(async () => {
        if (product) return;
        setIsLoading(true);
        try {
            const response = await axios.get(`https://yolo-8yva.onrender.com/api/products`, { timeout: 5000 });
            if (response.data && Array.isArray(response.data.result)) {
                const foundProduct = response.data.result.find((p: Product) => p.id === params.id);
                if (foundProduct) {
                    setProduct(foundProduct);
                } else {
                    throw new Error("Product not found");
                }
            } else {
                throw new Error("Unexpected response format");
            }
        } catch (err) {
            console.error("Error fetching product:", err);
            setError(err instanceof Error ? err.message : "An unexpected error occurred");
        } finally {
            setIsLoading(false);
        }
    }, [params.id, product]);

    useEffect(() => {
        fetchProduct();
    }, [fetchProduct]);

    const handleAddToCart = () => {
        toast({
            title: "Added to cart",
            description: `Added ${quantity} ${product?.name} to cart`,
            status: "success",
            duration: 3000,
            isClosable: true,
        });
    };

    if (isLoading) return (
        <Box bg={bgColor} minH="100vh" display="flex" alignItems="center" justifyContent="center">
            <Spinner size="xl" color={accentColor} thickness="4px" />
        </Box>
    );
    if (error) return (
        <Box bg={bgColor} minH="100vh" display="flex" alignItems="center" justifyContent="center">
            <VStack spacing={4}>
                <Text color="red.500" fontSize="xl">{error}</Text>
                <Button onClick={fetchProduct} colorScheme={colorMode === "dark" ? "blue" : "brand"}>Retry</Button>
            </VStack>
        </Box>
    );
    if (!product) return (
        <Box bg={bgColor} minH="100vh" display="flex" alignItems="center" justifyContent="center">
            <Text fontSize="xl" color={textColor}>Product not found</Text>
        </Box>
    );

    return (
        <Box bg={bgColor} minH="100vh" py={8} transition="background-color 0.2s">
            <Container maxW="container.xl">
                <Link as={GatsbyLink} to="/" mb={6} display="inline-flex" alignItems="center" color={accentColor}>
                    <ArrowBackIcon mr={2} /> Back to Products
                </Link>
                <Flex direction={{ base: "column", md: "row" }} gap={8}>
                    <Box flex={1}>
                        <Image
                            src={product.thumbnail_url}
                            alt={product.name}
                            objectFit="cover"
                            w="100%"
                            maxH="500px"
                            borderRadius="lg"
                            boxShadow="xl"
                        />
                    </Box>
                    <VStack align="start" spacing={4} flex={1}>
                        <Heading as="h1" size="2xl" color={textColor}>{product.name}</Heading>
                        <HStack>
                            <Badge colorScheme={colorMode === "dark" ? "teal" : "green"} fontSize="lg" px={2} py={1}>
                                {product.retail_price} {product.currency}
                            </Badge>
                            <Badge colorScheme={colorMode === "dark" ? "blue" : "purple"} fontSize="md">
                                {product.variants} variants
                            </Badge>
                        </HStack>
                        {product.description && (
                            <Text fontSize="lg" color={textColor}>{product.description}</Text>
                        )}
                        <Divider borderColor={borderColor} />
                        <HStack spacing={4}>
                            <NumberInput
                                defaultValue={1}
                                min={1}
                                max={10}
                                onChange={(_, value) => setQuantity(value)}
                                bg={cardBgColor}
                                borderColor={borderColor}
                            >
                                <NumberInputField color={textColor} />
                                <NumberInputStepper>
                                    <NumberIncrementStepper />
                                    <NumberDecrementStepper />
                                </NumberInputStepper>
                            </NumberInput>
                            <Button
                                onClick={handleAddToCart}
                                colorScheme={colorMode === "dark" ? "blue" : "brand"}
                                leftIcon={<StarIcon />}
                            >
                                Add to Cart
                            </Button>
                        </HStack>
                    </VStack>
                </Flex>
            </Container>
        </Box>
    );
};

export default ProductPage;
