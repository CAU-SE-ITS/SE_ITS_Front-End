import styled from "@emotion/styled";

export const Container = styled.div`
  position: fixed;
  left: 50%;
  top: 50%;
  transform: translate(-50%, -52%);

  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: row;

  width: 530px;
  height: 630px;
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
