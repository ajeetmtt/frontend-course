import { useEffect, useState } from "react";

const useGetSingleProduct = (id) => {
  const [singleProduct, setSingleProduct] = useState(null);
  useEffect(() => {
    fetchedData();
  }, [id]);

  const fetchedData = async () => {
    const result = await fetch(`https://fakestoreapi.com/products/${id}`);
    const data = await result.json();
    setSingleProduct(data);
  };
  return singleProduct;
};

export default useGetSingleProduct;
