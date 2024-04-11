import React from "react";
import {
  Button,
  Popover,
  PopoverTrigger,
  PopoverContent,
  PopoverArrow,
  PopoverHeader,
  PopoverBody,
  PopoverFooter,
  useDisclosure,
  useToast,
  Tooltip,
} from "@chakra-ui/react";
import { IoNotifications } from "react-icons/io5";

const Notification = () => {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const toast = useToast();

  const handleLogout = () => {
   
  };

  return (
    <Popover placement="top" isOpen={isOpen} onClose={onClose} >
      <PopoverTrigger>
        <Tooltip label="Notification">
          <Button bg={"transparent"} onClick={onOpen}  m={"auto"}>
            <IoNotifications size={30} />
          </Button>
        </Tooltip>
      </PopoverTrigger>
      <PopoverContent h={"500px"}>
        <PopoverArrow />

        <PopoverBody fontWeight={500}>You have been assigned to RDD Task</PopoverBody>
        <PopoverFooter d="flex" justifyContent="flex-end" border={"0px solid red"}>
          <Button  bg={"#4BCA6E"} color={"white"} mr={2} onClick={onClose}>
            Accept
          </Button>
          <Button bg={"#980000"} color={"white"} onClick={handleLogout} >
            Decline
          </Button>
        </PopoverFooter>
      </PopoverContent>
    </Popover>
  );
};

export default Notification;
