import styled from "@emotion/styled";
import { ReactNode } from "react";

export const GrayBackground = ({ children }: { children: ReactNode }) => (
  <Background>
    <Container>{children}</Container>
  </Background>
);

const Background = styled.div`
  background-color: rgba(0, 0, 0, 0.6);
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;

  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;

  z-index: 2;
`;

const Container = styled.div`
  background-color: white;
  border-radius: 5px;

  width: 450px;
  height: 500px;

  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
`;
