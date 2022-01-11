import React from "react";

import * as B from "react-bootstrap";

const Products = ({ products }) => {
  return (
    <B.Row>
      {products &&
        products.map((product, key) => {
          return (
            <B.Col key={key}>
              <div>
                <h4>{product.name}</h4>
                <hr />
                <p>{product.description}</p>
                <p>{product.price}</p>
                <B.Button className="btn btn-success">Adquirir</B.Button>
              </div>
            </B.Col>
          );
        })}
    </B.Row>
  );
};

export default Products;
