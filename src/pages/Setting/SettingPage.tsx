import { Projects, Accounts, Container } from "@/entities";

import { useUserStore } from "@/shared";

const SettingPage = () => {
  const isAdmin = useUserStore((state) => state.isAdmin);
  return (
    <>
      <Container>
        {isAdmin() && <Accounts></Accounts>}
        <Projects></Projects>
      </Container>
    </>
  );
};

export default SettingPage;
