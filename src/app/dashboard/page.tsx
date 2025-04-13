"use client";

import { useAuth } from "@/context/AuthContext";
import { useRouter } from "next/navigation";
import { useEffect } from "react";
import { Typography } from "@mui/material";
import DashboardLayout from "@/components/DashboardLayout";

export default function DashboardPage() {
  const { user } = useAuth();
  const router = useRouter();

  useEffect(() => {
    if (!user) {
      router.replace("/login");
    }
  }, [user, router]);

  if (!user) return null;

  return (
    <DashboardLayout>
      <Typography variant="h4" gutterBottom>
        Welcome, {user.displayName}!
      </Typography>
    </DashboardLayout>
  );
}
