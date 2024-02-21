// components/Button.tsx

import { useRouter } from 'next/navigation';

export const Button = ({ destination }: { destination: string }) => {
  const router = useRouter();

  const handleClick = () => {
    router.push(destination);
  };

  return (
    <button onClick={handleClick}>
      Go to {destination}
    </button>
  );
};

export default Button;
