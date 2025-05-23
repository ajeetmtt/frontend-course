import { useEffect, useState } from "react";
import Product from "./Product";
import Skleton from "./Skleton";
import { Link } from "react-router-dom";

const ProductContainer = () => {
  const [listOfProduct, setListOfProduct] = useState([]);
  const [filterOfProduct, setFilterOfProduct] = useState([]);
  const [toggle, setToggle] = useState(false);
  const [loading, setLoading] = useState(false);
  const [searchText, setSearchText] = useState("");

  useEffect(() => {
    // console.log("log inside useEffect");
    try {
      (async () => {
        setLoading(true);
        const res = await fetch("https://fakestoreapi.com/products");
        const data = await res.json();

        setListOfProduct(data);
        setFilterOfProduct(data);
      })();
    } catch (error) {
      console.log("Error: ", error);
    } finally {
      setLoading(false);
    }
  }, []);

  //  console.log("log outside useEffect");

  if (listOfProduct.length === 0) {
    return <Skleton />;
  }

  return (
    <>
      <input
        type="text"
        //  value={searchText}
        style={{ padding: "10px" }}
        //  onChange={(e) => setSearchText(e.target.value)}
        onChange={(e) => setSearchText(e.target.value)}
      />
      <button
        style={{
          margin: "10px",
          padding: "10px",
          background: "#000",
          color: "#fff",
          borderRadius: "10px",
          cursor: "pointer",
        }}
        onClick={() => {
          const filterProduct = listOfProduct.filter((product) =>
            product?.title.toLowerCase().includes(searchText.toLowerCase())
          );
          setFilterOfProduct(filterProduct);
          setSearchText("");
        }}
      >
        Search
      </button>
      <button
        style={{
          margin: "10px",
          padding: "10px",
          background: "#000",
          color: "#fff",
          borderRadius: "10px",
          cursor: "pointer",
        }}
        onClick={() => {
          const filterProduct = listOfProduct.filter(
            (product) => product.rating.rate >= 4
          );
          let newToggle = !toggle;
          setToggle(newToggle);

          newToggle
            ? setFilterOfProduct(filterProduct)
            : setFilterOfProduct(listOfProduct);
        }}
      >
        {toggle ? "All Product" : "Top Rated"}
      </button>
      <div className="product_container">
        {filterOfProduct.map((product) => (
          <Link target="_blank" key={product.id} to={`/${product.id}`}>
            <Product product={product} />
          </Link>
        ))}
      </div>
    </>
  );
};

export default ProductContainer;
