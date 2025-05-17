import { useEffect, useState } from "react";
import Product from "./Product";
import Skleton from "./Skleton";

const ProductContainer = () => {
  const [listOfProduct, setListOfProduct] = useState([]);
  const [filterOfProduct, setFilterOfProduct] = useState([]);
  const [toggle, setToggle] = useState(false);
  const [loading, setLoading] = useState(false);
  const [searchText, setSearchText] = useState("");

  useEffect(() => {
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

  if (listOfProduct.length === 0) {
    return <Skleton />;
  }

  return (
    <>
      <input
        type="text"
        value={searchText}
        style={{ padding: "10px" }}
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
          <Product key={product.id} product={product} />
        ))}
      </div>
    </>
  );
};

export default ProductContainer;
