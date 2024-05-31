import { Projects, Accounts, Container, CreateAccount } from "@/entities";

const SettingPage = () => {
  return (
    <>
      <CreateAccount></CreateAccount>
      <Container>
        <Accounts></Accounts>
        <Projects></Projects>
      </Container>
    </>
  );
};

export default SettingPage;
