import { Box, Flex, Image } from "@chakra-ui/react";
import React from "react";
import Notification from "./Notification";
import onetech from "../Assets/onetech.png";
import { FaUserTie } from "react-icons/fa6";
import Profile from "./Profile";

const Navbar = () => {
  return (
    <Flex
      zIndex={1000}
      position={"fixed"}
      w={"100%"}
      justifyContent={"space-between"}
      alignItems={"center"}
      pl={2}
      pr={4}
      bgImage={"linear-gradient(to right, #F8E8C1, #FEF4DB , white);"}
    >
      <Box w={"4%"} cursor={"pointer"}>
        <Image src={onetech} w={"100%"} />
      </Box>
      <Flex alignItems={"center"}>
        <Notification />
        <Profile/>
      </Flex>
    </Flex>
  );
};

export default Navbar;
