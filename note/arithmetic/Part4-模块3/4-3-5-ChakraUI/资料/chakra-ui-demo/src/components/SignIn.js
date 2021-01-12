import React from "react";
import {
  Input,
  Stack,
  InputGroup,
  InputLeftAddon,
  InputRightAddon,
  FormControl,
  Button,
  FormHelperText,
} from "@chakra-ui/core";

import { FaUserAlt, FaLock, FaCheck } from "react-icons/fa";

export default function SignIn() {
  return (
    <form>
      <Stack spacing={5}>
        <FormControl isDisabled isInvalid>
          <InputGroup>
            <InputLeftAddon children={<FaUserAlt />} />
            <Input placeholder="请输入用户名" />
          </InputGroup>
          <FormHelperText>用户名是必填选项</FormHelperText>
        </FormControl>
        <InputGroup>
          <InputLeftAddon children={<FaLock />} />
          <Input type="passowrd" placeholder="请输入密码"/>
          <InputRightAddon children={<FaCheck />} />
        </InputGroup>
        <Button
          type="submit"
          boxShadow="xl"
          w="100%"
          colorScheme="teal"
          _hover={{ bgColor: "tomato" }}
        >
          登录
        </Button>
      </Stack>
    </form>
  );
}
