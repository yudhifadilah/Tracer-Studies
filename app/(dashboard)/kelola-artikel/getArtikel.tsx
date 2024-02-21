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
import UpdateArtikel from "./updateArtikel";

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

  useEffect(() => {
    const fetchData = async () => {
      try {
        if (session && session.user.token) {
          const response = await fetch("http://localhost:8080/api/Artikel", {
            method: "GET",
            headers: {
              Authorization: `Bearer ${session.user.token}`,
            },
          });

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
  }, [session]);

  return (
    <div className="flex w-full flex-col">
      <Tabs aria-label="Options">
        <Tab key="artikel" title="Artikel">
          <Card>
            <CardBody>
              {artikelData?.Artikels ? (
                <Table aria-label="Artikel Data Table">
                  <TableHeader>
                    <TableColumn>ID</TableColumn>
                    <TableColumn>Title</TableColumn>
                    <TableColumn>Content</TableColumn>
                    <TableColumn>Status</TableColumn>
                    <TableColumn>Actions</TableColumn>
                  </TableHeader>
                  <TableBody>
                    {artikelData.Artikels.map((artikel) => (
                      <TableRow key={artikel.id}>
                        <TableCell>{artikel.id}</TableCell>
                        <TableCell>{artikel.Title}</TableCell>
                        <TableCell>{artikel.Content}</TableCell>
                        <TableCell>{artikel.Status}</TableCell>
                        <TableCell className="flex gap-2">
                          <UpdateArtikel {...artikel} />
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              ) : (
                <div>No artikel data available.</div>
              )}
            </CardBody>
          </Card>
        </Tab>
        {/* Rest of your Tabs... */}
      </Tabs>
    </div>
  );
};
