import React, { useEffect, useState } from "react";
import "./App.css"

const URL = "https://www.thecocktaildb.com/api/json/v1/1/search.php?s=";

const Data = () => {
  const [drinksData, setDrinksData] = useState([]);
  const [searchTerm, setSearchTrem] = useState("");
  const [loading, setLoading] = useState(false);
  const [isError, setIsError] = useState({ status: false, msg: "" });
  const fetchDrink = async (apiURL) => {
    setLoading(true);
    setIsError({ status: false, msg: "" });
    try {
      const response = await fetch(apiURL);
      const { drinks } = await response.json();
      setDrinksData(drinks);
      setLoading(false);
      setIsError({ status: false, msg: "" });
      if (!drinks) {
        throw new Error("data not found");
      }
    } catch (error) {
      setLoading(false);
      setIsError({ status: true, msg: error.message || "somthing went worng" });
    }
  };
  useEffect(() => {
    const correctURL = `${URL}${searchTerm}`;
    fetchDrink(correctURL);
  }, [searchTerm]);
  return (
    <div>
      <h2> Extraa Edge</h2>
      <h1>Search Drinks</h1>
     
      <form>
        <input
        className="input"
          type="text"
          name="search"
          id="search"
          placeholder="search somthing new.."
          value={searchTerm}
          onChange={(e) => setSearchTrem(e.target.value)}
        />
      </form>
      <hr />
      {loading && !isError?.status && <h3>loading</h3>}
      {isError?.status && <h3 style={{ color: "red" }}>{isError.msg}</h3>}
      {!loading && !isError.status && (
        <ul className="cocktail-data">
          {drinksData.map((eachDrink) => {
            const { idDrink, strDrink, strDrinkThumb } = eachDrink;
            return (
              <li key={idDrink}>
                <div>
                  <img src={strDrinkThumb} alt={strDrink} />
                </div>
                <div className="text">
                  <h3>{strDrink}</h3>
                </div>
              </li>
            );
          })}
        </ul>
      )}
    </div>
  );
};
export default Data;