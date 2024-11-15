import { AppShell } from "../components/appshell";
import { CreateBook } from "../components/book/create-book";
import { ListBook } from "../components/book/list-book";

export function DashboardPage() {
  return (
    <div>
      <AppShell>
        <CreateBook />
        <ListBook />
      </AppShell>
    </div>
  );
}
