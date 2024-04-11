import React, { useContext, useEffect, useState } from "react";
import {
  Box,
  Button,
  Flex,
  Input,
  Select,
  Text,
  useToast,
} from "@chakra-ui/react";
import axios from "axios";
import { Table, Thead, Tbody, Tr, Th, Td, ButtonGroup } from "@chakra-ui/react";
import Cookies from "js-cookie";

const UploadBatch = () => {
  const [loading, setLoading] = useState(false);
  const [data, setData] = useState([]);
  const [csvFile, setCsvFile] = useState(null);
  const [clickedButtons, setClickedButtons] = useState({});
  const [date, setDate] = useState("");
  const [searchByDate, setSearchByDate] = useState("")
  const [emailList, setEmailList] = useState([]);

  const [approveByAdmin, setApproveByAdmin] = useState(false);

  const [company, setCompany] = useState("");

  const toast = useToast();

  const handleDateChange = (e) => {
    setDate(e.target.value);
  };

  const handleFileChange = (event) => {
    const file = event.target.files[0];
    if (file) {
      setCsvFile(file);
    }
  };

  const postFile = async () => {
    try {
      const formData = new FormData();
      formData.append("file", csvFile);
      formData.append("date", date);
      formData.append("company", company);

      setLoading(true);
      const response = await axios.post(
        "https://api.cyberbriefs.org/mobility/batch_input_excel/",
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        }
      );
      setLoading(false);
      console.log("aaaaaaa", response);
      if (response.data.message === "File processed successfully") {
        setLoading(false);
        fetchData();
        toast({
          title: "File uploaded successfully",
          description: "",
          status: "success",
          duration: 5000,
          isClosable: true,
          position: "top",
        });
        fetchUserDataForEmailList();
      } else if (
        response.data.error ===
        "Data for this company, vendor, and month is already present in the database."
      ) {
        setLoading(false);
        toast({
          title: response.data.error,
          description: "",
          status: "error",
          duration: 5000,
          isClosable: true,
          position: "top",
        });
      }
    } catch (error) {
      setLoading(false);

      console.log(error);
      toast({
        title: "There is something wrong",
        description: "",
        status: "error",
        duration: 5000,
        isClosable: true,
        position: "top",
      });
    }
  };

  const fetchData = async () => {
    //  let company = "Onesmarter"
    //  let date = "2024-04-11"
    if (date != "" && company != "") {
      const response = await axios.get(
        `https://api.cyberbriefs.org/mobility/get_uploaded_batch_details/${company}/${date}`
      ); // Update with your correct endpoint
      setData(response.data.data);
      // console.log("ree", response.data);
    }
  };

  const fetchUserDataForEmailList = async () => {
    //  let company = "Onesmarter"
    //  let date = "2024-04-11"
    if (company != "") {
      const response = await axios.get(
        `https://api.cyberbriefs.org/mobility/get_users_by_email/${company}`
      ); // Update with your correct endpoint
      console.log("eemailss", response.data.data);

      setEmailList(response.data.data);
    }
  };

  const handleSearchByDate = async () => {
    //  let company = "Onesmarter"
    //  let date = "2024-04-11"
    if (searchByDate != "" && company != "") {
      const response = await axios.get(
        `https://api.cyberbriefs.org/mobility/get_uploaded_batch_details/${company}/${searchByDate}`
      ); // Update with your correct endpoint
      setData(response.data.data);
      // console.log("ree", response.data);
    }
  };

  const handleMove = async (id, destination) => {
    try {
      // console.log(typeof id);
      setLoading(true);
      const payload = {
        Payment_Mode: destination, // This should match the field expected by your backend.
      };

      const response = await axios.patch(
        `https://api.cyberbriefs.org/mobility/update_payment_mode/${id}/`, // Update with your actual API endpoint
        payload,
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      );

      setClickedButtons((prev) => ({ ...prev, [id]: destination }));

      toast({
        title: `Payment mode changed to ${destination} successfully`,
        status: "success",
        duration: 5000,
        isClosable: true,
        position: "top",
      });

      if (response.data.data) {
        fetchData(); // Fetch the updated data again if necessary
      }
    } catch (error) {
      toast({
        title: "Error updating payment mode.",
        description: error.toString(),
        status: "error",
        duration: 5000,
        isClosable: true,
        position: "top",
      });
    } finally {
      setLoading(false);
    }
  };

  const getUserData = async () => {
    let userid = Cookies.get("id");
    userid = +userid;
    console.log("aaaaaa", typeof userid);
    try {
      let res = await axios.get(
        `https://api.cyberbriefs.org/mobility/get_user_details/${userid}`
      );
      console.log("reeeeeeeeeeee", res.data.company);
      setCompany(res.data.company);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    fetchData();
    fetchUserDataForEmailList();
    getUserData();
  }, []);

  return (
    <Box w="100%" m="auto" mt="10">
      {/* Existing upload UI elements */}
      <Flex
        flexDir={"column"}
        alignItems={"center"}
        rowGap={20}
        w={"100%"}
        m={"auto"}
        mt={10}
      >
        <Flex w={"100%"} alignItems={"center"} mt={10} gap={10} flexDir={""}>
          <Flex flexDirection={"column"} w={"100%"} gap={1}>
            <Text fontWeight={500} mb={5}>
              Upload Batch File <span style={{ color: "red" }}>*</span>
            </Text>
            <Input
              type="file"
              accept=".csv"
              bgColor={"white"}
              onChange={handleFileChange}
            />
          </Flex>
          <Flex flexDir={"column"} w={"100%"} rowGap={2}>
            <Text fontWeight={500}>
              Date <span style={{ color: "red" }}>*</span>
            </Text>
            <Input
              value={date}
              type="date"
              bgColor={"white"}
              onChange={handleDateChange}
            />
          </Flex>
        </Flex>
        <Button
          color={"white"}
          bg={"#B73232"}
          w={"50%"}
          onClick={postFile}
          isDisabled={loading}
        >
          {loading ? "Loading..." : "Upload"}
        </Button>
      </Flex>

          <Flex>
            <Text>Search by date</Text>
            <Input type="date" value={searchByDate} onChange={(e)=>setSearchByDate(e.target.value)} />
            <Button onClick={handleSearchByDate}>Search</Button>
            <Button onClick={()=>setSearchByDate("")}>Clear</Button>
          </Flex>
      {/* Table structure for displaying data */}
      {data.length > 0 && (
        <>
          <Table variant="simple" mt={10} w={"300px"}>
            <Thead>
              <Tr>
                <Th>Cust_ID</Th>
                <Th>Customer_Vendor_Account_Number</Th>
                <Th>Location_Code</Th>
                <Th>Payment_Number</Th>
                <Th>Vendor_Address_1</Th>
                <Th>Vendor_City</Th>
                <Th>Vendor_State</Th>
                <Th>Vendor_Zip</Th>
                <Th>Invoice_Number</Th>
                <Th>Net_Amount</Th>
                <Th>Due_Date</Th>
                <Th>Invoice_Date</Th>
                <Th>Company</Th>
                <Th>Date</Th>
                <Th>Payment Mode</Th>
              </Tr>
            </Thead>
            <Tbody>
              {data.map((item) => (
                <Tr key={item.id}>
                  <Td>{item.Cust_Id}</Td> {/* Example data field */}
                  <Td>{item.Customer_Vendor_Account_Number}</Td>
                  <Td>{item.Location_Code}</Td>
                  <Td>{item.Payment_Number}</Td>
                  <Td>{item.Vendor_Address_1}</Td>
                  <Td>{item.Vendor_City}</Td>
                  <Td>{item.Vendor_State}</Td>
                  <Td>{item.Vendor_Zip}</Td>
                  <Td>{item.Invoice_Number}</Td>
                  <Td>{item.Net_Amount}</Td>
                  <Td>{item.Due_Date}</Td>
                  <Td>{item.Invoice_Date}</Td>
                  <Td>{item.Company}</Td>
                  <Td>{item.Date}</Td>
                  <Td>{item.Payment_Mode}</Td>
                  {/* <Td>{item.approved}</Td> */}
                  <Td>
                    <ButtonGroup variant="outline" spacing="6">
                      {["ACH", "Cheque", "Credit Card"].map((mode) => (
                        <Button
                          key={mode}
                          colorScheme={
                            clickedButtons[item.id] === mode ? "green" : "red"
                          }
                          onClick={() => handleMove(item.id, mode)}
                        >
                          {mode}
                        </Button>
                      ))}
                    </ButtonGroup>
                  </Td>
                </Tr>
              ))}
            </Tbody>
          </Table>
          <Flex gap={3} mt={10} alignSelf={"end"}>
            <Button>Approve</Button>
            {approveByAdmin && (
              <>
                <Select>
                  <option value="">Select Email Address</option>
                  {emailList.length > 0 &&
                    emailList.map((e) => {
                      return <option value={e.email}>{e.email}</option>;
                    })}
                </Select>
                <Button>Send Mail</Button>
              </>
            )}
            <Button>Approve</Button>
          </Flex>
        </>
      )}
    </Box>
  );
};

export default UploadBatch;
