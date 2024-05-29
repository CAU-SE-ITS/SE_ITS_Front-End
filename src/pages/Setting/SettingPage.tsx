import { Projects, Accounts, Container, AccountControl } from "@/entities";

const SettingPage = () => {
  return (
    <>
      {/* <AccountControl></AccountControl> */}
      <Container>
        <Accounts></Accounts>
        <Projects></Projects>
      </Container>
    </>
  );
};

export default SettingPage;
