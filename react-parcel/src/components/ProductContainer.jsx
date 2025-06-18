import { useEffect, useState } from "react";
import Product, { Hoc } from "./Product";
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

  //const NewComp = Hoc(Product);
  //  console.log("log outside useEffect");

  if (listOfProduct.length === 0) {
    return <Skleton />;
  }

  return (
    <div className="mt-20 ">
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
      <div className="grid grid-cols-4 gap-2">
        {filterOfProduct.map((product) => (
          <Link target="_blank" key={product.id} to={`/${product.id}`}>
            {/* {product.rating.rate >= 4 ? (
              <NewComp product={product} />
            ) : (
              <Product product={product} />
            )} */}
            <Product product={product} />
          </Link>
        ))}
      </div>
    </div>
  );
};

export default ProductContainer;
