// CardBy.tsx

import React, { useEffect, useState } from 'react';
import { Image, Card } from "@nextui-org/react";

interface Article {
  id: number;
  Title: string;
  Img1: string;
  Img2: string;
  Content: string;
  Status: string;
}

const CardBy: React.FC<{ article: Article }> = ({ article }) => {
  const [image, setImage] = useState<string | null>(null);

  useEffect(() => {
    const fetchImage = async () => {
      try {
        const response = await fetch(`http://localhost:8080/api/image/${article.Img1}`, {
          method: 'GET',
        });

        if (!response.ok) {
          throw new Error('Gagal mengambil gambar');
        }

        const imageData = await response.blob();
        setImage(URL.createObjectURL(imageData));
      } catch (error) {
        console.error('Terjadi kesalahan saat mengambil gambar:', error);
        setImage(null); // Set image ke null jika terjadi kesalahan
      }
    };

    fetchImage();

    // Cleanup function to revoke object URL
    return () => {
      if (image) {
        URL.revokeObjectURL(image);
      }
    };
  }, [article.Img1]);

  return (
    <Card className="p-4 shadow-lg transition duration-300 transform hover:-translate-y-1 hover:shadow-xl">
      <div className="relative h-[200px] overflow-hidden rounded-lg">
        {image && (
          <Image
            src={image}
            alt={article.Title}
            className="rounded-lg"
          />
        )}
      </div>
      <div className="mt-4">
        <h2 className="text-xl font-semibold">{article.Title}</h2>
        <p className="text-gray-600">{article.Content}</p>
      </div>
    </Card>
  );
};

export default CardBy;
