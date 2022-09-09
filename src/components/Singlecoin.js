import React, { useState, useEffect } from "react";
// import Navbar from './Navbar';
import Chart from "./Chart";
import { UserData } from "./Data";

import { useParams } from "react-router-dom";

// import { API_URL } from '../Context';
const SingleCoin = () => {
  const [userData, setUserData] = useState({
    labels: UserData.map((data) => data.year),
    datasets: [
      {
        label: "Price",
        data: UserData.map((data) => data.price),
        borderColor: "gold",
      },
    ],
  });
  const [coin, setCoin] = useState("bitcoin");
  const { id } = useParams();
  // let  coin_price=numberWithCommas(coin?.market_data?.current_price?.inr?.toFixed(2));

  const getCoin = async (url) => {
    try {
      const res = await fetch(url);
      const data = await res.json();
      console.log(data);
      setCoin(data);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    getCoin(`https://api.coingecko.com/api/v3/coins/${id}`);
  }, [id]);

  return (
    <>
      <div class="container-fluid mt-5 ">
        <div class="row mt-4 text-white">
          <div class="col-md-4 first-div text-center coin-detail">
            <img src={coin?.image?.large} alt="" />
            <br />
            <br />
            <h1 style={{ fontSize: 60, fontWeight: "bolder" }}>{coin?.name}</h1>
            <p>{coin?.description?.en.split(". ")[0]}.</p>
            <span style={{ display: "flex" }}>
              <h3 style={{ fontSize: 30, fontWeight: "bolder" }}>Rank:</h3>
              &nbsp; &nbsp;
              <h3 style={{ fontSize: 30, fontWeight: "lighter" }}>
                {coin?.coingecko_rank}
              </h3>
            </span>
            <br />
            <span style={{ display: "flex" }}>
              <h3
                style={{
                  fontSize: 30,
                  fontWeight: "bolder",
                  textAlign: "left",
                }}
              >
                Current Price:
              </h3>
              &nbsp; &nbsp;
              <h3 style={{ fontSize: 30, fontWeight: "lighter" }}>
                ₹{coin?.market_data?.current_price?.inr.toLocaleString()}
              </h3>
            </span>

            <br />
            <span style={{ display: "flex" }}>
              <h3 style={{ fontSize: 30, fontWeight: "bolder" }}>
                Market Cap:
              </h3>
              &nbsp; &nbsp;
              <h3 style={{ fontSize: 30, fontWeight: "lighter" }}>
                ₹
                {coin?.market_data?.market_cap?.inr
                  .toLocaleString()
                  .toString()
                  .slice(0, 10)}
                M
              </h3>
            </span>
          </div>
          <div class="col-md-8 second-div">
            <div class="row mt-4  justify-content-between">
              <div class="my-5" style={{ width: 900 }}>
                <Chart chartData={userData} />
              </div>
              <div class="col-md">
                <button
                  type="button mr-2"
                  class="btn btn-outline-warning w-100"
                >
                  24 Hours
                </button>
              </div>
              <div class="col-md">
                <button
                  type="button mr-2"
                  class="btn btn-outline-warning w-100"
                >
                  30 Days
                </button>
              </div>
              <div class="col-md">
                <button type="button" class="btn btn-outline-warning w-100">
                  3 Months
                </button>
              </div>
              <div class="col-md">
                <button type="button" class="btn btn-outline-warning w-100">
                  1 Year
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};
export default SingleCoin;
