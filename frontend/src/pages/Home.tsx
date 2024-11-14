import { AppShell } from "../components/appshell";
import { User } from "../components/auth/user";

export const HomePage = () => {
  return (
    <AppShell>
      <div className="">
        <User />
      </div>
    </AppShell>
  );
};
