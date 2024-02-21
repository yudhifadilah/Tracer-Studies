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
  Firstname: string;
  Lastname: string;
  Tahun_lulus: string;
};

export default function UpdateAlumni(userData: UserData) {
  const { data: session } = useSession();
  const [Firstname, setFirstname] = useState(userData.Firstname);
  const [Lastname, setLastname] = useState(userData.Lastname);
  const [Tahun_lulus, setTahun_lulus] = useState(userData.Tahun_lulus);
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
        Firstname: Firstname,
        Lastname: Lastname,
        Tahun_lulus: Tahun_lulus,
        email: email,
        status: "1",


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
                  value={Firstname}
                  onChange={(e) => setFirstname(e.target.value)}
                  label="first name"
                  placeholder=""
                  variant="bordered"
                />
              </ModalBody>
              <ModalBody>
                <Input
                  value={Lastname}
                  onChange={(e) => setLastname(e.target.value)}
                  label="Last Name"
                  placeholder=""
                  variant="bordered"
                />
              </ModalBody>
              <ModalBody>
                <Input
                  value={Tahun_lulus}
                  onChange={(e) => setTahun_lulus(e.target.value)}
                  label="Tahun Kelulusan"
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
