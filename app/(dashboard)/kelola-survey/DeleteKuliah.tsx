import React, { SyntheticEvent, useState } from "react";
import { Modal, ModalContent, ModalHeader, ModalBody, ModalFooter, Button, useDisclosure } from "@nextui-org/react";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";

type UserData = {
    id_user: string;
    id: string;
    W01AB: string; // Alasan Berwirausaha
    W02L: string; // Lokasi
    W03B: string; // Bidang Wirausaha
    W04P: string; // Produk
    W05TK: string; // Jumlah Tenaga Kerja
    W06SM: string; // Status Modal Wirausaha
    W07FT: string; // Fasilitas Bagi Tenaga Kerja
    W08WM: string; // Waktu Mulai Berwirausaha
    W09J: string; // Jumlah Wirausaha
    W10JK: string; // Jam Kerja
    S01: string;
    S02: string;
    S03: string;
    S04: string;
};

export default function DeleteSurveyKuliah(userData: UserData) {
  const { data: session } = useSession();
  const { isOpen, onOpen, onClose } = useDisclosure();
  const [isMutating, setIsMutating] = useState(false);

  const router = useRouter();

  async function handleDelete(e: SyntheticEvent) {
    e.preventDefault();

    setIsMutating(true);

    await fetch(`http://localhost:8080/api/Studi/dellet/${userData.id}`, {
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
