import { NavbarItem } from "@nextui-org/navbar";
import { HeartFilledIcon } from "@/components/icons";
import { signIn, useSession, signOut } from 'next-auth/react';
import { Button } from "@nextui-org/button";

export const CustomNavbarItem: React.FC = () => {
  const { data: session } = useSession();

  const handleAuthAction = () => {
    if (session) {
      signOut();
    } else {
      signIn();
    }
  };

  return (
    <NavbarItem className="hidden md:flex">
      <Button
        onClick={handleAuthAction}
        className="text-sm font-normal text-default-600 bg-default-100"
        startContent={<HeartFilledIcon className="text-danger" />}
        variant="flat"
      >
        {session ? 'Logout' : 'Login'}
      </Button>
    </NavbarItem>
  );
};
