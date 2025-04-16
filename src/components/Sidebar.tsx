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
import { useAppBarHeight } from "@/context/AppBarHeightContext";
import { useRouter } from "next/navigation";

export default function Sidebar() {
	const router = useRouter();
	const { height } = useAppBarHeight();
	const drawerWidth = "clamp(12rem, 20vw, 20rem)";

	return (
		<Drawer
			open
			variant="persistent"
			anchor="left"
			slotProps={{
				paper: {
					sx: {
						borderRadius: 0,
						top: `${height}px`,
						height: `calc(100% - ${height}px)`,
						transition: "top 0.2s ease, height 0.2s ease",
						width: drawerWidth,
					},
				},
			}}
		>
			<List>
				<ListItem>
					<ListItemButton onClick={() => router.push("/dashboard")}>
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
	);
}
