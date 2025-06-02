import UserListTemplate from "@/components/templates/UserListTemplate/UserListTemplate";
import { DEFAULT_LIMIT, fetchUsers } from "@/api/users";
import DashboardTemplate from "@/components/templates/DashboardTemplate/DashboardTemplate";

export default async function Home() {
  const { data, total } = await fetchUsers({limit: DEFAULT_LIMIT, page: 1});

  return (
    <DashboardTemplate>
      <UserListTemplate initialUsers={data} totalCount={total} />
    </DashboardTemplate>
  );
}
