"use client";

import {
	AppBar,
	Box,
	Button,
	IconButton,
	Toolbar,
	Typography,
	useMediaQuery,
} from "@mui/material";
import UserMenu from "./UserMenu";
import Sidebar from "../sidebar/Sidebar";
import { useTheme } from "@mui/material/styles";
import { useEffect, useState } from "react";
import { Menu as MenuIcon } from "@mui/icons-material";

export default function AppHeader() {
	const theme = useTheme();
	const isLargeScreen = useMediaQuery(theme.breakpoints.up("md"));
	const [open, setOpen] = useState(false);

	useEffect(() => {
		setOpen(isLargeScreen);
	}, [isLargeScreen]);

	return (
		<>
			<AppBar position="fixed" color="default" elevation={0}>
				<Toolbar sx={{ justifyContent: "space-between" }}>
					<Box>
						{!isLargeScreen && (
							<IconButton onClick={() => setOpen(true)}>
								<MenuIcon />
							</IconButton>
						)}
						<Button href="/dashboard" disableTouchRipple>
							<Typography variant="h1" color="inherit" noWrap>
								PostWorthee
							</Typography>
						</Button>
					</Box>
					<UserMenu />
				</Toolbar>
			</AppBar>
			<Sidebar
				open={open}
				setOpen={setOpen}
				variant={isLargeScreen ? "persistent" : "temporary"}
			/>
		</>
	);
}
