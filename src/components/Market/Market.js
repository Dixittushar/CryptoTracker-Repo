import React, { useContext, useState } from "react";
import { ContextApp } from "../../utils/context";
import "./Market.scss";
import Pagination from "@mui/material/Pagination";
const Market = () => {
  const [currentPage, setCurrentPage] = useState(1);
  const { coin, loading } = useContext(ContextApp);

  const listOfPerPage = 10;
  const indexOfLastCoins = currentPage * listOfPerPage;
  const indexOfFirstCoins = indexOfLastCoins - listOfPerPage;
  const currentCoins = coin?.slice(indexOfFirstCoins, indexOfLastCoins);

  function numberWithCommas(x) {
    return x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
  }

  const paginate = (e, value) => {
    setCurrentPage(value);
    window.scrollTo({ top: "600", behavior: "smooth" });
  };
  return (
    <div className="market">
      <h1>Market Update</h1>
      <div className="container">
        <div className="table">
          <div className="head">
            <p>Coin</p>
            <p>Price</p>
            <p>24h Change</p>
            <p>Market Cap</p>
          </div>
          {loading ? (
            <div className="loading">
              <span className="loader"></span>
            </div>
          ) : (
            currentCoins?.map((item) => (
              <div
                className="coinDetail link"
                key={item.id}
                to={`/coin/${item.id}`}
              >
                <p className="first">
                  <img src={item.image} alt="" />
                  <span>{item.name}</span>
                </p>
                <p>{"₹" + numberWithCommas(item.current_price.toFixed(2))}</p>
                <p
                  className={
                    item?.price_change_percentage_24h > 0 ? "green" : "red"
                  }
                >
                  {item?.price_change_percentage_24h
                    ? item?.price_change_percentage_24h.toFixed(2) + "%"
                    : '"'}
                </p>
                <p>₹ {numberWithCommas(item.market_cap)}</p>
              </div>
            ))
          )}
        </div>
      </div>
      <div className="pagination">
        {coin?.length > 10 && (
          <Pagination
            color="secondary"
            variant="text"
            shape="rounded"
            defaultPage={1}
            count={Math.ceil(coin.length / listOfPerPage)}
            page={currentPage}
            onChange={paginate}
            size="large"
          />
        )}
      </div>
    </div>
  );
};

export default Market;
