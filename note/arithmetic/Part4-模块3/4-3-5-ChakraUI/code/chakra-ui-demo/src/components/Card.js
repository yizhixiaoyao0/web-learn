import React from "react";
import { Box, Image, Badge, Text, Stack, Flex, Button, useColorModeValue, useColorMode } from "@chakra-ui/core";
import chakraUI from "../assets/images/chakra-ui.png";
import { AiFillStar } from "react-icons/ai";

export default function Card() {
  const bgColor = useColorModeValue('gray.200', 'gray.700');
  const textColor = useColorModeValue('gray.700', 'gray.100');
  return (
    <Box
      bgColor={bgColor}
      w={1 / 2}
      borderRadius="lg"
      boxShadow="lg"
      overflow="hidden"
    >
      <Image src={chakraUI} />
      <Box p={3}>
        <Stack direction="horizontal" align="center">
          <Badge variant="solid" colorScheme="teal" borderRadius="full" px="2">
            New
          </Badge>
          <Badge variant="solid" colorScheme="teal" borderRadius="full" px="2">
            React
          </Badge>
          <Badge variant="solid" colorScheme="teal" borderRadius="full" px="2">
            Chakra-UI
          </Badge>
          <Text color={textColor}>拉钩出品 必属精品</Text>
        </Stack>
        <Text
          fontSize="xl"
          pt={3}
          pb={2}
          color={textColor}
          as="h3"
          fontWeight="semibold"
        >
          Chakra-UI 框架专题课程
        </Text>
        <Text fontWeight="light" fontSize="sm" lineHeight="tall">
          Chakra UI 是一个简单的, 模块化的易于理解的 UI 组件库. 提供了丰富的构建
          React 应用所需的UI组件.
          在整个应用程序中，在任何组件上快速、轻松地引用主题中的值。组件的构建考虑到了组合。你可以利用任何组件来创造新事物。Chakra-UI
          严格遵循WAI-ARIA标准。所有组件都有适当的属性和现成的键盘交互。Chakra
          UI 是一个简单的, 模块化的易于理解的 UI 组件库. 提供了丰富的构建 React
          应用所需的UI组件.
        </Text>
        <Flex align="center" mt={2}>
          <Flex color="teal.500">
            <AiFillStar />
            <AiFillStar />
            <AiFillStar />
            <AiFillStar />
          </Flex>
          <AiFillStar />
          <Text ml={1}>100 评论</Text>
        </Flex>
      </Box>
      <Button w="100%" colorScheme="teal">登录</Button>
    </Box>
  );
}
