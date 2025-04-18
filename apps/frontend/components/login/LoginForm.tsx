"use client";

import { Box, Button, Grid, TextField } from "@mui/material";
import { useState } from "react";

export default function LoginForm() {
	const [email, setEmail] = useState<string>("");
	const [password, setPassword] = useState<string>("");
	return (
		<Grid
			columns={2}
			container
			gap="inherit"
			display="flex"
			justifyContent="center"
		>
			<Grid size={2}>
				<TextField
					fullWidth
					required
					label="Email"
					value={email}
					onChange={(e) => setEmail(e.target.value)}
				/>
			</Grid>
			<Grid size={2}>
				<TextField
					fullWidth
					required
					label="Password"
					value={password}
					onChange={(e) => setPassword(e.target.value)}
				/>
			</Grid>
			<Grid size={2}>
				<Box display="flex" justifyContent="flex-end">
					<Button
						variant="text"
						sx={{
							px: "2em",
						}}
					>
						New here? Sign up!
					</Button>
					<Button
						variant="outlined"
						sx={{
							px: "2em",
						}}
					>
						Log in
					</Button>
				</Box>
			</Grid>
		</Grid>
	);
}
