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
  Pagination,
} from "@nextui-org/react";
import { useSession } from "next-auth/react";
import DeleteSurvey from "./updateSurvey";
import { WirausahaSurvey } from "./getWirausaha";
import KuliahSurvey from "./getKuliah";

interface UserData {
  id_user: number;
  Firstname: string;
  tahun_lulus: string; // Added year of graduation
}

interface SurveyData {
  id: number;
  B01W: string;
  B02L: string;
  B03J: string;
  B04JT: string;
  B05JP: string;
  B06TB: string;
  B07JA: string;
  B08JK: string;
  B09PJ: string;
  // Lanjutkan dengan properti survei lainnya sesuai kebutuhan
  id_user: number;
}

export const GetSurvey: React.FC = () => {
  const { data: session } = useSession();
  const [surveyData, setSurveyData] = useState<SurveyData[]>([]);
  const [userData, setUserData] = useState<UserData[]>([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [sortBy, setSortBy] = useState("B01W"); // Default sorting column
  const surveyPerPage = 5;

  useEffect(() => {
    const fetchData = async () => {
      try {
        if (session && session.user.token) {
          const [surveyResponse, userDataResponse] = await Promise.all([
            fetch("http://localhost:8080/api/Bekerja", {
              method: "GET",
              headers: {
                Authorization: `Bearer ${session.user.token}`,
              },
            }),
            fetch("http://localhost:8080/api/user/GetAllUsers", {
              method: "GET",
              headers: {
                Authorization: `Bearer ${session.user.token}`,
              },
            }),
          ]);

          if (surveyResponse.ok && userDataResponse.ok) {
            const [surveyData, userData] = await Promise.all([
              surveyResponse.json(),
              userDataResponse.json(),
            ]);

            setSurveyData(surveyData.bekerja);
            setUserData(userData.users);
          } else {
            console.error("Error fetching user or survey data from API");
          }
        }
      } catch (error) {
        console.error("Error fetching user or survey data from API", error);
      }
    };

    fetchData();
  }, [session, sortBy]); // Removed currentPage as a dependency since it's not used

  const handlePageChange = (page: number) => {
    setCurrentPage(page);
  };

  const totalSurveys = surveyData.length || 0;
  const totalPageCount = Math.ceil(totalSurveys / surveyPerPage);

  const indexOfLastSurvey = currentPage * surveyPerPage;
  const indexOfFirstSurvey = indexOfLastSurvey - surveyPerPage;
  const currentSurvey = surveyData.slice(
    indexOfFirstSurvey,
    indexOfLastSurvey
  );

  // Merge survey data with user data
  const mergedData = currentSurvey.map((surveyItem) => {
    const user = userData.find((userItem) => userItem.id_user === surveyItem.id_user);
    return { ...surveyItem, Firstname: user ? user.Firstname : "", tahun_lulus: user ? user.tahun_lulus : "" };
  });

  // Bubble Sort implementation
  const bubbleSort = (array: any[], key: string) => {
    const n = array.length;
    let swapped;
    do {
      swapped = false;
      for (let i = 0; i < n - 1; i++) {
        if (array[i][key] > array[i + 1][key]) {
          const temp = array[i];
          array[i] = array[i + 1];
          array[i + 1] = temp;
          swapped = true;
        }
      }
    } while (swapped);
    return array;
  };

  return (
    <div className="flex w-full flex-col">
      <Tabs aria-label="Options">
        <Tab key="Bekerja" title="Bekerja">
          <Card>
            <CardBody>
              {currentSurvey && currentSurvey.length > 0 ? (
                <Table aria-label="Survey Data Bekerja">
                  <TableHeader>
                    <TableColumn>No</TableColumn>
                    <TableColumn>ID User</TableColumn>
                    <TableColumn>First Name</TableColumn>
                    <TableColumn>Tahun Ke-Lulusan</TableColumn>
                    <TableColumn>Menunggu Pekerjaan</TableColumn>
                    <TableColumn>Lokasi Bekerja</TableColumn>
                    <TableColumn>Jabatan</TableColumn>
                    <TableColumn>Jenis Perusahaan</TableColumn>
                    <TableColumn>Jumlah Berganti Pekerjaan</TableColumn>
                    <TableColumn>Actions</TableColumn>
                  </TableHeader>
                  <TableBody>
                    {mergedData.map((item, index) => (
                      <TableRow key={item.id}>
                        <TableCell>{index + 1}</TableCell>
                        <TableCell>{item.id_user}</TableCell>
                        <TableCell>{item.Firstname}</TableCell>
                        <TableCell>{item.tahun_lulus}</TableCell>
                        <TableCell>{item.B01W}</TableCell>
                        <TableCell>{item.B02L}</TableCell>
                        <TableCell>{item.B03J}</TableCell>
                        <TableCell>{item.B05JP}</TableCell>
                        <TableCell>{item.B07JA}</TableCell>
                        <TableCell className="flex gap-2">
                          <DeleteSurvey {...item} />
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              ) : (
                <div>No Survey data available.</div>
              )}
              <Pagination
                total={totalPageCount}
                initialPage={currentPage}
                onChange={handlePageChange}
              />
            </CardBody>
          </Card>
        </Tab>
        <Tab key="Wirausaha" title="Wirausaha">
          {currentSurvey && currentSurvey.length > 0 ? (
            <WirausahaSurvey data={currentSurvey} />
          ) : (
            <div>No Survey data available for Wirausaha.</div>
          )}
        </Tab>
        <Tab key="Kuliah" title="Kuliah">
          {currentSurvey && currentSurvey.length > 0 ? (
            <KuliahSurvey data={currentSurvey} />
          ) : (
            <div>No Survey data available for Kuliah.</div>
          )}
        </Tab>
      </Tabs>
    </div>
  );
};
