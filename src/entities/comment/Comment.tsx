import styled from "@emotion/styled";

export const Comment = ({
  writer,
  content,
}: {
  writer: string;
  content: string;
}) => (
  <Container>
    <Writer>{writer}</Writer>
    <Content>{content}</Content>
  </Container>
);

const Container = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
`;

const Writer = styled.div`
  width: 430px;
  margin: 7px 0px 1px 0px;

  background-color: #404ee2;
  border-radius: 2px;

  height: 30px;

  font-size: 15px;
  font-weight: bold;
  color: white;

  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: row;
`;

const Content = styled.div`
  width: 420px;

  background-color: #eaeaea;
  border-radius: 2px;
  border: 5px 5px 5px 5px;

  font-size: 10px;
  font-weight: bold;

  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: row;
`;
