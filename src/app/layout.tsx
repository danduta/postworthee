import { AuthProvider } from "@/context/AuthContext";
import ThemeRegistry from "@/components/ThemeRegistry";
import { AppBarHeightProvider } from "@/context/AppBarHeightContext";
import { CssBaseline } from "@mui/material";
import AppContent from "@/components/AppContent";

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
            <AppBarHeightProvider>
              <CssBaseline />
              <AppContent>{children}</AppContent>
            </AppBarHeightProvider>
          </AuthProvider>
        </ThemeRegistry>
      </body>
    </html>
  );
}
