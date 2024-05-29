import styled from "@emotion/styled";
import Button from "@mui/material/Button";

export const Input = styled.input`
  background-color: white;

  width: 220px;
  height: 45px;

  border: 0px white solid;
  border-left: 5px white solid;
  border-radius: 3px;

  outline: none;

  margin-top: 10px;

  font-size: 15px;
`;

export const StyleButton = styled(Button)`
  font-size: 17px;
  font-weight: bold;
  width: 230px;
  height: 45px;

  background-color: #2528c7;

  border: 0px;

  box-shadow: 0px 5px 0 -0.5px black;

  margin-top: 10px;
  margin-bottom: 5px;

  transition: opacity 1s linear;

  :hover {
    background-color: #2528c7;

    border: 0px;

    box-shadow: 0 0 0 0 black;
    margin-top: 15px;
    margin-bottom: 0px;

    transition: 0s;
  }
`;

export const SignInForm = styled.form`
  width: 20%;
  aspect-ratio: 1;

  z-index: 2;

  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
`;
