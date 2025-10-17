import { getAllUsers } from "@/actions/admin/get-all-users";
import UsersTable from "./components/users-table";

export default async function AdminUsersPage() {
  const users = await getAllUsers();

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold text-gray-900">Gestão de Usuários</h1>
        <p className="text-gray-600">
          Visualize e gerencie todos os usuários do sistema
        </p>
      </div>

      <UsersTable users={users} />
    </div>
  );
}
