import React, { useEffect, useState } from "react";
import axios from "axios";

import {
  Button,
  Flex,
  GridItem,
  Input,
  Select,
  Text,
  VStack,
  useToast,
} from "@chakra-ui/react";
import { Box, Grid, FormControl, FormLabel } from "@chakra-ui/react";

const AddCompany = () => {
  const [vendorName, setVendorName] = useState("");

  const [vendors, setVendors] = useState([]);

  const [companyName, setCompanyName] = useState("");
  const [companyAddress, setCompanyAddress] = useState("");
  const [companyCity, setCompanyCity] = useState("");
  const [companyState, setCompanyState] = useState("");
  const [companyZip, setCompanyZip] = useState("");
  const [companyTaxId, setCompanyTaxId] = useState("");
  const [companyEmail, setCompanyEmail] = useState("");
  const [companyPhone, setCompanyPhone] = useState("");
  const [dmName, setDmName] = useState("");
  const [dmEmail, setDmEmail] = useState("");
  const [dmPhone, setDmPhone] = useState("");
  const [paymentFrequency, setPaymentFrequency] = useState("");
  const [selectedVendor, setSelectedVendor] = useState("");
  const [vendorList, setVendorList] = useState([]);

  const [vendorLoader, setVendorLoader] = useState(false);
  const [companyLoader, setCompanyLoader] = useState(false);

  const toast = useToast();

  const getVendors = async () => {
    try {
      const response = await axios.get(
        "https://api.cyberbriefs.org/mobility/vendor_payment"
      );
      console.log(response.data);
      setVendors(response.data); // Assuming response.data is an array of vendor objects
    } catch (error) {
      console.error(error);
      toast({
        title: "Failed to fetch companies",
        description: error.message,
        status: "error",
      });
    }
  };

  const handleVendorAdd = async () => {
    try {
      setVendorLoader(true);
      const response = await axios.post(
        "https://api.cyberbriefs.org/mobility/vendor_payment",
        {
          vendor_name: vendorName,
        }
      );
      console.log(response.data);
      if (response.data) {
        setVendorLoader(false);

        toast({
          title: "Vendor added successfully",
          description: "Now you can see the added vendor into vendor List",
          status: "success",
        });
        setVendorName("");
      }
    } catch (error) {
      setVendorLoader(true);

      console.error(error);
      toast({
        title: "Failed to fetch vendors",
        description: error.message,
        status: "error",
      });
    }
  };

  const handleAddVendorArray = () => {
    setVendorList((prev) => [...prev, selectedVendor]);
    setSelectedVendor("");
  };

  const uploadData = async () => {
    let obj = {
      company_name: companyName,
      company_address: companyAddress,
      company_city: companyCity,
      company_state: companyState,
      company_zip: companyZip,
      company_tax_id: companyTaxId,
      company_email: companyEmail,
      company_phone: companyPhone,
      dm_name: dmName,
      dm_email: dmEmail,
      dm_phone: dmPhone,
      payment_frequency: paymentFrequency,
      vendor_list: vendorList,
    };
    console.log("objjj", obj);
    try {
      setCompanyLoader(true);
      const response = await axios.post(
        "https://api.cyberbriefs.org/mobility/company_payment",
        obj
      );
      console.log(response.data);
      if (response.data) {
        setCompanyLoader(false);
        toast({
          title: "Company added successfully",
          status: "success",
        });

        setVendorName("");
        setCompanyName("");
        setCompanyAddress("");
        setCompanyCity("");
        setCompanyState("");
        setCompanyZip("");
        setCompanyTaxId("");
        setCompanyEmail("");
        setCompanyPhone("");
        setDmName("");
        setDmEmail("");
        setDmPhone("");
        setPaymentFrequency("");
        setSelectedVendor("");
        setVendorList([]);
      }
    } catch (error) {
      console.error(error);
      setCompanyLoader(false);

      toast({
        title: "Failed to fetch vendors",
        description: error.message,
        status: "error",
      });
    }
  };

  const handleClear = () => {
    
    setVendorName("");
    setCompanyName("");
    setCompanyAddress("");
    setCompanyCity("");
    setCompanyState("");
    setCompanyZip("");
    setCompanyTaxId("");
    setCompanyEmail("");
    setCompanyPhone("");
    setDmName("");
    setDmEmail("");
    setDmPhone("");
    setPaymentFrequency("");
    setSelectedVendor("");
    setVendorList([]);
  }
  useEffect(() => {
    getVendors();
  }, []);

  return (
    <div>
      <div className="bg-white col-span-9 space-x-2">
        <Box mt={10}>
          <Box
            display="flex" // This makes the Box a flex container.
            alignItems="center" // This centers the children vertically in the container.
            color="white"
            p="5"
            h={"50px"}
            my="5"
            backgroundColor="gray.800"
            fontWeight="semibold"
            fontSize="md"
          >
            Company Details:
          </Box>
          <Grid templateColumns="repeat(3, 1fr)" gap="2" mx="5">
            <FormControl>
              <FormLabel
                htmlFor="name"
                color="purple.800"
                fontWeight="semibold"
              >
                Company Name
              </FormLabel>
              <Input
                placeholder="Enter Company Name"
                value={companyName}
                onChange={(e) => setCompanyName(e.target.value)}
                bg="blueGray.100"
              />
            </FormControl>
            <FormControl>
              <FormLabel
                htmlFor="taxId"
                color="purple.800"
                fontWeight="semibold"
              >
                Company Tax Id
              </FormLabel>
              <Input
                placeholder="TaxId"
                value={companyTaxId}
                onChange={(e) => setCompanyTaxId(e.target.value)}
                bg="blueGray.100"
              />
            </FormControl>
            <FormControl>
              <FormLabel
                htmlFor="email"
                color="purple.800"
                fontWeight="semibold"
              >
                Company Email
              </FormLabel>
              <Input
                type="email"
                placeholder="eg. example@domain.com"
                value={companyEmail}
                onChange={(e) => setCompanyEmail(e.target.value)}
                bg="blueGray.100"
              />
            </FormControl>
          </Grid>
          <Grid templateColumns="repeat(3, 1fr)" gap="2" mx="5" mt="4">
            <GridItem colSpan={2}>
              <FormControl>
                <FormLabel
                  htmlFor="street"
                  color="purple.800"
                  fontWeight="semibold"
                >
                  Company Address
                </FormLabel>
                <Input
                  placeholder="Street Address"
                  value={companyAddress}
                  onChange={(e) => setCompanyAddress(e.target.value)}
                  bg="blueGray.100"
                />
              </FormControl>
              <Grid templateColumns="repeat(3, 1fr)" gap="2">
                <FormControl>
                  <FormLabel htmlFor="city">City</FormLabel>
                  <Input
                    placeholder="City"
                    value={companyCity}
                    onChange={(e) => setCompanyCity(e.target.value)}
                    bg="blueGray.100"
                  />
                </FormControl>
                <FormControl>
                  <FormLabel htmlFor="state">State</FormLabel>
                  <Input
                    placeholder="State"
                    value={companyState}
                    onChange={(e) => setCompanyState(e.target.value)}
                    bg="blueGray.100"
                  />
                </FormControl>
                <FormControl>
                  <FormLabel htmlFor="zip">Zip</FormLabel>
                  <Input
                    placeholder="Zip Code"
                    value={companyZip}
                    onChange={(e) => setCompanyZip(e.target.value)}
                    bg="blueGray.100"
                  />
                </FormControl>
              </Grid>
            </GridItem>
            <GridItem>
              <FormControl>
                <FormLabel
                  htmlFor="phone"
                  color="purple.800"
                  fontWeight="semibold"
                >
                  Company Phone
                </FormLabel>
                <Input
                  type="tel"
                  placeholder="Eg. 123-456-7890"
                  value={companyPhone}
                  onChange={(e) => setCompanyPhone(e.target.value)}
                  bg="blueGray.100"
                />
              </FormControl>
            </GridItem>
          </Grid>
        </Box>
        <Box
          backgroundColor={"gray.800"}
          color="white"
          p="5"
          my="5"
          h={"50px"}
          mt={10}
          display={"flex"}
          alignItems={"center"}
          fontWeight="semibold"
          fontSize="md"
        >
          DM Details:
        </Box>
        <Grid templateColumns="repeat(3, 1fr)" gap="2" mx="5">
          <FormControl>
            <FormLabel
              htmlFor="DMname"
              color="purple.800"
              fontWeight="semibold"
            >
              DM Name
            </FormLabel>
            <Input
              placeholder="DM Name"
              value={dmName}
              onChange={(e) => setDmName(e.target.value)}
              bg="blueGray.100"
            />
          </FormControl>
          <FormControl>
            <FormLabel
              htmlFor="DMemail"
              color="purple.800"
              fontWeight="semibold"
            >
              DM Email
            </FormLabel>
            <Input
              type="email"
              placeholder="eg. example@domain.com"
              value={dmEmail}
              onChange={(e) => setDmEmail(e.target.value)}
              bg="blueGray.100"
            />
          </FormControl>
          <FormControl>
            <FormLabel
              htmlFor="DMphone"
              color="purple.800"
              fontWeight="semibold"
            >
              DM Phone
            </FormLabel>
            <Input
              type="tel"
              placeholder="Eg. 123-456-7890"
              value={dmPhone}
              onChange={(e) => setDmPhone(e.target.value)}
              bg="blueGray.100"
            />
          </FormControl>
        </Grid>
        <Flex
          backgroundColor={"gray.800"}
          color="white"
          p="5"
          my="5"
          h={"50px"}
          display={"flex"}
          alignItems={"center"}
          fontWeight="semibold"
          fontSize="md"
          justifyContent=""
          mt={10}
        >
          Bank Details:
        </Flex>
        <Flex justifyContent="space-evenly">
          <Box
            className="payment-mode"
            d="flex"
            flexDirection="column"
            justifyContent="center"
            width="60"
          >
            <Box mb="4">
              <FormControl>
                <FormLabel color="gray.700" fontWeight="bold">
                  Payment Frequency
                </FormLabel>
                <Select
                  shadow="base"
                  borderColor="gray.200"
                  rounded="md"
                  w="full"
                  py="2"
                  px="3"
                  color="gray.700"
                  bgColor={'white'}
                  focusBorderColor="blue.500"
                  value={paymentFrequency}
                  onChange={(e) => setPaymentFrequency(e.target.value)}
                >
                  <option value="daily">Daily</option>
                  <option value="weekly">Weekly</option>
                  <option value="byweekly">ByWeekly</option>
                  <option value="monthly">Monthly</option>
                </Select>
              </FormControl>

              {paymentFrequency == "weekly" && (
                <Flex flexDir={"column"} w={"100%"} rowGap={2}>
                  <Text fontWeight={500}>
                    Weekdays <span style={{ color: "red" }}>*</span>
                  </Text>
                  <Select
                    // value={paymentFrequency}
                    bgColor={'white'}
                    onChange={(e) => setPaymentFrequency(e.target.value)}
                  >
                    <option value="">Select Weekdays</option>
                    <option value="Monday">Monday</option>
                    <option value="Tuesday">Tuesday</option>
                    <option value="Wednesday">Wednesday</option>
                    <option value="Thursday">Thursday</option>
                    <option value="Friday">Friday</option>
                    <option value="Saturday">Saturday</option>
                    <option value="Sunday">Sunday</option>
                  </Select>
                </Flex>
              )}

              {paymentFrequency == "byweekly" && (
                <Flex flexDir={"column"} w={"100%"} rowGap={2}>
                  <Text fontWeight={500}>
                    Week <span style={{ color: "red" }}>*</span>
                  </Text>
                  <Select
                   bgColor={'white'}
                    // value={paymentFrequency}
                    onChange={(e) => setPaymentFrequency(e.target.value)}
                  >
                    <option value="">Select Week</option>
                    <option value="Week1">Week1</option>
                    <option value="Week2">Week2</option>
                    <option value="Week3">Week3</option>
                    <option value="Week4">Week4</option>
                    <option value="Week5">Week5</option>
                  </Select>
                </Flex>
              )}

              {paymentFrequency == "monthly" && (
                <Flex flexDir={"column"} w={"100%"} rowGap={2}>
                  <Text fontWeight={500}>
                    Date <span style={{ color: "red" }}>*</span>
                  </Text>
                  <Input
                    type="date"
                    bgColor={'white'}
                    // value={paymentFrequency}
                    onChange={(e) => setPaymentFrequency(e.target.value)}
                  />
                </Flex>
              )}
            </Box>
          </Box>
        </Flex>

        <Flex flexDirection="column" alignItems="center" mt="5">
          <Text
            fontSize="md"
            fontWeight="semibold"
            backgroundColor={"gray.800"}
            color="white"
            h={"50px"}
            display={"flex"}
            alignItems={"center"}
            p="5"
            w="full"
            textAlign=""
          >
            Vendor List:
          </Text>
          <Flex gap="10" mt="3" alignItems="center">
            <VStack mb="5" alignItems="start" w="40%">
              <label>Vendor List</label>
              <Flex w="100%" gap="2">
                <Select
                value={selectedVendor}
                bgColor={'white'}
                  placeholder="Select Vendor"
                  onChange={(e) => setSelectedVendor(e.target.value)}
                >
                  {vendors.map((vendor) => (
                    <option key={vendor.id} value={vendor.vendor_name}>
                      {vendor.vendor_name}
                    </option>
                  ))}
                </Select>
                <Button
                  bg="#2563EB"
                  color="white"
                  onClick={handleAddVendorArray}
                >
                  Add
                </Button>
              </Flex>
            </VStack>
            <Text alignSelf="center">OR</Text>
            <VStack alignItems="start" w="40%" mb="5">
              <label>Add Vendor</label>
              <Flex w="100%" gap="2">
                <Input
                  value={vendorName}
                  onChange={(e) => setVendorName(e.target.value)}
                  bgColor={'white'}
                  placeholder="Enter Vendor"
                />
                <Button bg="#4BCA6E" color="white" onClick={handleVendorAdd} isLoading={vendorLoader}>
                  Add
                </Button>
              </Flex>
            </VStack>
          </Flex>

          <Flex justifyContent="center" alignItems="end" mb="10" gap="4">
            <Button
              onClick={handleClear
              }
              bg="red.400"
              color="white"
              rounded="full"
              w="28"
              fontSize="xl"
            >
              Clear
            </Button>
            <Button
              onClick={uploadData}
              bg="blue.400"
              color="white"
              rounded="full"
              w="28"
              fontSize="xl"
              isLoading={companyLoader}
            >
              Save
            </Button>
          </Flex>
        </Flex>
      </div>
    </div>
  );
};

export default AddCompany;
