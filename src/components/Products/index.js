import React from "react";
import * as B from "react-bootstrap";
import styles from "./index.module.css";

const Products = ({ products, title }) => {
  return (
    <B.Row>
      {title && (
        <div className={styles.productTitle}>
          <h2>{title}</h2>
        </div>
      )}

      {products &&
        products.map((product, key) => {
          return (
            <B.Col key={key}>
              <div>
                <h4>{product.name}</h4>
                <hr />
                <p>{product.description}</p>
                <p>R$ {product.price}</p>
                <B.Button className="btn btn-success">Adquirir</B.Button>
              </div>
            </B.Col>
          );
        })}
    </B.Row>
  );
};

export default Products;
