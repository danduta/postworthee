"use client";

import { AppBar, Button, Toolbar, Typography } from "@mui/material";
import UserMenu from "./UserMenu";
import { useAppBarHeight } from "@/context/AppBarHeightContext";

export default function AppHeader() {
  const { appBarRef } = useAppBarHeight();

  return (
    <AppBar position="fixed" color="default" elevation={0} ref={appBarRef}>
      <Toolbar sx={{ justifyContent: "space-between" }}>
        <Button href="/dashboard" disableTouchRipple>
          <Typography variant="h6" color="inherit" noWrap>
            PostWorthee
          </Typography>
        </Button>
        <UserMenu />
      </Toolbar>
    </AppBar>
  );
}
