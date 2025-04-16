"use client";

import { useAuth } from "@/context/AuthContext";
import {
  Avatar,
  Button,
  IconButton,
  Menu,
  MenuItem,
  Typography,
} from "@mui/material";
import { signOut } from "firebase/auth";
import { auth } from "@/lib/firebase";
import { useRouter } from "next/navigation";
import { useState } from "react";

export default function UserMenu() {
  const { user } = useAuth();
  const router = useRouter();
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);

  const handleMenuOpen = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const handleMenuClose = () => setAnchorEl(null);

  const handleSignOut = async () => {
    await signOut(auth);
    handleMenuClose();
    router.push("/login");
  };

  if (!user) {
    return (
      <Button variant="outlined" onClick={() => router.push("/login")}>
        Login
      </Button>
    );
  }

  return (
    <>
      <IconButton onClick={handleMenuOpen} size="small">
        <Avatar alt={user.displayName || "User"} src={user.photoURL ?? ""} />
      </IconButton>
      <Menu
        anchorEl={anchorEl}
        open={Boolean(anchorEl)}
        onClose={handleMenuClose}
      >
        <MenuItem disabled>
          <Typography variant="body1">{user.displayName}</Typography>
        </MenuItem>
        <MenuItem onClick={handleSignOut}>Sign Out</MenuItem>
      </Menu>
    </>
  );
}
