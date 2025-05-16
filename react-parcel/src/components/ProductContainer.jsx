import { useEffect, useState } from "react";
import Product from "./Product";

const ProductContainer = () => {
  const [listOfProduct, setListOfProduct] = useState([]);
  const [filterOfProduct, setFilterOfProduct] = useState([]);
  const [toggle, setToggle] = useState(false);

  useEffect(() => {
    (async () => {
      const res = await fetch("https://fakestoreapi.com/products");
      const data = await res.json();
      console.log(data);
      setListOfProduct(data);
      setFilterOfProduct(data);
    })();
  }, []);

  return (
    <>
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
          console.log(toggle);
          console.log(newToggle);
        }}
      >
        {toggle ? "Top Rated" : "All Product"}
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
