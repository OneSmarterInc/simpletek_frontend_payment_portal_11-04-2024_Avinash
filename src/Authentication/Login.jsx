import React, { useState } from "react";
import { Link, Navigate, useNavigate } from "react-router-dom";
import {
  Box,
  Button,
  FormControl,
  FormLabel,
  Input,
  Text,
  VStack,
 
  useToast,
} from '@chakra-ui/react';
import { Link as RouterLink } from 'react-router-dom';
import axios from "axios";
import Cookies from 'js-cookie';


const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [captcha, setCaptcha] = useState("");
  const [inputCaptcha, setInputCaptcha] = useState("");
  const [isCaptchaValid, setIsCaptchaValid] = useState(false);
  const [errors, setErrors] = useState({});
  const [loader, setLoader] = useState(false);

  const navigate = useNavigate();
  const toast = useToast();
  // console.log("inputCaptcha-", inputCaptcha);
  // console.log("captcha-", captcha);

  console.log("isCaptchaValid-", isCaptchaValid);
  //   console.log("errors-", errors);
  // Function to generate a random string for CAPTCHA
  const generateCaptcha = () => {
    const characters =
      "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
    let captcha = "";
    for (let i = 0; i < 6; i++) {
      captcha += characters.charAt(
        Math.floor(Math.random() * characters.length)
      );
    }

    setCaptcha(captcha);
    setIsCaptchaValid(false); // Reset captcha validation
  };

  useState(() => {
    generateCaptcha();
  }, []);
  // Function to handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();
    // Initialize or clear previous errors
    setErrors({});

    // Basic front-end validation
    let newErrors = {};
    if (!email) newErrors.email = "Email is required";
    if (!password) newErrors.password = "Password is required";
    if (!inputCaptcha) newErrors.captcha = "CAPTCHA is required";
    else if (inputCaptcha !== captcha)
      newErrors.captcha = "CAPTCHA is incorrect";
    setErrors(newErrors);

    // If there are no errors, submit the form
    if (Object.keys(newErrors).length === 0 && isCaptchaValid) {
      try {
        setLoader(true);
        const response = await axios.post(
          "https://api.cyberbriefs.org/mobility/login/",
          {
            email,
            password,
          }
        );

        let token = response.data.token;
        let id = response.data.id
        // localStorage.setItem("token", JSON.stringify(token));
        // localStorage.setItem("companies", JSON.stringify(company));
        Cookies.set('token', token, { expires: 7});
        Cookies.set('id', JSON.stringify(id) , { expires: 7});

        console.log(response.data);
        // Assuming the API returns a success message
        setLoader(false);
        toast({
          title: "Login successful",
          description: response.data.message, // Example: Use a message returned from your API if available
          status: "success",
          duration: 5000,
          isClosable: true,
          position: "top",
        });

        // Reset form and state after successful login
        setEmail("");
        setPassword("");
        setInputCaptcha("");
        generateCaptcha(); // Generate new captcha for security purposes
        // Optionally, redirect the user or perform further actions after login
        navigate("/");
      } catch (error) {
        if (error.response) {
          setLoader(false);
          // The request was made and the server responded with a status code
          // that falls out of the range of 2xx
          console.log(error.response.data);
          console.log(error.response.status);
          console.log(error.response.headers);

          // Example: Displaying error message from server
          toast({
            title: "An error occurred",
            description:
              error.response.data.message || "Please try again later.",
            status: "error",
            duration: 5000,
            isClosable: true,
            position: "top",
          });
        } else if (error.request) {
          // The request was made but no response was received
          // error.request is an instance of XMLHttpRequest in the browser and an instance of
          // http.ClientRequest in node.js
          setLoader(false);

          console.log(error.request);
          toast({
            title: "Network error",
            description: "Please check your internet connection and try again.",
            status: "error",
            duration: 5000,
            isClosable: true,
            position: "top",
          });
        } else {
          // Something happened in setting up the request that triggered an Error
          setLoader(false);

          console.log("Error", error.message);
          toast({
            title: "Error",
            description: "An unexpected error occurred. Please try again.",
            status: "error",
            duration: 5000,
            isClosable: true,
            position: "top",
          });
        }
      }
    }
  };

  // Function to handle changes in CAPTCHA input
  const handleCaptchaChange = (e) => {
    setInputCaptcha(e.target.value);
    if (e.target.value === captcha) {
      setIsCaptchaValid(true);
    } else {
      setIsCaptchaValid(false);
    }
  };

  return (
    <Box className="bg-slate-200 h-screen" display="flex" justifyContent="center" alignItems="center">
      <Box className="w-full max-w-md p-6" bg="white" rounded="md" shadow="md">
        <Text fontSize="sm" fontWeight="normal" color="gray.500" textAlign="center">
          Welcome Back!
        </Text>
        <Text fontSize="2xl" fontWeight="semibold" color="gray.800" textAlign="center">
          Login to your Account
        </Text>
        <form onSubmit={handleSubmit} mt="6">
          <VStack spacing="4">
            <FormControl id="email" isInvalid={errors.email}>
              <FormLabel color="gray.700">Email</FormLabel>
              <Input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="Enter your email"
                focusBorderColor="blue.500"
                errorBorderColor="red.500"
              />
              {errors.email && <Text color="red.500" fontSize="sm">{errors.email}</Text>}
            </FormControl>
            <FormControl id="password" isInvalid={errors.password}>
              <FormLabel color="gray.700">Password</FormLabel>
              <Input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="Enter your password"
                focusBorderColor="blue.500"
                errorBorderColor="red.500"
              />
              {errors.password && <Text color="red.500" fontSize="sm">{errors.password}</Text>}
            </FormControl>
            <FormControl id="captcha" isInvalid={errors.captcha} display="flex" alignItems="center">
              <Box mr="2" p="2" rounded="md" shadow="sm" bg="cyan.300" color="black" width="160px" textAlign="center">
                {captcha}
              </Box>
              <Input
                type="text"
                value={inputCaptcha}
                onChange={handleCaptchaChange}
                placeholder="Enter CAPTCHA"
                focusBorderColor="blue.500"
                errorBorderColor="red.500"
              />
              <Button onClick={generateCaptcha} ml="2" bg="gray.300" _hover={{ bg: "gray.400" }}>
                Refresh
              </Button>
            </FormControl>
            <Button
              isLoading={loader}
              type="submit"
              width="full"
              bg="blue.600"
              color="white"
              _hover={{ bg: "blue.700" }}
            >
              Login
            </Button>
          </VStack>
        </form>
        <Text textAlign="center" mt="4" fontSize="lg">
          Not Registered?{" "}
          <Link as={RouterLink} to="/signup" color="cyan.600" _hover={{ textDecoration: "underline" }}>
            Signup
          </Link>
        </Text>
      </Box>
    </Box>
  );
};

export default Login;