import { Breadcrumbs } from "@/components/breadcrumbs";
import { DataTable } from "./data-table";
import { columns, Payment } from "./columns";

const UsersPage = async () => {
  const breadcrumbItems = [
    { title: "Dashboard", link: "/admin" },
    { title: "Users", link: "/admin/users" },
  ];

  return (
    <>
      <div className="flex-1 space-y-4  p-4 pt-6 md:p-8">
        <Breadcrumbs items={breadcrumbItems} />
        <DataTable columns={columns} data={[]} />
      </div>
    </>
  );
};

export default UsersPage;
