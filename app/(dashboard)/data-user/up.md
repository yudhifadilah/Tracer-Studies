import React, { SyntheticEvent, useState } from "react";
import { Modal, ModalContent, ModalHeader, ModalBody, ModalFooter, Button, useDisclosure, Checkbox, Input, Link } from "@nextui-org/react";
import { useSession } from "next-auth/react";
import {useRouter} from "next/navigation";

type UserData = {
  id_user: number;
  username: string;
  role: string;
  status: string;
  music: string;
  photos: string;
  teuing: string;
  email: string;
  title: string;
  price: number;
};

export default function UpdateProduct(userData: UserData) {
  const { data: session } = useSession();
  const [email, setEmail] = useState(userData.email);
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
