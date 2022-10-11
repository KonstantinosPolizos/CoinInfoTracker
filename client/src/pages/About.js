import React, { useEffect, useState } from "react";
import axios from "axios";
import { useLocation } from "react-router-dom";

const About = () => {
  const location = useLocation(); //pass data from markets page to about page
  const [openDetails, setOpenDetails] = useState(false); //if a coin is searched => true
  const [coinInfos, setCoinInfos] = useState({}); //coin's data
  const [searchName, setSearchName] = useState(""); //search bar value

  const onChangeInput = (e) => {
    setSearchName(e.target.value);
  };

  //by typing a value in search bar and press enter send request to backend
  //to retrieve data
  const handleKeyDown = (e) => {
    if (e.key === "Enter") {
      axios
        .get("http://localhost:5000/api/" + searchName)
        .then((res) => {
          setCoinInfos(res.data);
          setOpenDetails(true);
          setSearchName("");
        })
        .catch((error) => {
          console.error(error);
        });
    }
  };

  //check if user choose a coin from markets page
  //if yes load information about it
  useEffect(() => {
    if (location.state !== null) {
      axios
        .get("http://localhost:5000/api/" + location.state.stateTransfer.coinId)
        .then((res) => {
          setCoinInfos(res.data);
          setOpenDetails(true);
        })
        .catch((error) => {
          console.error(error);
        });
    }
  }, [location]);

  return (
    <div>
      <div className="flex items-center mt-24 w-2/3" id="searchBar">
        <div className="hidden relative md:block w-2/3">
          <div className="flex absolute inset-y-0 left-0 items-center pl-3 pointer-events-none">
            <svg
              className="w-5 h-5 text-gray-500"
              aria-hidden="true"
              fill="currentColor"
              viewBox="0 0 20 20"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                fill-rule="evenodd"
                d="M8 4a4 4 0 100 8 4 4 0 000-8zM2 8a6 6 0 1110.89 3.476l4.817 4.817a1 1 0 01-1.414 1.414l-4.816-4.816A6 6 0 012 8z"
                clip-rule="evenodd"
              ></path>
            </svg>
            <span className="sr-only">Search icon</span>
          </div>
          <input
            type="text"
            id="search-navbar"
            className="block p-2 pl-10 w-full text-gray-900 bg-gray-50 rounded-lg border border-gray-300 sm:text-sm focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
            placeholder="e.g. bitcoin, ethereum etc."
            onChange={onChangeInput}
            onKeyDown={handleKeyDown}
            value={searchName}
          />
        </div>
      </div>

      {openDetails ? (
        <div className="mr-36">
          <table className="w-full mt-16 w-11/12 ml-80">
            <thead>
              <tr className="text-base font-medium text-gray-700 border-b border-gray-200">
                <td className="pl-10 mr-10 text-gray-700">
                  Coin basic information
                </td>
                <td className="py-4 px-4 text-center text-gray-700">
                  Current price (USD)
                </td>
                <td className="py-4 px-4 text-center text-gray-700">
                  Highest (USD) (24 hours)
                </td>
                <td className="py-4 px-4 text-center text-gray-700">
                  Lowest (USD) (24 hours)
                </td>
                <td className="py-4 px-4 text-center text-gray-700">
                  Price change (USD) (24 hours)
                </td>
                <td className="py-4 px-4 text-center text-gray-700">
                  Price change (USD) (7 days)
                </td>
                <td className="py-4 px-4 text-center text-gray-700">
                  Price change (USD) (14 days)
                </td>
                <td className="py-4 px-4 text-center text-gray-700">
                  Price change (USD) (1 month)
                </td>
                <td className="py-4 px-4 text-center text-gray-700">
                  Price change (USD) (2 months)
                </td>
                <td className="py-4 px-4 text-center text-gray-700">
                  Price change (USD) (200 days)
                </td>
                <td className="py-4 px-4 text-center text-gray-700">
                  Price change (USD) (1 year)
                </td>
              </tr>
            </thead>
            <tbody>
              <tr className="text-base font-medium text-gray-700 border-b border-gray-200 ">
                <td className="flex gap-x-4 items-center py-4 pl-10">
                  <div className="w-200 p-2 hover:rounded-md hover:bg-gray-200 flex-row">
                    <img
                      src={coinInfos.image.small}
                      alt=""
                      className="rounded-lg object-cover object-top border border-gray-200"
                      width="100px"
                      height="100px"
                    />
                    <div className="flex justify-between items-center flex-col">
                      <h3>{coinInfos.name}</h3>
                    </div>
                  </div>
                </td>
                <td className="font-medium text-center">
                  {coinInfos.current_price}
                </td>
                <td className="font-medium text-center">
                  {coinInfos.high_24h}
                </td>
                <td className="font-medium text-center">{coinInfos.low_24h}</td>
                <td className="font-medium text-center">
                  {coinInfos.price_change_24h}
                </td>
                <td className="font-medium text-center">
                  {coinInfos.price_change_7d}
                </td>
                <td className="font-medium text-center">
                  {coinInfos.price_change_14d}
                </td>
                <td className="font-medium text-center">
                  {coinInfos.price_change_1m}
                </td>
                <td className="font-medium text-center">
                  {coinInfos.price_change_2m}
                </td>
                <td className="font-medium text-center">
                  {coinInfos.price_change_200d}
                </td>
                <td className="font-medium text-center">
                  {coinInfos.price_change_1y}
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      ) : (
        <></>
      )}
      {openDetails ? (
        <>
          <p className="flex font-medium text-2xl mt-8" id="description">
            Description
          </p>
          <div className="flex font-medium w-11/12  mt-8 ml-72">
            {coinInfos.description}
          </div>
        </>
      ) : (
        <></>
      )}
    </div>
  );
};
export default About;
