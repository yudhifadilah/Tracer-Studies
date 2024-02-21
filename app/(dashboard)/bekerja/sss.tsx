export default function CreateArtikel() {
    const { data: session, status } = useSession();
    const [Title, setTitle] = useState("");
    const [Content, setContent] = useState("");
    const [image, setImage] = useState<File | null>(null);
    const { isOpen, onOpen, onClose } = useDisclosure();
    const [isCreating, setIsCreating] = useState(false);
    const [userId, setUserId] = useState<string | undefined>(undefined);
    const router = useRouter();
  
    useEffect(() => {
      const fetchUserData = async () => {
        if (session?.user?.id_user) {
          try {
            const response = await fetch("http://localhost:8080/api/users/getMe", {
              method: "GET",
              headers: {
                Authorization: `Bearer ${session.user.token}`,
              },
            });
            const userData = await response.json();
            setUserId(userData.id_user);
          } catch (error) {
            console.error("Error fetching user data:", error);
          }
        }
      };
  
      fetchUserData();
    }, [session]);
  
    async function handleCreate(e: SyntheticEvent) {
      e.preventDefault();
  
      if (!Title || !Content || !image ) {
        alert("All fields are required. Please fill in all the fields.");
        return;
      }
  
      setIsCreating(true);
  
      const formData = new FormData();
      formData.append("title", Title);
      formData.append("content", Content);
      formData.append("file", image as Blob);
  
      try {
        const response = await fetch("http://localhost:8080/api/Artikel/CreateArt", {
          method: "POST",
          headers: {
            Authorization: `Bearer ${session.user.token}`,
          },
          body: formData,
        });
  
        if (!response.ok) {
          throw new Error("Failed to create article");
        }
  
        onClose();
        router.push("/"); // Redirect to home page
      } catch (error) {
        console.error("Error creating article:", error);
        alert("Failed to create article");
      } finally {
        setIsCreating(false);
      }
    }