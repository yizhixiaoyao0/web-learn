import React from "react";
import {
  Box,
  Image,
  Tabs,
  TabList,
  Tab,
  TabPanels,
  TabPanel,
  useColorMode
} from "@chakra-ui/core";

import SignUp from "./SignUp";
import SignIn from "./SignIn";

import chakraLogoDark from "../assets/images/chakra-ui-dark.png";
import chakraLogoLight from "../assets/images/chakra-ui-light.png";

export default function Form() {
  const { colorMode } = useColorMode();
  return (
    <Box
      bg={colorMode === "light" ? "gray.200" : "gray.700"}
      p={5}
      boxShadow="md"
      borderRadius="lg"
      w="100%"
    >
      <Image
        w={250}
        mx="auto"
        mb={6}
        mt={2}
        src={colorMode === "light" ? chakraLogoLight : chakraLogoDark}
      />
      <Tabs isFitted>
        <TabList>
          <Tab _focus={{ boxShadow: "none" }}>注册</Tab>
          <Tab _focus={{ boxShadow: "none" }}>登录</Tab>
        </TabList>
        <TabPanels>
          <TabPanel>
            <SignUp />
          </TabPanel>
          <TabPanel>
            <SignIn />
          </TabPanel>
        </TabPanels>
      </Tabs>
    </Box>
  );
}
