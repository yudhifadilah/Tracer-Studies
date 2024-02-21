import React from "react";
import {Divider} from "@nextui-org/react";

export default function Dividers() {
  return (
    <div className="max-w-md">
      <div className="space-y-1">
        <h4 className="text-medium font-medium">Selamat Datang Di Halaman Survey,</h4>
        <p className="text-small text-default-400">silahkan lakukan pengisian survey, dengan mengklik Survey Page.</p>
      </div>
      <Divider className="my-4" />
      <div className="flex h-5 items-center space-x-4 text-small">
      </div>
    </div>
  );
}
