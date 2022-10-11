import React, { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const Markets = () => {
  const navigate = useNavigate(); //navigate through about page with passing data of chosen coin
  const [coinList, setCoinList] = useState([]); //list of all coins
  const [showMoreCounter, setShowMoreCounter] = useState(0); //fetch more coins

  //customize the value for search bar in about page
  const checkName = (str) => {
    if (str.includes(" ")) {
      return str.replace(" ", "-").toLowerCase();
    }

    return str.toLowerCase();
  };

  //fetch coins by pressing show more button
  const showMoreCoins = () => {
    let URL =
      "http://localhost:5000/api/markets?page=" +
      (showMoreCounter + 1).toString();

    axios
      .get(URL)
      .then((res) => {
        let tmpList = coinList;
        for (let i = 0; i < res.data.length; i++) {
          tmpList.push(res.data[i]);
        }

        setCoinList(tmpList);
        setShowMoreCounter(showMoreCounter + 1);

        //keep the coins that we fetched when we switch to pages
        localStorage.setItem(
          "allInfo",
          JSON.stringify({ showMore: showMoreCounter + 1, coinList: coinList })
        );
      })
      .catch((error) => {
        console.error(error);
      });
  };

  //get the coins if exist in local storage
  useEffect(() => {
    const allInfo = JSON.parse(localStorage.getItem("allInfo"));
    if (allInfo !== null) {
      setShowMoreCounter(allInfo.showMore);
      setCoinList(allInfo.coinList);
    }
  }, []);

  return (
    <div>
      <table className="w-full mt-16 w-11/12 ml-80" id="marketsContainer">
        <thead>
          <tr className="text-base font-medium text-gray-700 border-b border-gray-200">
            <td className="pl-10 mr-10 text-gray-700">
              Coin basic information
            </td>
            <td className="py-4 px-4 text-center text-gray-700">
              Current price (USD)
            </td>
            <td className="py-4 px-4 text-center text-gray-700">
              Highest price (USD) (24 hours)
            </td>
            <td className="py-4 px-4 text-center text-gray-700">
              Lowest price (USD) (24 hours)
            </td>
            <td className="py-4 px-4 text-center text-gray-700">
              Price change in percentage (24 hours)
            </td>
            <td>
              <button
                className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
                onClick={showMoreCoins}
              >
                Show more
              </button>
            </td>
          </tr>
        </thead>
        <tbody>
          {coinList.map((elem) => {
            return (
              <tr
                className="text-base font-medium text-gray-700 border-b border-gray-200 "
                key={elem + elem}
              >
                <td className="flex gap-x-4 items-center py-4 pl-10">
                  <button
                    className="w-200 p-2 hover:rounded-md hover:bg-gray-200 flex-row"
                    onClick={() => {
                      console.log(elem.name);

                      const stateTransfer = { coinId: checkName(elem.name) };
                      navigate("/about", { state: { stateTransfer } });
                    }}
                  >
                    <img
                      src={elem.image}
                      alt=""
                      className="rounded-lg object-cover object-top border border-gray-200"
                      width="100px"
                      height="100px"
                    />
                    <div className="flex justify-between items-center flex-col">
                      <h3>{elem.name}</h3>
                      <h4>({elem.symbol.toUpperCase()})</h4>
                    </div>
                  </button>
                </td>
                <td className="font-medium text-center">
                  {elem.current_price} (USD)
                </td>
                <td className="font-medium text-center">
                  {elem.high_24h} (USD)
                </td>
                <td className="font-medium text-center">
                  {elem.low_24h} (USD)
                </td>
                <td className="font-medium text-center">
                  {elem.price_change_percentage_24h}
                </td>
              </tr>
            );
          })}
        </tbody>
      </table>
    </div>
  );
};

export default Markets;
