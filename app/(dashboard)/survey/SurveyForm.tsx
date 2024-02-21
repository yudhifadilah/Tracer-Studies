// pages/index.tsx

import React from "react";
import { Button } from "@nextui-org/react";

const HomePage = () => {
  return (
    <div>
      <h1>Selamat Datang Di Pengisian Survey,</h1>
      <p>Silahkan untuk memilih salah satu dari ini.</p>
      <Button
        color="primary"
        variant="ghost"
        onClick={() => { window.location.href = "/bekerja" }}
        style={{ marginRight: '10px' }} // Memberikan jarak kanan 10px
      >
        Bekerja
      </Button>
      <Button
        color="primary"
        variant="ghost"
        onClick={() => { window.location.href = "/wirausaha" }}
        style={{ marginRight: '10px' }} // Memberikan jarak kanan 10px
      >
        Wirausaha
      </Button>
      <Button
        color="primary"
        variant="ghost"
        onClick={() => { window.location.href = "/kuliah" }}
        style={{ marginRight: '10px' }} // Memberikan jarak kanan 10px
      >
        Melanjutkan Kuliah
      </Button>
    </div>
  );
};

export default HomePage;
