import axios from "axios";
import React, { useState } from "react";
import { IoMdSearch } from "react-icons/io";
import { useSearchParams } from "react-router-dom";

const Search = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const [result, setResult] = useState();

  const [searchTerm, setSearchTerm] = useState(
    searchParams.get("formno") || ""
  );
  const shipping = JSON.parse(localStorage.getItem("shippingAddress"));

  const [loading, setLoading] = useState(false);

  const handleSearch = async (e) => {
    // Handle the search logic here
    e.preventDefault();
    setLoading(true);
    const { data } = await axios.post(
      "https://itder.com/api/search-purchase-data",
      {
        form_no: searchTerm,
        phone_no: shipping.phone_no,
      }
    );
    setResult(data.singleCoursePurchaseData);
    setLoading(false);

    console.log("Searching for:", searchTerm);
  };

  return (
    <div>
      <h1 className="text-center font-semibold text-2xl">Search</h1>
      <form onSubmit={(e) => handleSearch(e)} action="">
        <div className="h-[52px] relative col-span-4 w-[600px] mx-auto">
          <input
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            type="text"
            name="search"
            placeholder="search"
            className="text-black px-2 w-full block h-full outline-0 rounded-[4px] border"
          />
          <IoMdSearch className="text-2xl text-black absolute right-2 top-2" />
        </div>
      </form>
      {loading ? (
        <h1 className="flex items-center justify-center text-3xl font-semibold">
          Loading...
        </h1>
      ) : (
        ""
      )}
      {result && (
        <div className="w-full flex flex-col lg:flex-row items-start justify-center h-full gap-2 ">
          <div className="bg-white lg:p-p_30px w-full  ">
            <div className="text-center  flex flex-col justify-center items-center ">
              <p className="text-xl font-bold">Order Information</p>
              <p className="p-3 rounded-md lg:my-2 my-1 w-fit border bg-[#D2C5A2] font-bold text-lg">
                Order Id :
                <span className="font-semibold">{result.form_no}</span>
              </p>
            </div>
            <div className="w-full border flex flex-col md:flex-row md:items-start   md:mt-4 mt-3 bg-[#D2C5A2] rounded-md p-4  ">
              <div className="md:text-base text-sm flex-1  font-semibold   md:border-r-2 md:border-black md:pr-10">
                <p className="font-bold md:mb-4 w-full">Shipping Address</p>
                <div className="space-y-1 w-full">
                  <div className="flex items-center justify-between">
                    <p>Full Name :</p>
                    <p className="text-start">{result.name}</p>
                  </div>
                  <div className="flex items-center justify-between">
                    <p>Country :</p>
                    <p>Bangladesh</p>
                  </div>
                  <div className="flex items-center justify-between">
                    <p>District Thana :</p>
                    <p className="text-start">Thana</p>
                  </div>
                  <div className="flex items-center justify-between">
                    <p>Address :</p>
                    <p>{result.permanent_address}</p>
                  </div>
                  <div className="flex items-center justify-between">
                    <p>Order Notes :</p>
                    <p className="text-start">Order Notes</p>
                  </div>
                  <div className="flex items-center justify-between">
                    <p>Mobile :</p>
                    <p>{result.phone_no}</p>
                  </div>
                </div>
              </div>

              <div className="md:text-base text-sm  flex-1 font-semibold  md:ml-10 mt-m_medium">
                <p className="font-bold  md:mb-4 w-full">
                  Demo information,Checkout page information will be here{" "}
                </p>
                <div className="space-y-1 w-full">
                  <div className="flex items-center justify-between">
                    <p>Full Name :</p>
                    <p className="text-start">name</p>
                  </div>
                  <div className="flex items-center justify-between">
                    <p>Country :</p>
                    <p>country</p>
                  </div>
                  <div className="flex items-center justify-between">
                    <p>District Thana :</p>
                    <p className="text-start">Thana</p>
                  </div>
                  <div className="flex items-center justify-between">
                    <p>Address :</p>
                    <p>Address</p>
                  </div>
                  <div className="flex items-center justify-between">
                    <p>Order Notes :</p>
                    <p className="text-start">Order Notes</p>
                  </div>
                  <div className="flex items-center justify-between">
                    <p>Mobile :</p>
                    <p>Mobile</p>
                  </div>
                </div>
              </div>
            </div>

            <div className="lg:my-8 md:my-6 my-8 px-p_4px">
              <p className=" md:my-2 font-semibold">Courses:</p>
              <table className="overflow-x-auto border w-full">
                <thead className="b w-full">
                  <tr className="text-sm ">
                    <th className="lg:w-20 md:w-16 w-8 py-2 md:py-4 lg:py-6 border ">
                      Image
                    </th>
                    <th className="lg:w-72 md:w-64 w-40 py-2 md:py-4 lg:py-6 border">
                      Course Name
                    </th>
                    <th className="lg:w-72 md:w-64 w-40 py-2 md:py-4 lg:py-6 border">
                      Student Name
                    </th>
                    <th className="lg:w-20 md:w-20 w-16 py-2 md:py-4 lg:py-6 border">
                      Quantity
                    </th>
                    <th className="lg:w-20 md:w-20 w-16  py-2 md:py-4 lg:py-6 border text-center">
                      Price
                    </th>
                    <th className="lg:w-20 md:w-20 w-16  py-2 md:py-4 lg:py-6 border text-center">
                      Total
                    </th>
                  </tr>
                </thead>
                <tbody className="md:text-base text-sm font-semibold">
                  <tr>
                    <td className="border text-center w-10 h-12 px-2">
                      <img
                        className=" w-full h-full object-cover mx-auto"
                        src={result.photo}
                        alt=""
                      />
                    </td>
                    <td className="lg:py-6 md:py-4 py-2 text-center border">
                      {result.name}
                    </td>
                    <td className="lg:py-6 md:py-4 py-2 text-center border">
                      {result.name}
                    </td>
                    <td className="lg:py-6 md:py-4 py-2 text-center border">
                      {result.course_qty}
                    </td>
                    <td className="lg:py-6 md:py-4 py-2 text-center border">
                      {Math.abs(result.discount_course_fee)}
                    </td>
                    <td className="lg:py-6 md:py-4 py-2 text-center border">
                      {result.sub_total_course_fee}
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Search;
