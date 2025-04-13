"use client";

import { useAppBarHeight } from "@/context/AppBarHeightContext";
import { Box, Container } from "@mui/material";
import AppHeader from "./AppHeader";

export default function AppContent({
  children,
}: {
  children: React.ReactNode;
}) {
  const { height } = useAppBarHeight();

  return (
    <>
      <AppHeader />
      <Box sx={{ mt: `${height}px` }}>
        <Container maxWidth="lg">{children}</Container>
      </Box>
    </>
  );
}
