"use client"
import React, { useEffect, useState } from "react";
import {
  Tabs,
  Tab,
  Card,
  CardBody,
  Table,
  TableHeader,
  TableColumn,
  TableBody,
  TableRow,
  TableCell,
} from "@nextui-org/react";
import { useSession } from "next-auth/react";

interface user {
  id_user: number;
  title: string;
  role: string;
  firstname: string;
  lastname: string;
  status_perkawinan: string;
  tempat_tinggal: string;
  NoHP: number;
  status: string;
  username: string;
  alamat_kantor: string;
  company_name: string;
  owner_name: string;
  email: string;
}

interface UserData {
  users: user[];
}

const ProductList: React.FC = () => {
  const { data: session } = useSession();
  const [userData, setUserData] = useState<UserData | null>(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        if (session && session.user.token) {
          const response = await fetch("http://localhost:8080/api/user/getme", {
            method: "GET",
            headers: {
              Authorization: `Bearer ${session.user.token}`,
            },
          });

          if (response.ok) {
            const data: UserData = await response.json();
            setUserData(data);
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
    <div className="flex w-full flex-col">
      <Tabs aria-label="Options">
        <Tab key="users" title="Users">
          <Card>
            <CardBody>
              {userData?.users ? (
                <Table aria-label="User Data Table">
                  <TableHeader>
                    <TableColumn>ID</TableColumn>
                    <TableColumn>Username</TableColumn>
                    <TableColumn>Status</TableColumn>
                    <TableColumn>Role</TableColumn>
                  </TableHeader>
                  <TableBody>
                    {userData.users.map((user) => (
                      <TableRow key={user.id_user}>
                        <TableCell>{user.id_user}</TableCell>
                        <TableCell>{user.username}</TableCell>
                        <TableCell>{user.status}</TableCell>
                        <TableCell>{user.role}</TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              ) : (
                <div>No user data available.</div>
              )}
            </CardBody>
          </Card>
        </Tab>
        {/* Rest of your Tabs... */}
      </Tabs>
    </div>
  );
};

export default ProductList;
