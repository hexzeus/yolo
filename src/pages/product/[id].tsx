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
    Select,
    Grid,
    GridItem,
} from "@chakra-ui/react";
import { ArrowBackIcon, StarIcon } from '@chakra-ui/icons';

interface Variant {
    id: string;
    name: string;
    retail_price: string;
    currency: string;
    size?: string;
    color?: string;
}

interface Product {
    id: string;
    name: string;
    thumbnail_url: string;
    description: string;
    variants: Variant[];
}

const ProductPage: React.FC<PageProps<{}, { id: string }, { product: Product }>> = ({ params, location }) => {
    const [product, setProduct] = useState<Product | null>(location.state?.product || null);
    const [selectedVariant, setSelectedVariant] = useState<Variant | null>(null);
    const [error, setError] = useState<string | null>(null);
    const [isLoading, setIsLoading] = useState(!location.state?.product);
    const [quantity, setQuantity] = useState(1);
    const toast = useToast();
    const { colorMode } = useColorMode();

    const bgColor = useColorModeValue("darkBg", "lightBg");
    const cardBgColor = useColorModeValue("whiteAlpha.100", "white");
    const textColor = useColorModeValue("darkText", "lightText");
    const borderColor = useColorModeValue("gray.200", "whiteAlpha.300");
    const accentColor = useColorModeValue("darkAccent", "lightAccent");

    const fetchProduct = useCallback(async () => {
        if (product) return;
        setIsLoading(true);
        try {
            const response = await axios.get('https://yolo-8yva.onrender.com/api/products', { timeout: 5000 });
            if (response.data && Array.isArray(response.data.result)) {
                const foundProduct = response.data.result.find((p: Product) => p.id === params.id);
                if (foundProduct) {
                    setProduct(foundProduct);
                    if (Array.isArray(foundProduct.variants)) {
                        setSelectedVariant(foundProduct.variants[0]);
                    } else {
                        setSelectedVariant(foundProduct.variants);
                    }
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
            description: `Added ${quantity} ${selectedVariant?.name || product?.name} to cart`,
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
                <Button onClick={fetchProduct} colorScheme={colorMode === "dark" ? "green" : "brand"}>Retry</Button>
            </VStack>
        </Box>
    );
    if (!product) return (
        <Box bg={bgColor} minH="100vh" display="flex" alignItems="center" justifyContent="center">
            <Text fontSize="xl" color={textColor}>Product not found</Text>
        </Box>
    );

    const variants = Array.isArray(product.variants) ? product.variants : [product.variants];

    return (
        <Box bg={bgColor} minH="100vh" py={8} transition="background-color 0.2s">
            <Container maxW="container.xl">
                <Link as={GatsbyLink} to="/" mb={6} display="inline-flex" alignItems="center" color={accentColor}>
                    <ArrowBackIcon mr={2} /> Back to Products
                </Link>
                <Grid templateColumns={{ base: "1fr", md: "1fr 1fr" }} gap={8}>
                    <GridItem>
                        <Image
                            src={product.thumbnail_url}
                            alt={product.name}
                            objectFit="cover"
                            w="100%"
                            maxH="500px"
                            borderRadius="lg"
                            boxShadow="xl"
                        />
                    </GridItem>
                    <GridItem>
                        <VStack align="start" spacing={4}>
                            <Heading as="h1" size="2xl" color={textColor}>{product.name}</Heading>
                            <Text fontSize="2xl" fontWeight="bold" color={accentColor}>
                                Price: {selectedVariant?.retail_price} {selectedVariant?.currency}
                            </Text>
                            <Text fontSize="lg" color={textColor}>{product.description}</Text>
                            <Divider borderColor={borderColor} />
                            {variants.length > 1 && (
                                <Select
                                    placeholder="Select variant"
                                    onChange={(e) => setSelectedVariant(variants.find(v => v.id === e.target.value) || null)}
                                    bg={cardBgColor}
                                    borderColor={borderColor}
                                >
                                    {variants.map((variant) => (
                                        <option key={variant.id} value={variant.id}>
                                            {variant.name} - {variant.retail_price} {variant.currency}
                                            {variant.size && ` - ${variant.size}`}
                                            {variant.color && ` - ${variant.color}`}
                                        </option>
                                    ))}
                                </Select>
                            )}
                            {selectedVariant && (
                                <VStack align="start" spacing={2}>
                                    <Text fontWeight="bold" fontSize="xl" color={accentColor}>
                                        Variant Price: {selectedVariant.retail_price} {selectedVariant.currency}
                                    </Text>
                                    {selectedVariant.size && <Text color={textColor}>Size: {selectedVariant.size}</Text>}
                                    {selectedVariant.color && <Text color={textColor}>Color: {selectedVariant.color}</Text>}
                                </VStack>
                            )}
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
                                    colorScheme={colorMode === "dark" ? "green" : "brand"}
                                    leftIcon={<StarIcon />}
                                    isDisabled={!selectedVariant}
                                >
                                    Add to Cart
                                </Button>
                            </HStack>
                        </VStack>
                    </GridItem>
                </Grid>
            </Container>
        </Box>
    );
};

export default ProductPage;
