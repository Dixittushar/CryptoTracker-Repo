import { createContext, useEffect, useState } from "react";
import { fetchData } from "./Url";

export const ContextApp = createContext();

const AppContext = ({ children }) => {
  const [loading, setLoading] = useState(false);
  const [coin, setCoin] = useState([]);

  useEffect(() => {
    const fetchCoins = async () => {
      try {
        const data = await fetchData();
        setLoading(false);
        setCoin(data);
      } catch (error) {
        console.log(error);
      }
    };
    fetchCoins();
  }, []);

  return (
    <ContextApp.Provider value={{ loading, setLoading, coin }}>
      {children}
    </ContextApp.Provider>
  );
};

export default AppContext;
