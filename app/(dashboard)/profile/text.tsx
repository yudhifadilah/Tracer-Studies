import React from "react";
import {Textarea} from "@nextui-org/react";

export default function YourText() {
  return (
    <Textarea
      isReadOnly
      label="Welcome to your profile page. "
      variant="bordered"
      labelPlacement="outside"
      placeholder="Welcome to your profile page. "
      defaultValue="To see more your profile information please, hit the inform button the green one,
      and if you want to edit, just hit the edit button"
      className="max-w-xs"
    />
  );
}
