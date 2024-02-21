import React, { useState, SyntheticEvent } from "react";
import { Modal, ModalContent, ModalHeader, ModalBody, ModalFooter, Button, Input } from "@nextui-org/react";
import { useSession } from "next-auth/react";
import { useRouter } from "next/router"; // Correct the import statement
import { useDisclosure } from "@nextui-org/react"; // Add this import

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

// Change function declaration to a component
const UserProfile: React.FC<UserData> = (userData) => {
  const { data: session } = useSession();
  const [email, setEmail] = useState(userData.email);
  const { isOpen, onOpen, onClose } = useDisclosure(); // Use the useDisclosure hook
  const [isMutating, setIsMutating] = useState(false);

  const router = useRouter();

  const handleUpdate = async (e: SyntheticEvent) => {
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

    router.replace(router.asPath); // Use replace instead of refresh
    onClose();
  };

  return (
    <>
      {/* Your profile display */}
      <div className="flex flex-col items-center space-y-4">
        <p>Name: {userData.username}</p>
        <p>Email: {userData.email}</p>
        <p>Phone: {userData.NoHP}</p>
        <p>Date of Birth: {userData.Status_perkawinan}</p>
        <p>Address: {userData.Tempat_tinggal}</p>
        {/* Add other fields as needed */}

        <Button onClick={onOpen}>Edit Profile</Button>
      </div>

      {/* Modal for editing profile */}
      <Modal isOpen={isOpen} onClose={onClose}>
        <ModalContent>
          <ModalHeader>Edit Profile</ModalHeader>
          <ModalBody>
            <Input
              type="email"
              label="Email"
              placeholder="Enter your email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
            {/* Add other Input fields for editing other profile details */}
          </ModalBody>
          <ModalFooter>
            <Button
              variant="flat"
              color="primary"
              onClick={handleUpdate}
            >
              Save
            </Button>
            <Button onClick={onClose} disabled={isMutating}>
              Cancel
            </Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </>
  );
}

export default UserProfile; // Export the component
