"use client"
import React, { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { useSession } from "next-auth/react";
import { Button, Accordion, AccordionItem } from "@nextui-org/react";
import SurveyForm from "../survey/SurveyForm";
import Dividers from "./div";

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
  Lastname: string;
  Firstname: string;
};

const SurveyPage: React.FC = () => {
  const { data: session, status } = useSession();
  const router = useRouter();
  const [userStatus, setUserStatus] = useState<UserData | null>(null);

  const fetchUserData = async () => {
    try {
      if (session) {
        const response = await fetch(`http://localhost:8080/api/user/getme`, {
          method: "GET",
          headers: {
            Authorization: `Bearer ${session?.user.token}`,
          },
        });

        if (response.ok) {
          const responseData = await response.json();
          const user = responseData.user as UserData;
          setUserStatus(user);
        } else {
          console.error("Error fetching user data from API");
        }
      }
    } catch (error) {
      console.error("Error fetching user data", error);
    }
  };

  const handleSurveySubmit = async (answers: Record<string, string>) => {
    try {
      const response = await fetch(`http://localhost:8080/api/survey`, {
        method: "POST",
        headers: {
          Authorization: `Bearer ${session?.user.token}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ ...answers, userStatus }),
      });

      if (response.ok) {
        console.log("Survey submitted successfully");
        // Handle navigation or other actions after successful survey submission
      } else {
        console.error("Error submitting survey");
        // Handle survey submission error
      }
    } catch (error) {
      console.error("Error submitting survey", error);
    }
  };

  useEffect(() => {
    if (status === "authenticated") {
      fetchUserData();
    }
  }, [session, status]);

  return (
    <div>
      <Dividers/>
    <div>
    <Accordion>
      {userStatus?.status === "1" && (
        <AccordionItem key="survey" title="Survey Page" subtitle="Press to expand" expanded>
          <SurveyForm onSubmit={handleSurveySubmit} />
        </AccordionItem>
      )}
      {userStatus?.status === "0" && (
        <AccordionItem key="profile" title="Profile Page" expanded>
          <div>
            <p>You are not allowed to access this page.</p>
            <h1>
              Please fill the profile{" "}
              <Link href="/profile">
                <Button size="sm" variant="shadow" color="warning">
                  First
                </Button>
              </Link>
            </h1>
          </div>
        </AccordionItem>
      )}
    </Accordion>
    </div>
    </div>

  );
};

export default SurveyPage;
