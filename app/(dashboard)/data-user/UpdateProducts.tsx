import React, { SyntheticEvent, useState } from "react";
import { Modal, ModalContent, ModalHeader, ModalBody, ModalFooter, Button, useDisclosure, Checkbox, Input, Link } from "@nextui-org/react";
import { useSession } from "next-auth/react";
import {useRouter} from "next/navigation";

type UserData = {
  id_user: number;
  username: string;
  role: string;
  status: string;
  Status_perkawinan: string;
  NoHP: string;
  Nisn: string;
  email: string;
  Tempat_tinggal: string;
  price: number;
  company_name: string;
  owner_name: string;
  alamat_kantor: string;
};

export default function UpdateProduct(userData: UserData) {
  const { data: session } = useSession();
  const [email, setEmail] = useState(userData.email);
  const [noHP, setNoHP] = useState(userData.NoHP);
  const [Tempat_tinggal, setTempat_tinggal] = useState(userData.Tempat_tinggal);

  const { isOpen, onOpen, onClose } = useDisclosure();
  const [isMutating, setIsMutating] = useState(false);

  const router = useRouter();

  async function handleUpdate(e: SyntheticEvent) {
    e.preventDefault();

    setIsMutating(true);

    await fetch(`http://localhost:8080/api/user/EditUser/${userData.id_user}`, {
      method: "PUT",
      headers: {
        Authorization: `Bearer ${session.user.token}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        email: email,
        noHP: noHP,
        Tempat_tinggal: Tempat_tinggal,
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
              <ModalHeader className="flex flex-col gap-1">Edit {userData.email}</ModalHeader>
              <ModalBody>
                <Input
                  autoFocus
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  label="Email"
                  placeholder="Enter your email"
                  variant="bordered"
                />
              </ModalBody>
              <ModalBody>
                <Input
                  value={noHP}
                  onChange={(e) => setNoHP(e.target.value)}
                  label="Nomor Handphone"
                  placeholder="Enter your Phone Number"
                  variant="bordered"
                />
              </ModalBody>
              <ModalBody>
                <Input
                  value={Tempat_tinggal}
                  onChange={(e) => setTempat_tinggal(e.target.value)}
                  label="Tempat Tinggal"
                  placeholder="Enter your Tempat Tinggal"
                  variant="bordered"
                />
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
