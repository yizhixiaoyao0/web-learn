import React from "react";
import {
  Input,
  Stack,
  InputGroup,
  InputLeftAddon,
  InputRightAddon,
  FormControl,
  Button,
  RadioGroup,
  Radio,
  Select,
  Switch,
  FormLabel,
  Flex,
  FormHelperText,
} from "@chakra-ui/core";

import { FaUserAlt, FaLock, FaCheck } from "react-icons/fa";

export default function SignUp() {
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
        <RadioGroup defaultValue="0">
          <Stack spacing={5} direction="horizontal">
            <Radio value="0">男</Radio>
            <Radio value="1">女</Radio>
          </Stack>
        </RadioGroup>
        <Select appearance="none" placeholder="请选择学科">
          <option value="Java">Java</option>
          <option value="大前端">大前端</option>
        </Select>
        <Flex>
          <Switch id="deal" mr={2} />
          <FormLabel mr="0" mb="0" htmlFor="deal">
            是否同意协议
          </FormLabel>
        </Flex>
        <Button
          type="submit"
          boxShadow="xl"
          colorScheme="teal"
          w="100%"
          _hover={{ bgColor: "tomato" }}
        >
          注册
        </Button>
      </Stack>
    </form>
  );
}
