import React, { useState, useEffect } from "react";
import { useSession } from "next-auth/react";
import {
  Table,
  TableHeader,
  TableColumn,
  TableBody,
  TableRow,
  TableCell,
  Card,
  CardBody,
  Pagination,
} from "@nextui-org/react";
import DeleteSurveyWirausaha from "./DeleteWirausaha";

interface SurveyItem {
  id: string;
  id_user: string;
  Firstname: string; // Tambahkan kolom Firstname
  W01AB: string; // Alasan Berwirausaha
  W02L: string; // Lokasi
  W03B: string; // Bidang Wirausaha
  W04P: string; // Produk
  W05TK: string; // Jumlah Tenaga Kerja
  W06SM: string; // Status Modal Wirausaha
  W07FT: string; // Fasilitas Bagi Tenaga Kerja
  W08WM: string; // Waktu Mulai Berwirausaha
  W09J: string; // Jumlah Wirausaha
  W10JK: string; // Jam Kerja
}

export const WirausahaSurvey: React.FC = () => {
  const { data: session } = useSession();
  const [currentPage, setCurrentPage] = useState(1);
  const surveyPerPage = 5;
  const [surveyData, setSurveyData] = useState<SurveyItem[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [userData, setUserData] = useState<any[]>([]);

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      setError(null);
      try {
        if (session && session.user?.token) {
          const [surveyResponse, userDataResponse] = await Promise.all([
            fetch("http://localhost:8080/api/Wirausaha", {
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

            setSurveyData(surveyData.wirausaha);
            setUserData(userData.users);
          } else {
            setError("Error fetching user or survey data from API");
          }
        }
      } catch (error) {
        setError("Error fetching user or survey data from API");
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [session, currentPage]);

  const handlePageChange = (page: number) => {
    setCurrentPage(page);
  };

  const indexOfLastSurvey = currentPage * surveyPerPage;
  const indexOfFirstSurvey = indexOfLastSurvey - surveyPerPage;

  const currentSurvey = surveyData.slice(indexOfFirstSurvey, indexOfLastSurvey);

  // Merge survey data with user data to get Firstname and graduation year
  const mergedData = currentSurvey.map((surveyItem) => {
    const user = userData.find((userItem) => userItem.id_user === surveyItem.id_user);
    return { ...surveyItem, Firstname: user ? user.Firstname : "", tahun_lulus: user ? user.tahun_lulus : "" };
  });

  return (
    <Card>
      <CardBody>
        {loading && <p>Loading...</p>}
        {error && <p>{error}</p>}
        {!loading && !error && (
          <>
            <Table aria-label="Survey Data Wirausaha">
              <TableHeader>
                <TableColumn>ID</TableColumn>
                <TableColumn>ID User</TableColumn>
                <TableColumn>Firstname</TableColumn>
                <TableColumn>Tahun Ke-Lulusan</TableColumn>
                <TableColumn>Alasan Berwirausaha</TableColumn>
                <TableColumn>Lokasi Usaha</TableColumn>
                <TableColumn>Bidang Usaha</TableColumn>
                <TableColumn>Status Modal Usaha</TableColumn>
                <TableColumn>Tahun Mulai</TableColumn>
                <TableColumn>Actions</TableColumn>
              </TableHeader>
              <TableBody>
                {mergedData.map((item) => (
                  <TableRow key={item.id}>
                    <TableCell>{item.id}</TableCell>
                    <TableCell>{item.id_user}</TableCell>
                    <TableCell>{item.Firstname}</TableCell> 
                    <TableCell>{item.tahun_lulus}</TableCell>
                    <TableCell>{item.W01AB}</TableCell>
                    <TableCell>{item.W02L}</TableCell>
                    <TableCell>{item.W03B}</TableCell>
                    <TableCell>{item.W06SM}</TableCell>
                    <TableCell>{item.W08WM}</TableCell>
                    <TableCell className="flex gap-2">
                      <DeleteSurveyWirausaha {...item} />
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
            <div>
              <Pagination
                total={Math.ceil(surveyData.length / surveyPerPage)}
                initialPage={currentPage}
                onChange={handlePageChange}
              />
            </div>
          </>
        )}
      </CardBody>
    </Card>
  );
};

export default WirausahaSurvey;
