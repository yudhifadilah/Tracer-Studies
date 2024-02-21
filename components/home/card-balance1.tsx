import React, { useEffect, useState } from "react";
import { Table, TableHeader, TableColumn, TableBody, TableRow, TableCell } from "@nextui-org/react";

type Product = {
  id: number;
  title: string;
  price: number;
  thumbnail: string;
};

async function getData(): Promise<Product[]> {
  const res = await fetch('https://dummyjson.com/products');
  return await res.json();
}

export const Products: React.FC = () => {
  const [products, setProducts] = useState<Product[]>([]);

  useEffect(() => {
    const fetchData = async () => {
      const productsData = await getData();
      setProducts(productsData);
    };

    fetchData();
  }, []); // Remove the trailing comma here

  return (
    <main>
      <h1 className="productHeader">Our Products</h1>
      <div className="products">
        {products.map((product) => (
          <div className="card" key={product.id}>
            <p>{product.thumbnail}</p>
            <p>{product.title}</p> 
            <p>Price: {product.price}$</p>
          </div>
        ))}
      </div>
    </main>
  );
};