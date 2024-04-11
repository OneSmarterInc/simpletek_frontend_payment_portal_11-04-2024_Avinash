import React, { useContext, useState } from "react";
import {
  Box,
  VStack,
  Text,
  IconButton,
  useDisclosure,
  Accordion,
  AccordionItem,
  AccordionButton,
  AccordionPanel,
  AccordionIcon,
} from "@chakra-ui/react";
import { ChevronRightIcon, ChevronLeftIcon } from "@chakra-ui/icons";
import AddCompany from "./AddCompany";

import MyContext from "./ContextApi/MyContext";


const Sidebar = () => {
  const [isOpen, setIsOpen] = useState(true);
  // const [selectedOption, setSelectedOption] = useState('logo');
  const [fadeTransition, setFadeTransition] = useState(false);

  const { selectedOption, setSelectedOption } = useContext(MyContext);

  const handleToggle = () => {
    setFadeTransition(true);
    setTimeout(() => {
      setIsOpen(!isOpen);
      setFadeTransition(false);
    }, 300); // Duration of the transition in milliseconds
  };

  const handleOptionClick = (option) => {
    setFadeTransition(true);
    setTimeout(() => {
      setSelectedOption(option);
      setFadeTransition(false);
    }, 300); // Duration of the transition in milliseconds
  };

  const renderComponent = () => {
    switch (selectedOption) {
      case "AddCompany":
        return <AddCompany />;
    
        case "AddBan":
          return <AddBan />;
      default:
        return null;
    }
  };

  return (
    <Box display={"flex"} h={"100vh"} w={"100%"}>
      <Box
        as="nav"
        pos="fixed"
        top="0"
        left="0"
        h="100vh"
        w={isOpen ? "14%" : "4%"} // Adjust the width based on the sidebar state
        bg="#F8E8C1"
        bgImage={"linear-gradient(to bottom, #F8E8C1, #FEF4DB , white);"}
        color="black"
        fontWeight={500}
        boxShadow="lg"
        transition="width 0.3s"
        overflowX="hidden"
        zIndex="1000"
        opacity={10}
        mt={14}
      >
        <VStack spacing={4} align="flex-end" p={4} fontWeight={500}>
          <IconButton
            icon={isOpen ? <ChevronLeftIcon /> : <ChevronRightIcon />}
            onClick={handleToggle}
            aria-label={isOpen ? "Collapse Sidebar" : "Expand Sidebar"}
            _hover={{ transform: "scale(1.2)" }} // Attractive transition on hover
          />

          {isOpen && (
            <Accordion w={"100%"} defaultIndex={[0]} allowMultiple>
              <AccordionItem onClick={() => handleOptionClick("Organisation")}>
                <h2>
                  <AccordionButton>
                    <Box as="span" flex="1" textAlign="left">
                      Inventory
                    </Box>
                    <AccordionIcon />
                  </AccordionButton>
                </h2>
              </AccordionItem>
              <AccordionItem>
                <h2>
                  <AccordionButton>
                    <Box as="span" flex="1" textAlign="left">
                      Onboard
                    </Box>
                    <AccordionIcon />
                  </AccordionButton>
                </h2>
                <AccordionPanel
                  pb={4}
                  cursor={"pointer"}
                  onClick={() => handleOptionClick("Add Company")}
                  fontWeight={400}
                >
                  Add Company
                </AccordionPanel>
                <AccordionPanel
                  pb={4}
                  cursor={"pointer"}
                  onClick={() => handleOptionClick("Add Bill")}
                  fontWeight={400}
                >
                  Add Bill
                </AccordionPanel>
              </AccordionItem>

              {/* <AccordionItem>
                <h2>
                  <AccordionButton
                    onClick={() => handleOptionClick("Analysis")}
                  >
                    <Box as="span" flex="1" textAlign="left">
                      Analysis
                    </Box>
                    <AccordionIcon />
                  </AccordionButton>
                </h2>
              </AccordionItem> */}

              <AccordionItem>
                <h2>
                  <AccordionButton>
                    <Box as="span" flex="1" textAlign="left">
                      View
                    </Box>
                    <AccordionIcon />
                  </AccordionButton>
                </h2>
                <AccordionPanel
                  pb={4}
                  cursor={"pointer"}
                  onClick={() => handleOptionClick("viewbill")}
                  fontWeight={400}
                >
                  View Bill
                </AccordionPanel>
                <AccordionPanel
                  pb={4}
                  cursor={"pointer"}
                  onClick={() => handleOptionClick("viewcontract")}
                  fontWeight={400}
                >
                  View Contract
                </AccordionPanel>
              </AccordionItem>

              <AccordionItem>
                <h2>
                  <AccordionButton
                    onClick={() => handleOptionClick("BatchDetails")}
                  >
                    <Box as="span" flex="1" textAlign="left">
                      Batch
                    </Box>
                    <AccordionIcon />
                  </AccordionButton>
                </h2>
              </AccordionItem>

              <AccordionItem>
                <h2>
                  <AccordionButton>
                    <Box as="span" flex="1" textAlign="left">
                      Report File
                    </Box>
                    <AccordionIcon />
                  </AccordionButton>
                </h2>
                <AccordionPanel
                  pb={4}
                  cursor={"pointer"}
                  fontWeight={400}
                  onClick={() => handleOptionClick("ViewReport")}
                >
                  View Report
                </AccordionPanel>
                <AccordionPanel
                  pb={4}
                  cursor={"pointer"}
                  fontWeight={400}
                  onClick={() => handleOptionClick("UploadReport")}
                >
                  Upload File
                </AccordionPanel>
              </AccordionItem>


              <AccordionItem>
                <h2>
                  <AccordionButton>
                    <Box as="span" flex="1" textAlign="left">
                      Dashboard
                    </Box>
                    <AccordionIcon />
                  </AccordionButton>
                </h2>
                <AccordionPanel
                  pb={4}
                  cursor={"pointer"}
                  fontWeight={400}
                  onClick={() => handleOptionClick("Admin")}
                >
                 Admin
                </AccordionPanel>
                <AccordionPanel
                  pb={4}
                  cursor={"pointer"}
                  fontWeight={400}
                  onClick={() => handleOptionClick("Create User")}
                >
                  Create User
                </AccordionPanel>
              </AccordionItem>
            </Accordion>
          )}
        </VStack>
      </Box>
      <Box
        flex="1"
        ml={isOpen ? "200px" : "60px"}
        p={4}
        pl={6}
        overflow="auto"
        style={{ opacity: fadeTransition ? 0 : 1, transition: "opacity 0.3s" }}
      >
        {renderComponent()}
      </Box>
    </Box>
  );
};

export default Sidebar;
