import { useUser } from "@clerk/clerk-react";
import { useEffect, useState } from "react";
import { useMutation } from "convex/react";
import { api } from "../convex/_generated/api";

export function useStoreUser() {
  const { isSignedIn, user } = useUser();
  const [userId, setUserId] = useState(null);
  const storeUser = useMutation(api.users.store);

  useEffect(() => {
    if (!isSignedIn) {
      setUserId(null);
      return;
    }

    let cancelled = false;

    async function createUser() {
      try {
        const id = await storeUser();
        if (!cancelled) setUserId(id);
      } catch (err) {
        console.error("Failed to store user:", err);
      }
    }

    createUser();

    return () => {
      cancelled = true;
      setUserId(null);
    };
  }, [isSignedIn, storeUser, user?.id]);

  return {
    isLoading: !userId && isSignedIn,
    isAuthenticated: isSignedIn && userId !== null,
  };
}
