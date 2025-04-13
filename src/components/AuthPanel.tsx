"use client";

import { useEffect, useState } from "react";
import { auth, provider } from "../lib/firebase";
import {
  signInWithPopup,
  signOut,
  onAuthStateChanged,
  User,
} from "firebase/auth";
import { Button, Avatar, Typography, Box, Stack } from "@mui/material";
import GoogleIcon from "@mui/icons-material/Google";

export default function AuthPanel() {
  const [user, setUser] = useState<User | null>(null);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, setUser);
    return () => unsubscribe();
  }, []);

  const handleSignIn = async () => {
    try {
      await signInWithPopup(auth, provider);
    } catch (err) {
      console.error("Sign in error", err);
    }
  };

  const handleSignOut = async () => {
    try {
      await signOut(auth);
    } catch (err) {
      console.error("Sign out error", err);
    }
  };

  if (user) {
    return (
      <Box display="flex" alignItems="center" gap={2}>
        <Avatar
          src={user.photoURL || undefined}
          alt={user.displayName || "User"}
        />
        <Stack>
          <Typography variant="subtitle1">{user.displayName}</Typography>
          <Typography variant="body2" color="text.secondary">
            {user.email}
          </Typography>
        </Stack>
        <Button variant="outlined" onClick={handleSignOut}>
          Sign Out
        </Button>
      </Box>
    );
  }

  return (
    <Button
      variant="contained"
      startIcon={<GoogleIcon />}
      onClick={handleSignIn}
    >
      Sign in with Google
    </Button>
  );
}
