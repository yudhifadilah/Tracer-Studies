"use client"
import type { NextPage } from "next";
import { Content } from "@/components/home/content";
import { useEffect, useState } from "react";
import { useSession } from "next-auth/react";
import { User } from "next-auth";
import {Breead} from "@/components/bread"
import { Breads } from "./bread-s";
import {TabUserData}  from "./table-user";


const Dshomeewe: NextPage = () => {
  const { data: session } = useSession();
  const [apiData, setApiData] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        console.log("Session:", session);

        if (session && session.user) {
          // Adjust the property name or structure based on your actual user object
          const userRoles = session.user.role || session.user.role;

          if (userRoles && userRoles.includes("admin")) {
            const response = await fetch("http://localhost:8080/api/user/GetAllUsers", {
              method: "GET",
              headers: {
                Authorization: `Bearer ${session.user.token}`,
              },
            });

            if (response.ok) {
              const data = await response.json();
              setApiData(data);
            } else {
              console.error("Error fetching data from API");
            }
          } else {
            console.log("Redirecting: User does not have Admin role");
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

  // Adjust the property name or structure based on your actual user object
  const userRoles = session.user.role || session.user.role;

  if (!userRoles || !userRoles.includes("admin")) {
    console.log("Redirecting: User does not have Admin role");
    return <div>Unauthorized access</div>;
  }

  return (
    <div>
      <Breads />
      <TabUserData />
    </div>
  );
};

export default Dshomeewe;