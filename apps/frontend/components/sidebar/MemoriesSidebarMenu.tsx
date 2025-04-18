"use client";

import { useState } from "react";
import {
	ListItem,
	ListItemButton,
	ListItemIcon,
	ListItemText,
	Collapse,
	List,
} from "@mui/material";
import { Photo, Add, Collections } from "@mui/icons-material";
import { useRouter } from "next/navigation";

export default function SidebarMemoriesMenu() {
	const [open, setOpen] = useState(false);
	const router = useRouter();

	const handleToggle = () => {
		setOpen((prev) => !prev);
	};

	return (
		<List
			sx={{
				width: "100%",
				justifyContent: "left",
			}}
		>
			<ListItem disablePadding>
				<ListItemButton onClick={handleToggle}>
					<ListItemIcon>
						<Photo />
					</ListItemIcon>
					<ListItemText primary="Memories" />
				</ListItemButton>
			</ListItem>
			<Collapse in={open} timeout="auto" unmountOnExit>
				<ListItem disablePadding>
					<ListItemButton
						sx={{ pl: 4 }}
						onClick={() =>
							router.push("/dashboard/memories/overview")
						}
					>
						<ListItemIcon>
							<Collections />
						</ListItemIcon>
						<ListItemText primary="Overview" />
					</ListItemButton>
				</ListItem>
				<ListItem disablePadding>
					<ListItemButton
						sx={{ pl: 4 }}
						onClick={() => router.push("/dashboard/memories/new")}
					>
						<ListItemIcon>
							<Add />
						</ListItemIcon>
						<ListItemText primary="Create a new memory" />
					</ListItemButton>
				</ListItem>
			</Collapse>
		</List>
	);
}
