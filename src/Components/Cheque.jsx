import React from "react";

const Cheque = ({ onChange }) => {
  return (
    <div>
      <div className="mx-5">
        <div className="flex flex-col">
          <div className="mb-4">
            <label className="block text-gray-700 font-bold mb-2">
              Account Number
            </label>
            <input
              className="shadow border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              type="text"
              placeholder="Enter account number"
              name="accountNumber"
              onChange={onChange}
            />
          </div>
          <div className="mb-4">
            <label className="block text-gray-700 font-bold mb-2">
              Bank Name
            </label>
            <input
              className="shadow border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              type="text"
              placeholder="Enter bank name"
              name="bankName"
              onChange={onChange}
            />
          </div>
          
            <div className="mb-4">
              <label className="block text-gray-700 font-bold mb-2">
                Account Type
              </label>
              <input
                className="shadow border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                type="text"
                placeholder="Enter account type"
                name="accountType"
                onChange={onChange}
              />
            </div>
            <div className="mb-4">
              <label className="block text-gray-700 font-bold mb-2">Routing Number</label>
              <input
                className="shadow w-full border rounded py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                type="text"
                placeholder="Routing Number"
                name="routingNumber"
                onChange={onChange}
              />
            
          </div>
        </div>
      </div>
    </div>
  );
};

export default Cheque;
