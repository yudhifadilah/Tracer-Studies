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
import AddPerusahaan from "./AddCompany";
import BubbleSortComponent from "./algoritma/bubblesort";


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
    firstname: string;
    username: string;
    Nisn: string;
    role: string;
    Status_perkawinan: string;
    Tempat_tinggal: string;
    NoHP: string;
    email: string;
  }[];
}
// ... (previous imports)

interface PerusahaanData {
  perusahaan: {
    id_user: number;
    username: string;
    company_name: string;
    owner_name: string;
    noHP: number;
    alamat_kantor: string;
    email: string;
  }[];
}

// ... (previous imports)

export const TabUserData: React.FC = () => {
  const { data: session } = useSession();
  const [userData, setUserData] = useState<UserData | null>(null);
  const [alumniData, setAlumniData] = useState<AlumniData | null>(null);
  const [perusahaanData, setPerusahaanData] = useState<PerusahaanData | null>(null);

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

            // Filter alumni data based on role
            const alumniData = userData.users.filter(
              (user) => user.role === "alumni"
            );
            setAlumniData({ alumni: alumniData });

            // Filter perusahaan data based on role
            const perusahaanData = userData.users.filter(
              (user) => user.role === "perusahaan"
            );
            setPerusahaanData({ perusahaan: perusahaanData });
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
 
        <Tab key="alumni" title="Alumni">
          <Card>
          <AddUser/>

            <CardBody>

              {alumniData ? (
                <Table aria-label="Alumni Data Table">
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
                    {alumniData.alumni.map((alumni) => (
                      <TableRow key={alumni.id_user}>
                        <TableCell>{alumni.id_user}</TableCell>
                        <TableCell>{alumni.firstname}</TableCell>
                        <TableCell>{alumni.username}</TableCell>
                        <TableCell>{alumni.NoHP}</TableCell>
                        <TableCell>{alumni.Status_perkawinan}</TableCell>
                        <TableCell>{alumni.Tempat_tinggal}</TableCell>
                        <TableCell>{alumni.email}</TableCell>
                        <TableCell className="flex gap-2">
                          {/* Assuming UpdateProduct and DeleteUser expect alumni properties */}
                          <UpdateProduct {...alumni} />
                          <DeleteUser {...alumni} />
                        </TableCell>
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
        <Tab key="perusahaan" title="Perusahaan">
          <Card>
            <AddPerusahaan/>
            <CardBody>
              {perusahaanData ? (
                <Table aria-label="Perusahaan Data Table">
                   <TableHeader>
                    <TableColumn>ID</TableColumn>
                    <TableColumn>Username</TableColumn>
                    <TableColumn>Nama Perusahaan</TableColumn>
                    <TableColumn>Nama Owner</TableColumn>
                    <TableColumn>HandPhone</TableColumn>
                    <TableColumn>Alamat Kantor</TableColumn>
                    <TableColumn>Email</TableColumn>
                    <TableColumn>Actions</TableColumn>
                  </TableHeader>
                  <TableBody>
                    {perusahaanData.perusahaan.map((perusahaan) => (
                      <TableRow key={perusahaan.id_user}>
                        {/* Add table cells for perusahaan role */}
                        <TableCell>{perusahaan.id_user}</TableCell>
                        <TableCell>{perusahaan.username}</TableCell>
                        <TableCell>{perusahaan.company_name}</TableCell>
                        <TableCell>{perusahaan.owner_name}</TableCell>
                        <TableCell>{perusahaan.noHP}</TableCell>
                        <TableCell>{perusahaan.alamat_kantor}</TableCell>
                        <TableCell>{perusahaan.email}</TableCell>
                        <TableCell className="flex gap-2">
                          {/* Assuming UpdateProduct and DeleteUser expect alumni properties */}
                          <UpdateProduct {...perusahaan} />
                          <DeleteUser {...perusahaan} />
                        </TableCell>                      
                        </TableRow>
                    ))}
                  </TableBody>
                </Table>
              ) : (
                <div>Loading perusahaan data...</div>
              )}
            </CardBody>
          </Card>
        </Tab>
        {/* Add more tabs if needed */}
      </Tabs>
    </div>
  );
};
