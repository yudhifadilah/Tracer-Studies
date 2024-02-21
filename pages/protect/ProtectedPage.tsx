// ProtectedPage.tsx
import { useSession } from "next-auth/react";
import { useRouter } from "next/router";

export default function ProtectedPage() {
  const { data: session } = useSession();
  const router = useRouter();

  if (!session) {
    // Redirect jika tidak ada sesi (belum login)
    return <div>Redirecting...</div>;
  }

  // Mengarahkan pengguna ke dashboard sesuai dengan peran
  switch (session.user.role) {
    case "Admin":
      router.push("/dashboard/admin/page");
      break;
    case "Alumni":
      router.push("/dashboard/user/page");
      break;
    case "perusahaan":
      router.push("/dashboard/perusahaan/page");
      break;
    default:
      // Redirect ke halaman default jika peran tidak dikenali
      router.push("/");
  }

  return <div>Redirecting...</div>;
}
