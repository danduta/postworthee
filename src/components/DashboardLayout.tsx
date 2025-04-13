"use client";

import { useAppBarHeight } from "@/context/AppBarHeightContext";
import {
  Box,
  Drawer,
  List,
  ListItem,
  ListItemText,
  Toolbar,
} from "@mui/material";
import { useRouter } from "next/navigation";

const drawerWidth = 240; // optional: set width

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const router = useRouter();
  const { height } = useAppBarHeight();

  return (
    <Box sx={{ display: "flex" }}>
      {height > 0 && (
        <Drawer
          open
          variant="persistent"
          slotProps={{
            paper: {
              sx: {
                top: `${height}px`,
                height: `calc(100% - ${height}px)`,
                transition: "top 0.2s ease, height 0.2s ease",
                width: "auto",
                minWidth: "10rem",
                maxWidth: "20vw",
              },
            },
          }}
        >
          <List>
            <ListItem onClick={() => router.push("/dashboard")}>
              <ListItemText primary="Home" />
            </ListItem>
            <ListItem onClick={() => router.push("/dashboard/stats")}>
              <ListItemText primary="Stats" />
            </ListItem>
          </List>
        </Drawer>
      )}
      <Box
        component="main"
        sx={{
          flexGrow: 1,
          ml: `${drawerWidth}px`,
          mt: `${height}px`,
          p: 3,
        }}
      >
        {children}
      </Box>
    </Box>
  );
}
