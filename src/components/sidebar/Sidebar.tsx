"use client";

import { Home, AutoAwesome } from "@mui/icons-material";
import {
	Drawer,
	List,
	ListItem,
	ListItemButton,
	ListItemIcon,
	ListItemText,
} from "@mui/material";
import SidebarMemoriesMenu from "./MemoriesSidebarMenu";
import { useRouter } from "next/navigation";

export default function Sidebar({
	open,
	setOpen,
	variant,
}: {
	open: boolean;
	setOpen: (open: boolean) => void;
	variant: "persistent" | "temporary";
}) {
	const router = useRouter();
	const drawerWidth = "clamp(12rem, 20vw, 20rem)";

	return (
		<>
			<Drawer
				open={open}
				variant={variant}
				anchor="left"
				onClose={() => setOpen(false)}
				slotProps={{
					paper: {
						sx: {
							borderRadius: 0,
							top:
								variant === "persistent"
									? "var(--app-bar-height)"
									: 0,
							height:
								variant === "persistent"
									? `calc(100% - var(--app-bar-height))`
									: "100%",
							transition: "top 0.2s ease, height 0.2s ease",
							width:
								variant === "temporary" ? "65vw" : drawerWidth,
						},
					},
				}}
			>
				<List>
					<ListItem>
						<ListItemButton
							onClick={() => router.push("/dashboard")}
						>
							<ListItemIcon>
								<Home />
							</ListItemIcon>
							<ListItemText primary="Home" />
						</ListItemButton>
					</ListItem>
					<ListItem>
						<SidebarMemoriesMenu />
					</ListItem>
					<ListItem>
						<ListItemButton
							onClick={() => router.push("/dashboard/picker")}
						>
							<ListItemIcon>
								<AutoAwesome />
							</ListItemIcon>
							<ListItemText primary="Picker" />
						</ListItemButton>
					</ListItem>
				</List>
			</Drawer>
		</>
	);
}
