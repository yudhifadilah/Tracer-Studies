"use client"
import type { NextPage } from "next";
import { Content } from "@/components/home/content";
import { useEffect, useState } from "react";
import { useSession } from "next-auth/react";
import { User } from "next-auth";
import {Breead} from "@/components/bread"
import { WelPlayed } from "./wel";


//const Dshome: NextPage = () => {
  //return <Content />;
//};

const  Dshomeewe: NextPage = () => {
  const { data: session } = useSession();
  const [apiData, setApiData] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        console.log("Session:", session);

        if (session && session.user.role) {
          const response = await fetch("", {
            method: "GET",
            headers: {
              Authorization: `Bearer ${session.user.accessToken}`,
            },
          });

          if (response.ok) {
            const data = await response.json();
            setApiData(data);
          } else {
            console.error("Error fetching data from API");
          }
        }
      } catch (error) {
        console.error("Error fetching data from API", error);
      }
    };

    fetchData();
  }, [session]);

  if (!session) {
    console.log("Redirecting: No session found");
    return <div>Redirecting...</div>;
  }

  if (session?.user.role !== "admin") {
    console.log("Redirecting: User does not have Admin role");
    return <div>Unauthorized access</div>;
  }

  return (
    <div>
      <WelPlayed />
        <Content />
    </div>
  );
}

export default Dshomeewe;