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
import {Bre} from "./bre";
import UpdateCompany from "./updateCompany";
import UpdateAlumni from "./updateAlumni";
import CreateArtikel from "../perusahaan/PostArtikel";

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
  Tahun_lulus: string;
  tahun_lulus: string;
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
      <Bre />
         <Tabs aria-label="Options">
        {(userData && userData.role === "admin") && (
          <Tab key="admin" title="Admin Profile">
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
                        </TableRow>
                    </TableBody>
                  </Table>
                ) : (
                  <div>Loading user data...</div>
                )}
              </CardBody>
            </Card>
          </Tab>
        )}
        {(userData && userData.role === "perusahaan") && (
          <Tab key="perusahaan" title="Profile Perusahaan">
            <Card>
              <CardBody>
              {userData ? (
                  <Table aria-label="User Data Table">
                    <TableHeader>
                      <TableColumn>ID</TableColumn>
                      <TableColumn>Username</TableColumn>
                      <TableColumn>Owner Name</TableColumn>
                      <TableColumn>Company Name</TableColumn>
                      <TableColumn>Alamat Kantor</TableColumn>
                      <TableColumn>Actions</TableColumn>
                    </TableHeader>
                    <TableBody>
                      <TableRow key={userData.id_user}>
                        <TableCell>{userData.id_user}</TableCell>
                        <TableCell>{userData.username}</TableCell>
                        <TableCell>{userData.owner_name}</TableCell>
                        <TableCell>{userData.company_name}</TableCell>
                        <TableCell>{userData.alamat_kantor}</TableCell>
                        <TableCell className="flex gap-2">
                          {/* Assuming UpdateProduct and DeleteUser expect alumni properties */}
                          <UpdateCompany {...userData} />
                          <CreateArtikel {...CreateArtikel} />
                        </TableCell>
                        </TableRow>
                    </TableBody>
                  </Table>
                ) : (
                  <div>Loading user data...</div>
                )}
              </CardBody>
            </Card>
          </Tab>
        )}
        {(userData && userData.role === "alumni" ) && (
          <Tab key="alumni" title="Profile Alumni">
            <Card>
              <CardBody>
                {userData ? (
                  <Table aria-label="Alumni Data Table">
                    <TableHeader>
                      <TableColumn>ID</TableColumn>
                      <TableColumn>Username</TableColumn>
                      <TableColumn>First Name</TableColumn>
                      <TableColumn>Last Name</TableColumn>
                      <TableColumn>Tahun Kelulusan</TableColumn>
                      <TableColumn>E - Mail</TableColumn>
                      <TableColumn>Actions</TableColumn>
                      {/* Add more columns based on your data structure */}
                    </TableHeader>
                    <TableBody>
                      <TableRow key={userData.id_user}>
                        <TableCell>{userData.id_user}</TableCell>
                        <TableCell>{userData.username}</TableCell>
                        <TableCell>{userData.Firstname}</TableCell>
                        <TableCell>{userData.Lastname}</TableCell>
                        <TableCell>{userData.tahun_lulus}</TableCell>
                        <TableCell>{userData.email}</TableCell>
                        <TableCell className="flex gap-2">
                          {/* Assuming UpdateProduct and DeleteUser expect alumni properties */}
                          <UpdateAlumni {...userData} />
                        </TableCell>                      
                        </TableRow>
                    </TableBody>
                  </Table>
                ) : (
                  <div>Loading user data...</div>
                )}
              </CardBody>
            </Card>
          </Tab>
        )}
        {/* Add more tabs if needed */}
      </Tabs>
    </div>
  );
};

// Export the Profile component as the default export
export default Profile;
