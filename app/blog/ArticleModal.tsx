import React from 'react';
import { Modal, ModalBody, ModalFooter, ModalHeader, ModalContent, Button, Image } from "@nextui-org/react";

interface ArticleModalProps {
  isOpen: boolean;
  onClose: () => void;
  article: Article;
  image: string | null;
}

interface Article {
  Title: string;
  Content: string;
}

const ArticleModal: React.FC<ArticleModalProps> = ({ isOpen, onClose, article, image }) => {
  return (
    <div className="flex flex-col gap-2">

    <Modal 
    isOpen={isOpen} 
    onClose={onClose} 
    backdrop="opaque"
    classNames={{
        backdrop: "bg-gradient-to-t from-zinc-900 to-zinc-900/10 backdrop-opacity-100"
      }}
    >
    <ModalContent>
      <ModalHeader>{article.Title}</ModalHeader>
      <ModalBody>
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
        <p>{article.Content}</p>
      </ModalBody>
      <ModalFooter>
        <Button variant="flat" color="danger" onClick={onClose}>
          Close
        </Button>
      </ModalFooter>
      </ModalContent>

    </Modal>
    </div>
  );
};

export default ArticleModal;
