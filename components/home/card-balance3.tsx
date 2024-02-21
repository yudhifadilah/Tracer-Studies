import { Card, CardBody } from "@nextui-org/react";
import React, { useEffect, useState } from "react";
import { Community } from "../icons/community";

export const CardBalance3 = () => {
  const [data, setData] = useState<any>(null); // Change 'any' to the actual type of your API response

  useEffect(() => {
    const fetchData = async () => {
      try {
        // Replace with your local API endpoint
        const response = await fetch("https://dummyjson.com/products");

        if (response.ok) {
          const result = await response.json();
          setData(result);
        } else {
          console.error("Error fetching data from API");
        }
      } catch (error) {
        console.error("Error fetching data from API", error);
      }
    };

    fetchData();
  }, []); // The empty dependency array ensures that this effect runs only once when the component mounts

  return (
    <Card className="xl:max-w-sm bg-success rounded-xl shadow-md px-3 w-full">
      <CardBody className="py-5">
        <div className="flex gap-2.5">
          <Community />
          <div className="flex flex-col">
            <span className="text-white">Card Insurance</span>
            <span className="text-white text-xs">{data ? data.cars : "Loading..."} Cars</span>
          </div>
        </div>
        <div className="flex gap-2.5 py-2 items-center">
          <span className="text-white text-xl font-semibold">{data ? `$${data.amount}` : "Loading..."}</span>
          <span className="text-danger text-xs">- 4.5%</span>
        </div>
        <div className="flex items-center gap-6">
          <div>
            <div>
              <span className="font-semibold text-danger text-xs">{"↓"}</span>
              <span className="text-xs">{data ? data.downValue : "Loading..."}</span>
            </div>
            <span className="text-white text-xs">USD</span>
          </div>

          <div>
            <div>
              <span className="font-semibold text-danger text-xs">{"↑"}</span>
              <span className="text-xs">{data ? data.upValue : "Loading..."}</span>
            </div>
            <span className="text-white text-xs">USD</span>
          </div>

          <div>
            <div>
              <span className="font-semibold text-danger text-xs">{"⭐"}</span>
              <span className="text-xs">{data ? data.vipValue : "Loading..."}</span>
            </div>
            <span className="text-white text-xs">VIP</span>
          </div>
        </div>
      </CardBody>
    </Card>
  );
};
