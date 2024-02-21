import React, { useState, useEffect } from "react";
import CustomCard from "./custom-card";

interface CustomCardProps {
  id: number;
  imageUrl: string;
  status: string;
}

const ArticleList: React.FC = () => {
  const [approvedArticles, setApprovedArticles] = useState<CustomCardProps[]>([]);

  useEffect(() => {
    // Fungsi untuk mengambil data dari API
    const fetchData = async () => {
      try {
        // Gantilah URL_API dengan URL API yang sesuai
        const response = await fetch("http://localhost:8080/api/Artikel", {
          method: "GET", // Gunakan metode GET
          headers: {
            "Content-Type": "application/json",
            // Jika diperlukan, tambahkan header lain di sini
            // Misalnya, jika diperlukan token otorisasi, tambahkan header seperti ini:
            // "Authorization": `Bearer ${token}`,
          },
        });

        const data = await response.json();

        // Filter artikel yang sudah disetujui oleh admin
        const approvedArticlesData = data.filter(
          (article: CustomCardProps) => article.status === "active"
        );

        setApprovedArticles(approvedArticlesData);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchData(); // Panggil fungsi fetchData saat komponen dipasang (mounted)
  }, []);

  return (
    <div>
      {approvedArticles.map((article) => (
        <CustomCard {...article.id} {...article.status} />
      ))}
    </div>
  );
};

export default ArticleList;
