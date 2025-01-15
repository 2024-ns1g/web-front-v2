import { Navbar } from "@/components/navbar";
import { SidebarWrapper } from "@/components/sidebar/sidebar";

export default function DefaultLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="flex flex-row">
      <SidebarWrapper />
      <div className="relative flex flex-col h-screen">
        <Navbar />
        <main className="container mx-auto max-w-7xl flex-grow">
          {children}
        </main>
      </div >
    </div>
  );
}
