import { AppShell } from "../components/appshell";
import { User } from "../components/auth/user";

export const HomePage = () => {
  return (
    <div className="">
      <AppShell>
        <User />
      </AppShell>
    </div>
  );
};
