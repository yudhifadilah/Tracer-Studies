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
import UpdateProduct from "./UpdateProducts";
import DeleteUser from "./DeleteUser";
import AddUser from "./AddUser";

interface UserData {
  users: {
    id_user: number;
    username: string;
    firstname: string;
    role: string;
    status: string;
    Status_perkawinan: string;
    NoHP: string;
    Nisn: string;
    email: string;
    Tempat_tinggal: string;
    price: number;
  }[];
}

interface AlumniData {
  alumni: {
    id_user: number;
    Nisn: string;
    role: string;
    Status_perkawinan: string;
    Tempat_tinggal: string;
    NoHP: string;
    email: string;
  }[];
}

export const TabUserData: React.FC = () => {
  const { data: session } = useSession();
  const [userData, setUserData] = useState<UserData | null>(null);
  const [alumniData, setAlumniData] = useState<AlumniData | null>(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        if (session && session.user.token) {
          const userResponse = await fetch(
            "http://localhost:8080/api/user/GetAllUsers",
            {
              method: "GET",
              headers: {
                Authorization: `Bearer ${session.user.token}`,
              },
            }
          );

          if (userResponse.ok) {
            const userData = await userResponse.json();
            setUserData(userData);
          } else {
            console.error("Error fetching user data from API");
          }

          // Fetch alumni data
          const alumniResponse = await fetch(
            "http://localhost:8080/api/alumni/GetAlumni",
            {
              method: "GET",
              headers: {
                Authorization: `Bearer ${session.user.token}`,
              },
            }
          );

          if (alumniResponse.ok) {
            const alumniData = await alumniResponse.json();
            setAlumniData(alumniData);
          } else {
            console.error("Error fetching alumni data from API");
          }
        }
      } catch (error) {
        console.error("Error fetching data from API", error);
      }
    };

    fetchData();
  }, [session]);

  return (
    <div className="flex w-full flex-col">
      <Tabs aria-label="Options">
        <Tab key="user" title="User">
          <Card>
            <CardBody>
              <AddUser />
              {userData ? (
                <Table aria-label="User Data Table">
                  <TableHeader>
                    <TableColumn>ID</TableColumn>
                    <TableColumn>Nama Depan</TableColumn>
                    <TableColumn>Nisn</TableColumn>
                    <TableColumn>HandPhone</TableColumn>
                    <TableColumn>Status</TableColumn>
                    <TableColumn>Tempat Tinggal</TableColumn>
                    <TableColumn>Email</TableColumn>

                    <TableColumn>Actions</TableColumn>
                  </TableHeader>
                  <TableBody>
                    {userData.users.map((user) => (
                      <TableRow key={user.id_user}>
                        <TableCell>{user.id_user}</TableCell>
                        <TableCell>{user.firstname}</TableCell>
                        <TableCell>{user.username}</TableCell>
                        <TableCell>{user.NoHP}</TableCell>
                        <TableCell>{user.Status_perkawinan}</TableCell>
                        <TableCell>{user.Tempat_tinggal}</TableCell>
                        <TableCell>{user.email}</TableCell>

                        <TableCell className="flex gap-2">
                          <UpdateProduct {...user} />
                          <DeleteUser {...user} />
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              ) : (
                <div>Loading user data...</div>
              )}
            </CardBody>
          </Card>
        </Tab>
        <Tab key="alumni" title="Alumni">
          <Card>
            <CardBody>
              {/* Display alumni data */}
              {alumniData ? (
                <Table aria-label="Alumni Data Table">
                  <TableHeader>
                    <TableColumn>ID</TableColumn>
                    <TableColumn>Nisn</TableColumn>
                    <TableColumn>HandPhone</TableColumn>
                    <TableColumn>Status</TableColumn>
                    <TableColumn>Tempat Tinggal</TableColumn>
                    <TableColumn>Email</TableColumn>
                  </TableHeader>
                  <TableBody>
                    {alumniData.alumni.map((alumni) => (
                      <TableRow key={alumni.id_user}>
                        <TableCell>{alumni.id_user}</TableCell>
                        <TableCell>{alumni.Nisn}</TableCell>
                        <TableCell>{alumni.NoHP}</TableCell>
                        <TableCell>{alumni.Status_perkawinan}</TableCell>
                        <TableCell>{alumni.Tempat_tinggal}</TableCell>
                        <TableCell>{alumni.email}</TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              ) : (
                <div>Loading alumni data...</div>
              )}
            </CardBody>
          </Card>
        </Tab>
        {/* Add more tabs if needed */}
      </Tabs>
    </div>
  );
};
