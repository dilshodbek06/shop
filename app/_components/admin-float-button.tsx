import { ShieldCheck } from "lucide-react";
import Link from "next/link";

const AdminFloatButton = () => {
  return (
    <div
      title="Admin page"
      className="group fixed bottom-5 right-5 p-2  flex items-end justify-end w-24 h-24 z-50 "
    >
      <div className="text-white shadow-xl flex items-center justify-center p-3 rounded-full bg-gradient-to-r from-cyan-500 to-blue-500 z-50 absolute  hover:scale-105 transition-all duration-300 ">
        <Link href={"/admin"}>
          <ShieldCheck className="w-6 h-6 cursor-pointer transition-all duration-[0.6s]" />
        </Link>
      </div>
    </div>
  );
};

export default AdminFloatButton;
