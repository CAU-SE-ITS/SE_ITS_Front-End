import styled from "@emotion/styled";
import { ReactNode } from "react";

export const Container = styled.div`
  position: fixed;
  left: 50%;
  top: 50%;
  transform: translate(-50%, -52%);

  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: row;

  width: 100vw;
  height: 100vh;
`;

export const SignInContainer = styled.div`
  background-color: #4444ff;

  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;

  width: 300px;
  height: 235px;

  border-radius: 7px;

  overflow-y: scroll;

  ::-webkit-scrollbar {
    display: none;
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

  overflow-y: scroll;

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
  height: 1000px;

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
