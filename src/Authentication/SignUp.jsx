import {
  Button,
  Flex,
  VStack,
  useToast,
  Input,
  Select,
} from "@chakra-ui/react";
import axios from "axios";
import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";

const SignUp = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [designation, setDesignation] = useState("");
  const [selectedCompanies, setSelectedCompanies] = useState(""); // Stores the list of selected companies as objects
  const [companies, setCompanies] = useState([]); // Stores the companies from API
  const [user_list, setUserList] = useState([]);
  const toast = useToast();


  const handleUserListArray = () => {
    setUserList((prev) => [...prev, selectedCompanies]);
    setSelectedCompanies("");
    console.log(user_list);
  };

  const getCompanies = async () => {
    try {
      const response = await axios.get("https://api.cyberbriefs.org/mobility/company_api_view");
      setCompanies(response.data); // Assuming response.data is an array of company objects
    } catch (error) {
      console.error(error);
      toast({
        title: "Failed to fetch companies",
        description: error.message,
        status: "error",
      });
    }
  };
  console.log(user_list);

  const handleSubmit = async (e) => {
    e.preventDefault();

    let obj = {
      email,
      password,
      designation,
      company_list: user_list, // Assuming you only need to send company IDs
    };

    try {
      let response = await axios.post(
        "https://api.cyberbriefs.org/mobility/signup/",
        obj
      );
      console.log(response);
      toast({
        title: "User Created successfully",
        description: response.data.message,
        status: "success",
        duration: 5000,
        isClosable: true,
        position: "top",
      });

      setEmail("");
      setPassword("");
      setDesignation("");
      setSelectedCompanies("");
      setUserList([]) // Reset selected companies
    } catch (error) {
      toast({
        title: "Something went wrong!",
        description: error.message || "Please try again later.",
        status: "error",
        duration: 5000,
        isClosable: true,
        position: "top",
      });
    }
  };


  useEffect(() => {
    getCompanies();
  }, []);

  return (
    <div className="bg-white h-screen flex justify-center items-center">
      <div className="flex flex-col items-center justify-center w-full max-w-md p-6 bg-white rounded-md shadow-md">
        <h5 className="text-sm font-normal text-gray-500">Welcome!</h5>
        <h2 className="text-2xl font-semibold text-gray-800">
          Create a New User
        </h2>
        <form onSubmit={handleSubmit} className="w-full mt-6">
          {/* Email, Password, Designation Inputs Remain Unchanged */}
          <div className="mb-4">
            <label htmlFor="email" className="block text-gray-700">
              Email
            </label>
            <input
              type="email"
              id="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full px-3 py-2 placeholder-gray-400 border rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
              placeholder="Enter your email"
            />
          </div>
          <div className="mb-4">
            <label htmlFor="password" className="block text-gray-700">
              Password
            </label>
            <input
              type="password"
              id="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full px-3 py-2 placeholder-gray-400 border rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
              placeholder="Enter your password"
            />
          </div>
          <div className="mb-4">
            <label htmlFor="designation" className="block text-gray-700">
              Designation
            </label>
            <select
              id="designation"
              value={designation}
              onChange={(e) => setDesignation(e.target.value)}
              className="w-full px-3 py-2 placeholder-gray-400 border rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
            >
              <option value="">Select Designation</option>
              <option value="Super_Admin">Super Admin</option>
              <option value="Admin">Admin</option>
              <option value="Client">Client</option>

            </select>
          </div>
          <VStack mb={5} alignItems={"start"} w={"100%"} mt={3}>
            <label>Company List</label>
            <Flex w={"100%"} gap={2}>
            <Select placeholder="Assign Company" onChange={(e) => setSelectedCompanies(e.target.value)}>
              {companies.map((company) => (
                <option key={company.id} value={company.name}>
                  {company.name}
                </option>
              ))}
            </Select>
            <Button
              bg={"#2563eb"}
              color={"white"}
              onClick={handleUserListArray}
            >
              Add
            </Button>
            </Flex>
          </VStack>

          <Flex
          w={"70%"}
          border={"0px solid red"}
          justifyContent={"flex-start"}
          columnGap={4}
        >
          {user_list.length > 0 &&
            user_list.map((el, i) => (
              <Button key={i} bg={"#EEEEEE"} mb={2}>
                {el}
              </Button>
            ))}
        </Flex>

          <button
            type="submit"
            className="w-full py-2 px-4 bg-blue-600 text-white rounded-md shadow-md hover:bg-blue-700 focus:outline-none focus:ring-blue-500 focus:border-blue-500 mt-4"
          >
            Create
          </button>
        </form>
      </div>
    </div>
  );
};

export default SignUp;
