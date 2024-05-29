import { useForm, SubmitHandler } from "react-hook-form";
import styled from "@emotion/styled";

import Button from "@mui/material/Button";

import { GrayBackground } from "@/entities";

export const AccountControl = () => {
  const { handleSubmit, register } = useForm<User.AccountCreateForm>();

  const onSubmit: SubmitHandler<User.AccountCreateForm> = (data) => {
    console.log(data);
  };

  return (
    <GrayBackground>
      <Form onSubmit={handleSubmit(onSubmit)}>
        <Input
          placeholder="아이디"
          {...register("id", { required: "아이디를 입력해주세요!" })}
        />
        <Input
          placeholder="비밀번호"
          type="password"
          {...register("password", { required: "비밀번호를 입력해주세요!" })}
        />
        <Input
          placeholder="비밀번호 재입력"
          type="password"
          {...register("passwordCheck", {
            required: "비밀번호를 입력해주세요!",
          })}
        />
        <StyleButton type="submit" variant="contained">
          계정 생성
        </StyleButton>
      </Form>
    </GrayBackground>
  );
};

const Form = styled.form`
  width: 100%;

  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
`;

const Input = styled.input`
  background-color: white;

  width: 80%;
  height: 45px;

  border: 2px solid #9797ff;
  border-radius: 3px;

  outline: none;

  margin-top: 20px;

  font-size: 16px;
  text-align: center;

  ::placeholder {
    text-align: center;
  }
`;

const StyleButton = styled(Button)`
  font-size: 17px;
  font-weight: bold;
  width: 82%;
  height: 45px;

  background-color: #2528c7;

  border: 0px;

  box-shadow: 0px 5px 0 -0.5px black;

  margin-top: 20px;
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
