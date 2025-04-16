import { AuthProvider } from "@/context/AuthContext";
import ThemeRegistry from "@/app/components/ThemeRegistry";
import { CssBaseline } from "@mui/material";

export default function RootLayout({
	children,
}: {
	children: React.ReactNode;
}) {
	return (
		<html lang="en">
			<body>
				<ThemeRegistry>
					<AuthProvider>
						<CssBaseline />
						{children}
					</AuthProvider>
				</ThemeRegistry>
			</body>
		</html>
	);
}
