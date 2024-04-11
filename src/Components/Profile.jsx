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
  Text,
} from "@chakra-ui/react";
import { FaUserTie } from "react-icons/fa6";
import { Link } from "react-router-dom";
import Cookies from 'js-cookie';


const Profile = () => {
  const { isOpen, onOpen, onClose } = useDisclosure();

  let token = Cookies.get("token") || null;
  console.log(token);
  const handleLogout = () => {
    Cookies.remove("token");
    Cookies.remove("id");

    window.location.reload();
  };

  return (
    <Popover placement="top" isOpen={isOpen} onClose={onClose}>
      <PopoverTrigger>
        <Tooltip label="User">
          <Button bg={"transparent"} onClick={onOpen} m={"auto"}>
            <FaUserTie size={30} cursor={"pointer"} />
          </Button>
        </Tooltip>
      </PopoverTrigger>
      <PopoverContent w={"100%"}>
        <PopoverArrow />

        <PopoverBody fontWeight={500} textAlign={"left"}>
          {( token == null) ? (
            <Link to={"/login"}>
              <Text fontSize={20} cursor={"pointer"}>
                Signin
              </Text>
            </Link>
          ) : (
            <Text fontSize={20} cursor={"pointer"} onClick={handleLogout}>
              Logout
            </Text>
          )}
        </PopoverBody>
        {/* <PopoverFooter d="flex" justifyContent="flex-end" border={"0px solid red"}>
          <Button  bg={"#4BCA6E"} color={"white"} mr={2} onClick={onClose}>
            Accept
          </Button>
          <Button bg={"#980000"} color={"white"} onClick={handleLogout} >
            Decline
          </Button>
        </PopoverFooter> */}
      </PopoverContent>
    </Popover>
  );
};

export default Profile;