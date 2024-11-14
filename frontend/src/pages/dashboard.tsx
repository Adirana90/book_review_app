import { CreateBook } from "../components/book/create-book";
import { ListBook } from "../components/book/list-book";

export function DashboardPage() {
  return (
    <div>
      <CreateBook />
      <ListBook />
    </div>
  );
}
