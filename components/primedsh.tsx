import { NavbarItem } from "@nextui-org/navbar";
import { signIn, useSession, signOut } from 'next-auth/react';
import NextLink from "next/link";
import React from "react";
import { Dropdown, DropdownTrigger, DropdownMenu, DropdownItem, Button } from "@nextui-org/react";
import { useRouter } from "next/navigation";

export const PrimeDsh: React.FC = () => {
  const { data: session } = useSession();
  const router = useRouter();

  const getDashboardURL = () => {
    if (session?.user?.role) {
      switch (session.user.role) {
        case 'admin':
          return '/admin';
        case 'user':
          return '/user';
        case 'perusahaan':
          return '/company/dashboard';
        default:
          return '/dashboard'; 
      }
    }
    return '/dashboard';
  };

  const handleMenuAction = (key: string) => {
    // Check which item is clicked and perform the corresponding action
    switch (key) {
      case "posting-job":
        // Handle "Posting Job" click
        break;
      case "survey":
        if (session?.user?.role === 'alumni') {
          router.push('/survey');
        }    
        break;
      case "kelola-artikel":
        if (session?.user?.role === 'admin') {
          router.push('/kelola-artikel');
        }        
        break;
      case "data-user":
        if (session?.user?.role === 'admin') {
          router.push('/data-user');
        }
        break;
      case "Survey":
        if (session?.user?.role === 'admin') {
          router.push('/kelola-survey');
        }
        break;
        case "artikel":
          if (session?.user?.role === 'perusahaan') {
            router.push('/post-artikel');
          }
          break;
      case "dashboard":
        // Redirect to the dashboard URL
        router.push(getDashboardURL());
        break;
      default:
        break;
    }
  };

  return (
    <>
      {session ? (
        <Dropdown>
          <DropdownTrigger>
            <Button variant="light" color="primary">Dashboard Menu</Button>
          </DropdownTrigger>
          <DropdownMenu 
            aria-label="Action event example" 
            color={"primary"}
            onAction={handleMenuAction}
          >
            {session.user.role === 'admin' && (
              <DropdownItem key="kelola-artikel">
                <p className="font-medium">Kelola Artikel</p>
              </DropdownItem>
            )}
            {session.user.role === 'admin' && (
              <DropdownItem key="Survey">
                <p className="font-medium">Kelola Survey</p>
              </DropdownItem>
            )}
            {session.user.role === 'admin' && (
              <DropdownItem key="data-user">
                <p className="font-medium">Data User</p>
              </DropdownItem>
            )}
            {session.user.role === 'alumni' && (
              <DropdownItem key="survey">
                <p className="font-medium">Isi Survey</p>
              </DropdownItem>
            )}
            {session.user.role === 'perusahaan' && (
              <DropdownItem key="artikel">
                <p className="font-medium">Post-Artikel</p>
              </DropdownItem>
            )}
              <DropdownItem key="profile">
              <NextLink href="/profile">
                <p className="font-medium">Profile</p>
                </NextLink>
              </DropdownItem>
          </DropdownMenu>
        </Dropdown>
      ) : null}
    </>
  );
};
