// Import required modules
"use client";
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

// Define the UserData interface
type UserData = {
  id_user: number;
  username: string;
  role: string;
  status: string;
  Status_perkawinan: string;
  NoHP: string;
  Nisn: string;
  email: string;
  Tempat_tinggal: string;
  price: number;
  company_name: string;
  owner_name: string;
  alamat_kantor: string;
  Lastname: string;
  Firstname: string;
};

// Define the Profile component
const Profile: React.FC = () => {
  // Get user session data
  const { data: session } = useSession();

  // State to hold user data
  const [userData, setUserData] = useState<UserData | null>(null);

  // Fetch user data on component mount
  useEffect(() => {
    const fetchData = async () => {
      try {
        if (session && session.user.token) {
          const response = await fetch(`http://localhost:8080/api/user/getme`, {
            method: "GET",
            headers: {
              Authorization: `Bearer ${session.user.token}`,
            },
          });

          if (response.ok) {
            const responseData = await response.json();
            const user = responseData.user as UserData;
            setUserData(user);
          } else {
            console.error("Error fetching user data from API");
          }
        }
      } catch (error) {
        console.error("Error fetching user data", error);
      }
    };

    fetchData();
  }, [session]);

  return (
    <div className="flex w-full flex-col">
      <Tabs aria-label="Options">
        <Tab key="profile" title="Profile">
          <Card>
            <CardBody>
              {userData ? (
                <Table aria-label="User Data Table">
                  <TableHeader>
                    <TableColumn>ID</TableColumn>
                    <TableColumn>Username</TableColumn>
                    <TableColumn>First Name</TableColumn>
                    <TableColumn>Last Name</TableColumn>
                    {/* Add more columns based on your data structure */}
                  </TableHeader>
                  <TableBody>
                    <TableRow key={userData.id_user}>
                      <TableCell>{userData.id_user}</TableCell>
                      <TableCell>{userData.username}</TableCell>
                      <TableCell>{userData.Firstname}</TableCell>
                      <TableCell>{userData.Lastname}</TableCell>
                      {/* Add more cells based on your data structure */}
                    </TableRow>
                  </TableBody>
                </Table>
              ) : (
                <div>Loading user data...</div>
              )}
            </CardBody>
          </Card>
        </Tab>
        {/* Add more tabs if needed */}
      </Tabs>
    </div>
  );
};

// Export the Profile component as the default export
export default Profile;
