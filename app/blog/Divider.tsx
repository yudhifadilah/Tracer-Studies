import React from "react";
import { Divider } from "@nextui-org/react";

export default function CustomComponent() {
  return (
    <div className="max-w-lg">
      <div className="space-y-1">
      <h4 className="text-4xl font-bold">Artikel</h4>
        <p className="text-small text-default-400">
          what are you lookin for?
        </p>
      </div>
      <Divider className="my-4" />
      <div className="flex h-5 items-center space-x-4 text-small">
      </div>
    </div>
  );
}
