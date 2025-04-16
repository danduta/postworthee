import AppContent from "@/app/components/AppContent";

export default function DashboardLayout({
	children,
}: {
	children: React.ReactNode;
}) {
	return <AppContent>{children}</AppContent>;
}
