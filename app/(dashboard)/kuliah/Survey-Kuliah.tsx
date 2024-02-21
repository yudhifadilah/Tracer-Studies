"use client"
import React, { SyntheticEvent, useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { useSession, signIn } from "next-auth/react"; // Mengimpor signIn dari next-auth/react
import {
  Button,
  Modal,
  ModalContent,
  ModalHeader,
  ModalBody,
  useDisclosure,
  Input,
} from "@nextui-org/react";

type UserData = {
  id_user: number;
};

export default function SurveyStudi({ userData }: { userData: UserData }) {
  const { data: session, status } = useSession();
  const [S01, setS01] = useState("");
  const [S02, setS02] = useState("");
  const [S03, setS03] = useState("");
  const [S04, setS04] = useState("");
  const { isOpen, onOpen, onClose } = useDisclosure();
  const [isMutating, setIsMutating] = useState(false);
  const [isRegistered, setIsRegistered] = useState(false);
  const router = useRouter();

  useEffect(() => {
    const checkRegistration = async () => {
      if (userData && userData.id_user) {
        try {
          const response = await fetch(
            `http://localhost:8080/api/Studi/user?id_user=${userData.id_user}`,
            {
              method: "GET",
              headers: {
                Authorization: `Bearer ${session.user.token}`,
              },
            }
          );
          const data = await response.json();
          setIsRegistered(data.length > 0);
        } catch (error) {
          console.error("Error checking registration:", error);
        }
      }
    };
    checkRegistration();
  }, [session, userData]);

  useEffect(() => {
    if (isRegistered) {
      router.push("/submitted"); // Redirect to home page if registered
    }
  }, [isRegistered, router]);

  async function handleSubmit(e: SyntheticEvent) {
    e.preventDefault();
    if (!S01 || !S02 || !S03 || !S04) {
      alert("All fields are required. Please fill in all the fields.");
      return;
    }
  
    setIsMutating(true);
    const updatedSurveyStatus = "1";
  
    try {
      const response = await fetch("http://localhost:8080/api/Studi", {
        method: "POST",
        headers: {
          Authorization: `Bearer ${session.user.token}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          S01: S01,
          S02: S02,
          S03: S03,
          S04: S04,
          role: "alumni",
          SurveyStatus: updatedSurveyStatus,
        }),
      });
  
      if (!response.ok) {
        throw new Error("Failed to add entry");
      }
  
      // Update SurveyStatus in the users table
      await fetch(`http://localhost:8080/users/${userData.id_user}/survey`, {
        method: "PUT",
        headers: {
          Authorization: `Bearer ${session.user.token}`,
        },
      });
  
      setS01("");
      setS02("");
      setS03("");
      setS04("");
      router.push("/");
    } catch (error) {
      console.error("Error adding entry:", error);
    } finally {
      setIsMutating(false);
    }
    onClose(); // Tutup modal
    router.push("/confirm"); // Arahkan ke halaman "/confirm"
  }

  if (status === "loading") {
    return <div>Loading...</div>;
  }

  // Redirect to login page if user is not logged in
  if (!session || !session.user) {
    signIn();
    return null;
  }

  return (
    <div>
      <Button color="primary" size="sm" className="flex flex-col gap-1" onClick={onOpen}>
        Isi Survey Melanjutkan Studi
      </Button>

      <Modal isOpen={isOpen} onClose={onClose}>
        <ModalContent>
          <ModalHeader className="flex flex-col gap-1">Isi Survey</ModalHeader>
          <ModalBody>
            <form onSubmit={handleSubmit}>
              <div className="form-control">
                <label className="label font-bold">Jenjang Pendidikan Melanjutkan</label>
                <Input
                  type="text"
                  value={S01}
                  onChange={(e) => setS01(e.target.value)}
                  className="input w-full input-bordered"
                  placeholder="Melanjutkan Pendidikan"
                />
              </div>
              <div className="form-control">
                <label className="label font-bold">Nama Perguruan Tinggi</label>
                <Input
                  type="text"
                  value={S02}
                  onChange={(e) => setS02(e.target.value)}
                  className="input w-full input-bordered"
                  placeholder="Nama Perguruan Tinggi"
                />
              </div>
              <div className="form-control">
                <label className="label font-bold">Program Studi</label>
                <Input
                  type="text"
                  value={S03}
                  onChange={(e) => setS03(e.target.value)}
                  className="input w-full input-bordered"
                  placeholder="Program Studi"
                />
              </div>
              <div className="form-control">
                <label className="label font-bold">Alasan Melanjutkan</label>
                <Input
                  type="text"
                  value={S04}
                  onChange={(e) => setS04(e.target.value)}
                  className="input w-full input-bordered"
                  placeholder="Alasan Melanjutkan"
                />
              </div>
              <div className="form-control">
                <label className="label font-bold">Role</label>
                <Input
                  isDisabled
                  type="text"
                  value="alumni"
                  variant="bordered"
                  className="input w-full input-bordered"
                  placeholder="Role"
                />
              </div>
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
