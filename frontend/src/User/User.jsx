import { useAuthContext } from "../Hooks/useAuthContext";

export const User = () => {
  const { user } = useAuthContext();

  return { user };
};
