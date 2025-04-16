"use client";

import { AppBar, Button, Toolbar, Typography } from "@mui/material";
import UserMenu from "./UserMenu";

export default function AppHeader() {
	return (
		<AppBar position="fixed" color="default" elevation={0}>
			<Toolbar sx={{ justifyContent: "space-between" }}>
				<Button href="/dashboard" disableTouchRipple>
					<Typography variant="h1" color="inherit" noWrap>
						PostWorthee
					</Typography>
				</Button>
				<UserMenu />
			</Toolbar>
		</AppBar>
	);
}
