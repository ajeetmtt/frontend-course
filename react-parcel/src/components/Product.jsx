import React from "react";

const Product = ({ product }) => {
  return (
    <div className="border border-black flex flex-col items-center h-96 justify-between">
      {product.rating.rate >= 4 && (
        <span
          style={{
            background: "brown",
            color: "#fff",
            padding: "5px",
            margin: "5px",
          }}
        >
          Limited Time Deal
        </span>
      )}
      <div>
        <img className="h-40" src={product.image} alt="" />
        <h3>{product.title.substr(0, 20)}</h3>
        <p>Rating:{product.rating.rate}</p>
        <p>Price: {product.price}</p>
      </div>
    </div>
  );
};

export default Product;

// export const Hoc = (WrappedComponent) => {
//   return (props) => {
//     return (
//       <>
//         <span
//           style={{
//             background: "brown",
//             color: "#fff",
//             padding: "5px",
//             margin: "5px",
//           }}
//         >
//           Limited Time Deal
//         </span>
//         <WrappedComponent {...props} />
//       </>
//     );
//   };
// };
