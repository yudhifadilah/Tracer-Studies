import React from "react";
import { Modal, ModalContent, ModalHeader, ModalBody, ModalFooter, Button, useDisclosure } from "@nextui-org/react";

interface Article {
  id: number;
  Title: string;
  Content: string;
  Img1: string;
}

const Modals: React.FC<{ article: Article }> = ({ article }) => {
  const { isOpen, onOpen, onClose } = useDisclosure();

  return (
    <div className="flex flex-col gap-2">
    <>
      <Button onPress={onOpen}>Read More</Button>
      <Modal 
        backdrop="opaque" 
      isOpen={isOpen} 
      onClose={onClose}
      classNames={{
        backdrop: "bg-gradient-to-t from-zinc-900 to-zinc-900/10 backdrop-opacity-100"
      }}
      >
        <ModalContent>
        {(onClose) => (
             <>
          <ModalHeader className="flex flex-col gap-1">{article.Title}</ModalHeader>
          <ModalBody>
            <p>{article.Content}</p>
          </ModalBody>
          <ModalFooter>
            <Button color="danger" variant="flat" onPress={onClose}>
              Close
            </Button>
          </ModalFooter>
          </>

          )}

        </ModalContent>
      </Modal>
    </>
    </div>
  );
};

export default Modals;
