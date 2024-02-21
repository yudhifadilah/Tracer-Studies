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
import CreateArtikel from "../perusahaan/PostArtikel";

interface ArtikelData {
  Artikels: {
    id: string;
    Title: string;
    Content: string;
    Status: string;
  }[];
}

export const GetArtikel: React.FC = () => {
  const { data: session } = useSession();
  const [artikelData, setArtikelData] = useState<ArtikelData | null>(null);
  const [currentPage, setCurrentPage] = useState(1);
  const articlesPerPage = 5;

  useEffect(() => {
    const fetchData = async () => {
      try {
        if (session && session.user.token) {
          const response = await fetch(
            `http://localhost:8080/api/Artikel?page=${currentPage}&limit=${articlesPerPage}`,
            {
              method: "GET",
              headers: {
                Authorization: `Bearer ${session.user.token}`,
              },
            }
          );

          if (response.ok) {
            const data = await response.json();
            setArtikelData(data);
          } else {
            console.error("Error fetching user data from API");
          }
        }
      } catch (error) {
        console.error("Error fetching user data from API", error);
      }
    };

    fetchData();
  }, [session, currentPage]);

  const totalPages = Math.ceil(
    artikelData?.Artikels.length / articlesPerPage
  );

  const handlePageChange = (page: number) => {
    setCurrentPage(page);
  };

  const indexOfLastArticle = currentPage * articlesPerPage;
  const indexOfFirstArticle = indexOfLastArticle - articlesPerPage;
  const currentArticles = artikelData?.Artikels.slice(
    indexOfFirstArticle,
    indexOfLastArticle
  );

  return (
    <div className="flex w-full flex-col">
      <Tabs aria-label="Options">
        <Tab key="artikel" title="Artikel">
            <CreateArtikel/>
          <Card>
            <CardBody>
              {currentArticles?.length ? (
                <>
                  <Table aria-label="Artikel Data Table">
                    <TableHeader>
                      <TableColumn>ID</TableColumn>
                      <TableColumn>Title</TableColumn>
                      <TableColumn>Content</TableColumn>
                      <TableColumn>Status</TableColumn>
                    </TableHeader>
                    <TableBody>
                      {currentArticles.map((artikel) => (
                        <TableRow key={artikel.id}>
                          <TableCell>{artikel.id}</TableCell>
                          <TableCell>{artikel.Title}</TableCell>
                          <TableCell>{artikel.Content}</TableCell>
                          <TableCell>{artikel.Status}</TableCell>
                        </TableRow>
                      ))}
                    </TableBody>
                  </Table>
                 
                </>
              ) : (
                <div>No artikel data available.</div>
              )}
               <Pagination
                    total={10}
                    initialPage={1}
                    onChange={handlePageChange}
                  />
            </CardBody>
          </Card>
        </Tab>
        {/* Rest of your Tabs... */}
      </Tabs>
    </div>
  );
};
