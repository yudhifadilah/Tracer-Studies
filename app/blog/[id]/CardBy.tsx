import React from 'react';
import { Image, Card } from "@nextui-org/react";
import {useRouter} from 'next/navigation';

interface Article {
  id: number;
  Title: string;
  Content: string;
  Img1: string;
}

const Cardss: React.FC<{ article: Article }> = ({ article }) => {
  const [image, setImage] = React.useState<string | null>(null);
  const router = useRouter();


  React.useEffect(() => {
    const fetchImage = async () => {
      try {
        const response = await fetch(`http://localhost:8080/api/image/${article.id}`, {
          method: 'GET',
        });

        if (!response.ok) {
          throw new Error('Gagal mengambil gambar');
        }

        const imageData = await response.blob();
        setImage(URL.createObjectURL(imageData));
      } catch (error) {
        console.error('Terjadi kesalahan saat mengambil gambar:', error);
      }
    };

    fetchImage();

    // Cleanup function to revoke object URL
    return () => {
      if (image) {
        URL.revokeObjectURL(image);
      }
    };
  }, [article.id]); // Hapus image dari array dependensi

  const handleCardClick = () => {
    // Redirect to article page based on article ID
    router.push(`/blog/${article.id}`);
  };

  return (
    <Card className="p-4 shadow-lg transition duration-300 transform hover:-translate-y-1 hover:shadow-xl">
      <div className="relative h-[200px] overflow-hidden rounded-lg"      
       onClick={handleCardClick} 
       >
        {image && (
          <Image
          isBlurred
          isZoomed
          width={500}
          height={500}
            src={image}
            alt={article.Title}
            objectFit="cover"
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

export default Cardss;
