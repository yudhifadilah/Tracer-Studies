// article/[id].tsx

import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';

interface Article {
    id: number;
    Title: string;
    Content: string;
    Img1: string;
  }

const ArticlePage: React.FC = () => {
  const router = useRouter();
  const { id } = router.query;
  const [article, setArticle] = useState<Article | null>(null);

  // Membuat fungsi untuk mengambil data artikel berdasarkan ID
  const fetchArticle = async (id: string) => {
    try {
      const response = await fetch(`http://localhost:8080/api/Artikel/getBy/${id}`);
      if (!response.ok) {
        throw new Error('Gagal mengambil data artikel');
      }
      const data = await response.json();
      setArticle(data.article);
    } catch (error) {
      console.error('Terjadi kesalahan:', error);
    }
  };

  // Fetch data artikel saat komponen dimuat
  useEffect(() => {
    if (id && typeof id === 'string') {
      fetchArticle(id);
    }
  }, [id]);

  // Jika id belum terbaca, tampilkan loading atau pesan lainnya
  if (!article) {
    return <div>Loading...</div>;
  }

  // Konten artikel berhasil dimuat, tampilkan
  return (
    <div className="container mx-auto mt-8">
      <h1 className="text-3xl font-semibold mb-4">Article {id}</h1>
      <h2 className="text-xl font-semibold mb-2">{article.Title}</h2>
      <p className="text-gray-600">{article.Content}</p>
    </div>
  );
};

export default ArticlePage;
