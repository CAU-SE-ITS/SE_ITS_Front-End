import { ReactNode } from "react";
import styled from "@emotion/styled";
import AddBoxIcon from "@mui/icons-material/AddBox";

export const ScrollArea = ({
  children,
  title,
  createClick,
}: {
  children: ReactNode;
  title: string;
  createClick?: () => void;
}) => (
  <div style={{ position: "relative" }}>
    <ScrollTitle>{title}</ScrollTitle>
    <ScrollBox>
      <ScrollContainer>{children}</ScrollContainer>
    </ScrollBox>
    {createClick && <CreateButton onClick={createClick} />}
  </div>
);

export const SmallScrollArea = ({
  children,
  title,
  createClick,
}: {
  children: ReactNode;
  title: string;
  createClick?: () => void;
}) => (
  <div style={{ position: "relative" }}>
    <ScrollTitle>{title}</ScrollTitle>
    <SmallScrollBox>
      <ScrollContainer>{children}</ScrollContainer>
    </SmallScrollBox>
    {createClick && <CreateButton onClick={createClick} />}
  </div>
);

const CreateButton = styled(AddBoxIcon)`
  position: absolute;
  top: 32px;
  right: 28px;

  color: white;
  font-size: 38px;
`;

const SmallScrollBox = styled.div`
  position: relative;
  background-color: white;

  width: 400px;
  height: 500px;
  border: 3px solid #3030b8;
  border-top: 60px solid #3030b8;

  margin-left: 15px;
  margin-right: 15px;
  margin-top: 20px;

  border-radius: 3px;

  overflow-y: auto;

  ::-webkit-scrollbar {
    width: 6px;
  }
  ::-webkit-scrollbar-thumb {
    background-color: #2f3542;
  }
  ::-webkit-scrollbar-track {
    background-color: #dcdcdc;
  }
`;

const ScrollBox = styled.div`
  position: relative;
  background-color: white;

  width: 450px;
  height: 500px;
  border: 3px solid #4444ff;
  border-top: 60px solid #4444ff;

  margin-left: 15px;
  margin-right: 15px;
  margin-top: 20px;

  border-radius: 3px;

  overflow-y: auto;

  ::-webkit-scrollbar {
    width: 6px;
  }
  ::-webkit-scrollbar-thumb {
    background-color: #2f3542;
  }
  ::-webkit-scrollbar-track {
    background-color: #dcdcdc;
  }
`;

const ScrollContainer = styled.div`
  width: 100%;

  display: flex;
  align-items: center;
  flex-direction: column;
`;

const ScrollTitle = styled.div`
  position: absolute;

  left: 30px;

  top: 34px;

  font-size: 23px;
  font-weight: bold;
  color: white;

  z-index: 1;
`;
