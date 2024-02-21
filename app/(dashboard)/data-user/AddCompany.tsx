import React, { SyntheticEvent, useState } from "react";
import { useRouter } from "next/navigation";
import { useSession } from "next-auth/react";
import {
  Button,
  Modal,
  ModalContent,
  ModalHeader,
  ModalBody,
  ModalFooter,
  useDisclosure,
  Input,
} from "@nextui-org/react";

export default function AddPerusahaan() {
  const { data: session } = useSession();
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const { isOpen, onOpen, onClose } = useDisclosure();
  const [isMutating, setIsMutating] = useState(false);

  const router = useRouter();

  async function handleSubmit(e: SyntheticEvent) {
    e.preventDefault();

    setIsMutating(true);

    // Send a POST request to create a new user
    await fetch("http://localhost:8080/api/user/CreateUser", {
      method: "POST",
      headers: {
        Authorization: `Bearer ${session.user.token}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        username: username,
        password: password,
        role: "perusahaan", // Default value for the role
      }),
    });

    setIsMutating(false);

    // Clear input fields, refresh the page, and close the modal
    setUsername("");
    setPassword("");
    router.refresh();
    onClose();
  }

  return (
    <div>
      <Button color="primary" size="sm" className="flex flex-col gap-1" onClick={onOpen}>
        Add New Company
      </Button>

      <Modal isOpen={isOpen} onClose={onClose}>
        <ModalContent>
          <ModalHeader className="flex flex-col gap-1">Add New User</ModalHeader>
          <ModalBody>
            <form onSubmit={handleSubmit}>
              {/* Username input */}
              <div className="form-control">
                <label className="label font-bold">Username</label>
                <Input
                  type="text"
                  value={username}
                  onChange={(e) => setUsername(e.target.value)}
                  className="input w-full input-bordered"
                  placeholder="Username"
                />
              </div>

              {/* Password input */}
              <div className="form-control">
                <label className="label font-bold">Password</label>
                <Input
                  type="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="input w-full input-bordered"
                  placeholder="Password"
                />
              </div>

              {/* Role input (read-only) */}
              <div className="form-control">
                <label className="label font-bold">Role</label>
                <Input
                  isReadOnly
                  type="text"
                  value="perusahaan" // Default value for the role
                  variant="bordered"
                  className="input w-full input-bordered"
                  placeholder="Role"
                />
              </div>

              {/* Modal actions */}
              <div className="modal-action mt-3">
                <Button type="button" variant="flat" color="danger" onPress={onClose}>
                  Close
                </Button>
                {!isMutating ? (
                  <Button type="submit" color="primary" className="ml-2">
                    Save
                  </Button>
                ) : (
                  <Button type="button" className="loading ml-2">
                    Saving...
                  </Button>
                )}
              </div>
            </form>
          </ModalBody>
        </ModalContent>
      </Modal>
    </div>
  );
}
