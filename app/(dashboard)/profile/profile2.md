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

export default function UpdateCompany(userData: UserData) {
  const { data: session } = useSession();
  const [owner, setOwner] = useState(userData.owner_name);
  const [company, setCompany] = useState(userData.company_name);
  const [kantor, setKantor] = useState(userData.alamat_kantor);
  const [email, setEmail] = useState(userData.email);
  const [status, setStatus] = useState(userData.status);
  const { isOpen, onOpen, onClose } = useDisclosure();
  const [isMutating, setIsMutating] = useState(false);

  const router = useRouter();

  async function handleUpdate(e: SyntheticEvent) {
    e.preventDefault();

    setIsMutating(true);

        // Update the status based on the user's role
        let status = userData.status; // default to the existing status

        if (userData.role === "alumni") {
          status = "1";
        } else if (userData.role === "perusahaan") {
          status = "2";
        } else if (userData.role === "admin") {
          status = "3";
        }

    await fetch(`http://localhost:8080/api/user/EditUser/${userData.id_user}`, {
      method: "PUT",
      headers: {
        Authorization: `Bearer ${session.user.token}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        owner_name: owner,
        company_name: company,
        alamat_kantor: kantor,
        email: email,
        status: status,



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
              <ModalHeader className="flex flex-col gap-1">Edit {userData.username}</ModalHeader>
              <ModalBody>
                <Input
                  autoFocus
                  value={owner}
                  onChange={(e) => setOwner(e.target.value)}
                  label="Owner"
                  placeholder=""
                  variant="bordered"
                />
              </ModalBody>
              <ModalBody>
                <Input
                  value={company}
                  onChange={(e) => setCompany(e.target.value)}
                  label="Company"
                  placeholder=""
                  variant="bordered"
                />
              </ModalBody>
              <ModalBody>
                <Input
                  value={kantor}
                  onChange={(e) => setKantor(e.target.value)}
                  label="Alamat Kantor"
                  placeholder=""
                  variant="bordered"
                />
              </ModalBody>              
              <ModalBody>
                <Input
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  label="Email"
                  placeholder=""
                  variant="bordered"
                />
              </ModalBody>
              <ModalBody>
                <Input
                isDisabled
                  value={status}
                  onChange={(e) => setStatus(e.target.value)}
                  label="status"
                  placeholder="status"
                  variant="flat"
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
