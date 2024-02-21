"use client"
import type { NextPage } from "next";
import { Content } from "@/components/home/content";
import { useEffect, useState } from "react";
import { useSession } from "next-auth/react";
import { User } from "next-auth";

//const Dshome: NextPage = () => {
  //return <Content />;
//};

const  Dshomeqwe: NextPage = () => {
  const { data: session } = useSession();
  const [apiData, setApiData] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        console.log("Session:", session);

        if (session && session.user.role) {
          const response = await fetch("http://localhost:8000/users/$id/notes", {
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

  if (session?.user.role !== "perusahaan") {
    console.log("Redirecting: User does not have Company role");
    return <div>Unauthorized access</div>;
  }

  return (
    <div>
      <h1>Your Component</h1>
      <p>Welcome, {session.user.role}!</p>
      {
        <Content />
      }
      {apiData && (
        <div>
          <h2>Data from API:</h2>
          {/* Display the title from the API data */}
        </div>
      )}
    </div>
  );
}

export default Dshomeqwe;