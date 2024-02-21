"use client"
import React, { SyntheticEvent, useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { useSession, signIn } from "next-auth/react";
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

export default function SurveyWirausaha({ userData }: { userData: UserData }) {
  const { data: session, status } = useSession();
  const [W01AB, setW01AB] = useState("");
  const [W02L, setW02L] = useState("");
  const [W03B, setW03B] = useState("");
  const [W08WM, setW08WM] = useState("");
  const [W06SM, setW06SM] = useState("");
  const { isOpen, onOpen, onClose } = useDisclosure();
  const [isMutating, setIsMutating] = useState(false);
  const [isRegistered, setIsRegistered] = useState(false);
  const [showSuccess, setShowSuccess] = useState(false);
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
      router.push("/submitted");
    }
  }, [isRegistered, router]);

  async function handleSubmit(e: SyntheticEvent) {
    e.preventDefault();
    if (!W01AB || !W02L) {
      alert("All fields are required. Please fill in all the fields.");
      return;
    }
  
    setIsMutating(true);
    const updatedSurveyStatus = "1";
  
    try {
      const response = await fetch("http://localhost:8080/api/Wirausaha", {
        method: "POST",
        headers: {
          Authorization: `Bearer ${session.user.token}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
            W01AB: W01AB,
            W02L: W02L,
            W03B: W03B,
            W08WM: W08WM,
            W06SM: W06SM,
          role: "alumni",
          SurveyStatus: updatedSurveyStatus,
        }),
      });
  
      if (!response.ok) {
        throw new Error("Failed to add entry");
      }
  
      await fetch(`http://localhost:8080/users/${userData.id_user}/survey`, {
        method: "PUT",
        headers: {
          Authorization: `Bearer ${session.user.token}`,
        },
      });
  
      setW01AB("");
      setW02L("");
      setW03B("");
      setW08WM ("");
      setW06SM("");
      setIsMutating(false);
      setShowSuccess(true); // setelah berhasil menyimpan data, set showSuccess menjadi true
    } catch (error) {
      console.error("Error adding entry:", error);
      setIsMutating(false);
    }
    onClose(); // Tutup modal
    router.push("/confirm"); // Arahkan ke halaman "/confirm"
  }

  if (status === "loading") {
    return <div>Loading...</div>;
  }

  if (!session || !session.user) {
    signIn();
    return null;
  }

  return (
    <div>
      <Button color="primary" size="sm" className="flex flex-col gap-1" onClick={onOpen}>
        Isi Survey Wirausaha
      </Button>

      <Modal isOpen={isOpen} onClose={onClose}>
        <ModalContent>
          <ModalHeader className="flex flex-col gap-1">Isi Survey</ModalHeader>
          <ModalBody>
            <form onSubmit={handleSubmit}>
              <div className="form-control">
                <label className="label font-bold">Alasan Berwirausaha</label>
                <Input
                  type="text"
                  value={W01AB}
                  onChange={(e) => setW01AB(e.target.value)}
                  className="input w-full input-bordered"
                  placeholder="Berwirausaha"
                />
              </div>
              <div className="form-control">
                <label className="label font-bold">Lokasi Wirausaha</label>
                <Input
                  type="text"
                  value={W02L}
                  onChange={(e) => setW02L(e.target.value)}
                  className="input w-full input-bordered"
                  placeholder="Lokasi Wirausaha"
                />
              </div>
              <div className="form-control">
                <label className="label font-bold">Bidang Wirausaha</label>
                <Input
                  type="text"
                  value={W03B}
                  onChange={(e) => setW03B(e.target.value)}
                  className="input w-full input-bordered"
                  placeholder="cnth. Tech Industri / Fashion"
                />
              </div>
              <div className="form-control">
                <label className="label font-bold">Tahun Mulai</label>
                <Input
                  type="text"
                  value={W08WM}
                  onChange={(e) => setW08WM(e.target.value)}
                  className="input w-full input-bordered"
                  placeholder="cnth. 2015"
                />
              </div>
              <div className="form-control">
                <label className="label font-bold">Status Modal</label>
                <Input
                  type="text"
                  value={W06SM}
                  onChange={(e) => setW06SM(e.target.value)}
                  className="input w-full input-bordered"
                  placeholder="cnth. Invenst / dari orang tua"
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

      {/* Modal Popup Sukses */}
      <Modal isOpen={showSuccess} onClose={() => setShowSuccess(false)}>
        <ModalContent>
          <ModalHeader>Success</ModalHeader>
          <ModalBody>Survey berhasil disimpan!</ModalBody>
        </ModalContent>
      </Modal>
    </div>
  );
}
