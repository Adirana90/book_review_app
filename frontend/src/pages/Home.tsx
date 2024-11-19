import { AppShell } from "../components/appshell";
import { ListBook } from "../components/book/list-book";

export const HomePage = () => {
  return (
    <div className="">
      <AppShell>
        <div className="relative w-full max-w-2xl mx-auto mt-0 pt-0 px-6">
          <div className="min-h-[6rem] flex items-center justify-center">
            <div className="text-center">
              <h1 className="text-4xl font-extrabold text-[#232423] mb-8 font-mono">
                Welcome to Book Review App
              </h1>
            </div>
          </div>
        </div>
        <ListBook />
      </AppShell>
    </div>
  );
};
