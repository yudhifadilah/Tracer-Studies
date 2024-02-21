import { Avatar, Card, CardBody, Table, TableHeader, TableColumn, TableBody, TableRow, TableCell } from "@nextui-org/react";
import React, { useEffect, useState } from "react";
import { useSession } from "next-auth/react";

interface Product {
  id: number;
  title: string;
  description: string;
  brand: string;
  amount: number;
  role: string;
  date: string;
}

const columns = [
  {
    key: "title",
    label: "TITLE",
  },
  {
    key: "description",
    label: "DESCRIPTION",
  },
  {
    key: "date",
    label: "DATE",
  },
];

export const CardTransactions = () => {
  const { data: session } = useSession();
  const [userData, setUserData] = useState<Product[]>([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        if (session) {
          const response = await fetch("https://dummyjson.com/products", {
            headers: {
              Authorization: `Bearer ${session.accessToken}`,
            },
          });

          if (response.ok) {
            const data = await response.json();
            console.log("Fetched data:", data);

            // Check if the data is an array before setting the state
            if (Array.isArray(data)) {
              setUserData(data);
            } else {
              console.error("Invalid data structure received from API");
            }
          } else {
            console.error("Error fetching user data from API");
          }
        }
      } catch (error) {
        console.error("Error fetching user data from API", error);
      }
    };

    fetchData();
  }, [session]);

  return (
    <Card className="bg-default-50 rounded-xl shadow-md px-3">
      <CardBody className="py-5 gap-4">
        <div className="flex gap-2.5 justify-center">
          <div className="flex flex-col border-dashed border-2 border-divider py-2 px-6 rounded-xl">
            <span className="text-default-900 text-xl font-semibold">
              Recent Update
            </span>
          </div>
        </div>

        {userData.length > 0 ? (
          <Table aria-label="Example table with dynamic content">
            <TableHeader columns={columns}>
              {(column) => <TableColumn key={column.key}>{column.label}</TableColumn>}
            </TableHeader>
            <TableBody items={userData}>
              {(item) => (
                <TableRow key={item.id}>
                  {columns.map((column) => (
                    <TableCell key={column.key}>{item[column.key]}</TableCell>
                  ))}
                </TableRow>
              )}
            </TableBody>
          </Table>
        ) : (
          <div className="flex flex-col gap-6">
            {userData.map((product, index) => (
              <div key={index} className="grid grid-cols-4 w-full">
                <div className="w-full">
                  <Avatar
                    isBordered
                    color="secondary"
                    src={product.title} // Assuming your API response has an 'avatar' property
                  />
                </div>
                <span className="text-default-900 font-semibold">{product.title}</span>
                <div>
                  <span className="text-success text-xs">{product.description}</span>
                </div>
                <div>
                  <span className="text-default-500 text-xs">{product.date}</span>
                </div>
              </div>
            ))}
          </div>
        )}
      </CardBody>
    </Card>
  );
};
