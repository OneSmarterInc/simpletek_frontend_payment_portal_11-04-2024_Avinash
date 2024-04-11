import { useState } from "react";
import MyContext from "./MyContext";

const MyProvider = ({ children }) => {
  const [selectedOption, setSelectedOption] = useState("");

  return (
    <MyContext.Provider
      value={{
        selectedOption,
        setSelectedOption,
      }}
    >
      {children}
    </MyContext.Provider>
  );
};

export default MyProvider;
