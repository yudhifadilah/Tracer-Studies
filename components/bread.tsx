import React from "react";
import { Breadcrumbs, BreadcrumbItem } from "@nextui-org/react";
import { useSession } from 'next-auth/react';

export const Breead: React.FC = () => {
  const { data: session } = useSession();
  const variants = ["light"];

  return (
    <div className="flex flex-col flex-wrap gap-4">
      <Breadcrumbs variant="light">
        <BreadcrumbItem>Home</BreadcrumbItem>
        <BreadcrumbItem>Dashboard</BreadcrumbItem>
        {session && session.user && (
          <BreadcrumbItem>
            {getRoleBreadcrumb(session.user.role)}
          </BreadcrumbItem>
        )}
      </Breadcrumbs>
    </div>
  );
};

const getRoleBreadcrumb = (role: string) => {
  switch (role) {
    case "alumni":
      return "alumni";
    case "admin":
      return "Admin";
    case "perusahaan":
      return "Perusahaan";
    default:
      return "Unknown Role";
  }
};
