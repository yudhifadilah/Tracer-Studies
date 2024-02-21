import React, { useState, useEffect } from 'react';
import { Image, Card, Button } from "@nextui-org/react";
import ArticleModal from './ArticleModal'; // Import komponen modal baru

interface Article {
  id: number;
  Title: string;
  Content: string;
  Img1: string;
}

const Cards: React.FC<{ article: Article }> = ({ article }) => {
  const [image, setImage] = useState<string | null>(null);
  const [loading, setLoading] = useState<boolean>(false);
  const [showModal, setShowModal] = useState<boolean>(false);

  useEffect(() => {
    const fetchImage = async () => {
      setLoading(true);
      try {
        const response = await fetch(`http://localhost:8080/api/image/${article.id}`, {
          method: 'GET',
        });

        if (!response.ok) {
          throw new Error('Failed to fetch image');
        }

        const imageData = await response.blob();
        setImage(URL.createObjectURL(imageData));
      } catch (error) {
        console.error('Error fetching image:', error.message);
      } finally {
        setLoading(false);
      }
    };

    fetchImage();

    // Cleanup function to revoke object URL
    return () => {
      if (image) {
        URL.revokeObjectURL(image);
      }
    };
  }, [article.id]);

  const toggleModal = () => {
    setShowModal((prevShowModal) => !prevShowModal);
  };

  return (
    <>
      <div className="relative">
        <Card className="p-4 shadow-lg transition duration-300 transform hover:-translate-y-1 hover:shadow-xl relative">
          <div className="relative h-[200px] overflow-hidden rounded-lg">
            {loading && <p>Loading...</p>}
            {image && (
              <Image
                isBlurred
                isZoomed
                width={300}
                height={300}
                src={image}
                alt={article.Title}
                className="rounded-lg"
              />
            )}
          </div>
          <div className="mt-4">
            <h2 className="text-xl font-semibold">{article.Title}</h2>
            <p className="text-gray-600">{article.Content}</p>
            <Button autoFocus variant="flat" color="success" onClick={toggleModal}>
              Read More
            </Button>
          </div>
        </Card>
        {showModal && (
          <ArticleModal isOpen={showModal} onClose={toggleModal} article={article} image={image} />
        )}
      </div>
    </>
  );
};

export default Cards;
