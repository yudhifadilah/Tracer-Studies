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

export default function SurveyBekerja({ userData }: { userData: UserData }) {
  const { data: session, status } = useSession();
  const [B01W, setB01W] = useState("");
  const [B02L, setB02L] = useState("");
  const [B03J, setB03J] = useState("");
  const [B05JP, setB05JP] = useState("");
  const [B07JA, setB07JA] = useState("");
  const { isOpen, onOpen, onClose } = useDisclosure();
  const [isMutating, setIsMutating] = useState(false);
  const [isRegistered, setIsRegistered] = useState(false);
  const router = useRouter();

  useEffect(() => {
    const checkRegistration = async () => {
      if (userData && userData.id_user) {
        try {
          const response = await fetch(
            `http://localhost:8080/api/bekerja/user?id_user=${userData.id_user}`,
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
    if (!B01W || !B02L) {
      alert("All fields are required. Please fill in all the fields.");
      return;
    }
  
    setIsMutating(true);
    const updatedSurveyStatus = "1";
  
    try {
      const response = await fetch("http://localhost:8080/api/Bekerja", {
        method: "POST",
        headers: {
          Authorization: `Bearer ${session.user.token}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          B01W: B01W,
          B02L: B02L,
          B03J: B03J,
          B05JP: B05JP,
          B07JA: B07JA,
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
  
      setB01W("");
      setB02L("");
      setB03J("");
      setB05JP("");
      setB07JA("");
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
        Isi Survey Bekerja
      </Button>

      <Modal isOpen={isOpen} onClose={onClose}>
        <ModalContent>
          <ModalHeader className="flex flex-col gap-1">Isi Survey</ModalHeader>
          <ModalBody>
            <form onSubmit={handleSubmit}>
              <div className="form-control">
                <label className="label font-bold">Lama Menunggu Pekerjaan</label>
                <Input
                  type="text"
                  value={B01W}
                  onChange={(e) => setB01W(e.target.value)}
                  className="input w-full input-bordered"
                  placeholder="cnth. 1 bulan / 1 tahun"
                />
              </div>
              <div className="form-control">
                <label className="label font-bold">Lokasi Bekerja</label>
                <Input
                  type="text"
                  value={B02L}
                  onChange={(e) => setB02L(e.target.value)}
                  className="input w-full input-bordered"
                  placeholder="Lokasi Bekerja"
                />
              </div>
              <div className="form-control">
                <label className="label font-bold">Jabatan di perusahaan</label>
                <Input
                  type="text"
                  value={B03J}
                  onChange={(e) => setB03J(e.target.value)}
                  className="input w-full input-bordered"
                  placeholder="Jabatan"
                />
              </div>
              <div className="form-control">
                <label className="label font-bold">Jenis Perusahaan / Kategori</label>
                <Input
                  type="text"
                  value={B05JP}
                  onChange={(e) => setB05JP(e.target.value)}
                  className="input w-full input-bordered"
                  placeholder="Jenis Perusahaan / kategori"
                />
              </div>
              <div className="form-control">
                <label className="label font-bold">Berapa x berganti pekerjaan</label>
                <Input
                  type="text"
                  value={B07JA}
                  onChange={(e) => setB07JA(e.target.value)}
                  className="input w-full input-bordered"
                  placeholder="cnth. 1x"
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
