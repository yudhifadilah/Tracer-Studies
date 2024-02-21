import React, { SyntheticEvent, useState } from "react";
import {
  Modal,
  ModalContent,
  ModalHeader,
  ModalBody,
  ModalFooter,
  Button,
  useDisclosure,
  Select,
  SelectItem,
} from "@nextui-org/react";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";

type ArtikelData = {
  id: string;
  Title: string;
  Content: string;
  Img1: string;
  Img2: string;
  Status: string;
};

export default function UpdateArtikel(artikel: ArtikelData) {
  const { data: session } = useSession();
  const [status, setStatus] = useState(artikel.Status);
  const { isOpen, onOpen, onClose } = useDisclosure();
  const [isMutating, setIsMutating] = useState(false);

  const router = useRouter();

  async function handleUpdate(e: SyntheticEvent) {
    e.preventDefault();

    setIsMutating(true);

    await fetch(`http://localhost:8080/api/Artikel/${artikel.id}`, {
      method: "PUT",
      headers: {
        Authorization: `Bearer ${session.user.token}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        Status: status, // Memperbarui 'Status' sesuai dengan nilai status terbaru.
      }),
    });

    setIsMutating(false);

    router.refresh();
    onClose();
  }

  return (
    <div>
      <Button onPress={onOpen} size="sm" color="default">
        Edit
      </Button>

      <Modal isOpen={isOpen} onOpenChange={onClose} placement="top-center">
        <ModalContent>
          {(onClose) => (
            <>
              <ModalHeader className="flex flex-col gap-1">Edit {artikel.Status}</ModalHeader>
              <ModalBody>
                <Select
                  value={status} // Menggunakan status sebagai nilai yang akan ditampilkan.
                  placeholder="Select Status"
                  variant="bordered"
                  onChange={(e) => setStatus(e.target.value)} // Memperbarui status saat pengguna memilih opsi.
                >
                  <SelectItem key="active">Active</SelectItem>
                  <SelectItem key="pending">Pending</SelectItem>
                </Select>
              </ModalBody>
              <ModalFooter>
                <Button color="danger" variant="flat" onPress={onClose}>
                  Close
                </Button>
                {!isMutating ? (
                  <Button type="submit" color="primary" onClick={handleUpdate}>
                    Update
                  </Button>
                ) : (
                  <button type="button" className="btn loading">
                    Updating...
                  </button>
                )}
              </ModalFooter>
            </>
          )}
        </ModalContent>
      </Modal>
    </div>
  );
}
