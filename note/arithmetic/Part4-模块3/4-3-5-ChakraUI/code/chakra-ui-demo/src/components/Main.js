import React from "react";
import { Route } from "react-router-dom";
import { Box } from "@chakra-ui/core";
import Home from "./Home";
import Form from "./Form";
import Card from "./Card";

export default function Main() {
  return (
    <Box w={1 / 2} mx="auto" mt="100px" d="flex" justifyContent="center">
      <Route path="/home" component={Home} />
      <Route path="/form" component={Form} />
      <Route path="/card" component={Card} />
    </Box>
  );
}
