import { ReactNode } from "react";
import styled from "@emotion/styled";

export const ScrollArea = ({
  children,
  title,
}: {
  children: ReactNode;
  title: string;
}) => (
  <div style={{ position: "relative" }}>
    <ScrollTitle>{title}</ScrollTitle>
    <ScrollBox>
      <ScrollContainer>{children}</ScrollContainer>
    </ScrollBox>
  </div>
);

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

  left: 50%;
  transform: translate(-50%);

  top: 32px;

  font-size: 25px;
  font-weight: bold;
  color: white;

  z-index: 1;
`;
