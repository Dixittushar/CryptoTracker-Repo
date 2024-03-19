import React, { useContext } from "react";
import { BsChevronDoubleDown } from "react-icons/bs";
import { ContextApp } from "../../utils/context";
import "./Hero.scss";
const Hero = () => {
  const { coin, loading } = useContext(ContextApp);
  const data = coin.slice(0, 4);
  // console.log(data);
  function numberWithCommas(x) {
    return x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
  }
  // console.log(coin);
  return (
    <div className="hero">
      <div className="top">
        <span className="text">
          <h1>TRACK AND TRADE</h1>
          <h1 className="color">CRYPTO CURRENCIES</h1>
        </span>
      </div>
      <button onClick={() => window.scrollTo({ top: 600, behavior: "smooth" })}>
        See Prices
        <span>
          <BsChevronDoubleDown />
        </span>
      </button>
      <div className="bottom">
        {loading ? (
          <div className="loading">
            <span className="loader"></span>
          </div>
        ) : (
          data?.map((coins) => (
            <div className="link coin" key={coins?.id}>
              <img src={coins?.image} alt="" />
              <span>
                {coins?.name}
                <h4
                  className={
                    coins?.price_change_percentage_24h > 0 ? "green" : "red"
                  }
                >
                  {coins?.price_change_percentage_24h
                    ? coins?.price_change_percentage_24h.toFixed(2) + "%"
                    : ""}
                </h4>
              </span>
              <span>
                {"₹" + numberWithCommas(coins?.current_price.toFixed(2))}
              </span>
            </div>
          ))
        )}
      </div>
    </div>
  );
};

export default Hero;
