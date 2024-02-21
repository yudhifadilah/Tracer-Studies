import React, { SyntheticEvent, useState } from "react";
import { Modal, ModalContent, ModalHeader, ModalBody, ModalFooter, Button, useDisclosure } from "@nextui-org/react";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";

type UserData = {
    id_user: string
    id: string;
    B01W: string; // Menunggu Pekerjaan
    B02L: string; // Lokasi
    B03J: string; // Jabatan
    B04JT: string; // Jumlah Tenaga Kerja
    B05JP: string; // Jenis Perusahaan
    B06TB: string; // Tempat Bekerja
    B07JA: string; // Jumlah Berganti Pekerjaan
    B08JK: string; // Jam Kerja
    B09PJ: string; // Jumlah Pendapatan
};

export default function DeleteSurvey(userData: UserData) {
  const { data: session } = useSession();
  const { isOpen, onOpen, onClose } = useDisclosure();
  const [isMutating, setIsMutating] = useState(false);

  const router = useRouter();

  async function handleDelete(e: SyntheticEvent) {
    e.preventDefault();

    setIsMutating(true);

    await fetch(`http://localhost:8080/api/dell/${userData.id}`, {
      method: "DELETE",
      headers: {
        Authorization: `Bearer ${session.user.token}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
      }),
    });

    setIsMutating(false);

    router.refresh();
    onClose();
  }

  return (
    <div>
      <Button onPress={onOpen} size="sm" color="danger">
        Delete
      </Button>

      <Modal isOpen={isOpen} onOpenChange={onClose} placement="top-center">
        <ModalContent>
          {(onClose) => (
            <>
              <ModalHeader className="flex flex-col gap-1">Delete {userData.id}</ModalHeader>
              <ModalBody>
                <p>Apakah Anda yakin akan menghapus ini?</p>
              </ModalBody>
              <ModalFooter>
                <Button color="danger" variant="flat" onPress={onClose}>
                  Close
                </Button>
                {!isMutating ? (
                  <Button type="submit" color="danger" onClick={handleDelete}>
                    Delete
                  </Button>
                ) : (
                  <button type="button" className="btn loading">
                    Deleting...
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
