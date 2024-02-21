import React, { useEffect, useState } from "react";
import {
  Tabs,
  Tab,
  Card,
  CardBody,
  Table,
  TableHeader,
  TableColumn,
  TableBody,
  TableRow,
  TableCell,
  Input,
} from "@nextui-org/react";
import { useSession } from "next-auth/react";
import {Modal, ModalContent, ModalHeader, ModalBody, ModalFooter, Button, useDisclosure} from "@nextui-org/react";


interface UserData {
  users: {
    id: number;
    username: string;
    role: string;
    status: string;
    music: string;
    photos: string;
    teuing: string;
  }[];
}

export const TabUserData: React.FC = () => {
  const { data: session } = useSession();
  const [userData, setUserData] = useState<UserData | null>(null);
  const [showModal, setShowModal] = useState(false);
  const [selectedUser, setSelectedUser] = useState<{
    id: number;
    username: string;
    role: string;
    status: string;
    music: string;
    photos: string;
    teuing: string;
  } | null>(null);
  const [editedUser, setEditedUser] = useState({
    id: 0,
    username: "",
    role: "",
    status: "",
    music: "",
    photos: "",
    teuing: "",
  });

  useEffect(() => {
    const fetchData = async () => {
      try {
        if (session && session.user.token) {
          const response = await fetch("http://localhost:8080/api/user/GetAllUsers", {
            method: "GET",
            headers: {
              Authorization: `Bearer ${session.user.token}`,
            },
          });

          if (response.ok) {
            const data = await response.json();
            setUserData(data);
          } else {
            console.error("Error fetching user data from API");
          }
        }
      } catch (error) {
        console.error("Error fetching user data from API", error);
      }
    };

    fetchData();
  }, [session]);

  const handleEdit = (user: {
    id: number;
    username: string;
    role: string;
    status: string;
    music: string;
    photos: string;
    teuing: string;
  }) => {
    setSelectedUser(user);
    setEditedUser(user);
    setShowModal(true);
  };

  const handleDelete = (userId: number) => {
    // Implement your delete logic here
    console.log(`Deleting user with ID ${userId}`);
  };

  const handleSave = async () => {
    try {
      const response = await fetch("http://localhost:8080/api/user/EditUser", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${session?.user.token}`,
        },
        body: JSON.stringify(editedUser),
      });

      if (response.ok) {
        // Update the local user data after successful edit
        setUserData((prevUserData) => {
          if (prevUserData) {
            const updatedUsers = prevUserData.users.map((user) =>
              user.id === editedUser.id ? editedUser : user
            );
            return { users: updatedUsers };
          }
          return prevUserData;
        });

        // Close the modal after successful edit
        setShowModal(false);
        setSelectedUser(null);
      } else {
        console.error("Error editing user");
      }
    } catch (error) {
      console.error("Error editing user", error);
    }
  };

  return (
    <div className="flex w-full flex-col">
      <Tabs aria-label="Options">
        <Tab key="user" title="User">
          <Card>
            <CardBody>
              {userData ? (
                <Table aria-label="User Data Table">
                  <TableHeader>
                    <TableColumn>ID</TableColumn>
                    <TableColumn>Nama Depan</TableColumn>
                    <TableColumn>Role</TableColumn>
                    <TableColumn>Status</TableColumn>
                    <TableColumn>Actions</TableColumn>
                  </TableHeader>
                  <TableBody>
                    {userData.users.map((user) => (
                      <TableRow key={user.id}>
                        <TableCell>{user.id}</TableCell>
                        <TableCell>{user.username}</TableCell>
                        <TableCell>{user.role}</TableCell>
                        <TableCell>{user.status}</TableCell>
                        <TableCell>
                          <Button onClick={() => handleEdit(user)} size="sm">
                            Edit
                          </Button>{" "}
                          <Button onClick={() => handleDelete(user.id)} size="sm">
                            Delete
                          </Button>
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              ) : (
                <div>Loading user data...</div>
              )}
            </CardBody>
          </Card>
        </Tab>
        {/* Rest of your Tabs... */}
      </Tabs>

      {/* Modal for Edit */}
      {showModal && selectedUser && (
  <Modal
    size="md" // You can adjust the size as needed
    isOpen={showModal}
    onClose={() => {
      setShowModal(false);
      setSelectedUser(null);
    }}
  >
    <ModalContent>
      <ModalHeader className="flex flex-col gap-1">Edit User</ModalHeader>
      <ModalBody>
        <Input
          label="Username"
          value={editedUser.username}
          onChange={(e) =>
            setEditedUser((prev) => ({ ...prev, username: e.target.value }))
          }
        />
        {/* Add other input fields for editing */}
      </ModalBody>
      <ModalFooter>
        <Button variant="light" onClick={() => setShowModal(false)}>
          Cancel
        </Button>
        <Button color="secondary" onClick={handleSave}>
          Save
        </Button>
      </ModalFooter>
    </ModalContent>
  </Modal>
      )}
  </div>
  )}
