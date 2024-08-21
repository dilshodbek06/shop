import Sidebar from "./_components/sidebar";

export default function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="h-full">
      <div className="h-[80px] z-10 border-b shadow-sm md:pl-60 fixed inset-y-0 w-full bg-white">
        {/* <AdminNavbar /> */}
      </div>
      <div className="hidden md:flex  bg-white h-full w-60 flex-col fixed inset-y-0 z-50">
        <Sidebar />
      </div>
      <main className="md:pl-60 pt-[80px] h-screen bg-gray-50 overflow-y-auto ">
        <div className="bg-white m-4">{children}</div>
      </main>
    </div>
  );
}
