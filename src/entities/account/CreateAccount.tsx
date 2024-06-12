import { useState } from "react";
import { useForm, SubmitHandler } from "react-hook-form";
import styled from "@emotion/styled";

import Button from "@mui/material/Button";

import { GrayBackground, SelectInput, StatusMessage } from "@/entities";
import { AccountService } from "@/shared";

const options = [
  { value: "PL", label: "PL" },
  { value: "DEV", label: "DEV" },
  { value: "TESTER", label: "TESTER" },
];

export const CreateAccount = ({ onClose }: { onClose: () => void }) => {
  const { handleSubmit, register, setValue } =
    useForm<User.AccountCreateForm>();
  const [message, setMessage] = useState<false | string>(false);
  const { addAccount } = AccountService();

  const onSubmit: SubmitHandler<User.AccountCreateForm> = (data) => {
    if (!data.password || !data.passwordCheck || !data.id || !data.name) {
      setMessage("모든 정보를 입력해주세요.");
      return;
    }
    if (data.password !== data.passwordCheck) {
      setMessage("입력한 비밀번호가 동일하지 않습니다.");
      return;
    }
    if (!data.role) {
      setMessage("직책을 선택하지 않았습니다.");
      return;
    }

    addAccount({
      signId: data.id,
      name: data.name,
      password: data.password,
      role: data.role,
    });

    onClose();
  };

  const handleSelectChange = (value: string | number) => {
    setValue("role", value as User.Role);
  };

  return (
    <GrayBackground onClose={onClose}>
      {message ? (
        <StatusMessage
          message={message}
          setMessage={setMessage}
          duration={2000}
        />
      ) : null}
      <Form onSubmit={handleSubmit(onSubmit)}>
        <Title>계정 생성</Title>
        <Input placeholder="아이디" {...register("id")} />
        <Input placeholder="이름" {...register("name")} />
        <Input
          placeholder="비밀번호"
          type="password"
          {...register("password")}
        />
        <Input
          placeholder="비밀번호 재입력"
          type="password"
          {...register("passwordCheck")}
        />
        <SelectInput
          options={options}
          onChange={handleSelectChange}
          placeholder="직책 설정"
        />
        <StyleButton type="submit" variant="contained">
          등록하기
        </StyleButton>
      </Form>
    </GrayBackground>
  );
};

const Title = styled.div`
  font-size: 35px;
  font-weight: bold;
  color: #2528c7;

  margin-bottom: -8px;
`;

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

  border: 2px solid #5d5dff;
  border-radius: 3px;

  outline: none;

  margin-top: 20px;

  font-size: 16px;
  text-align: center;
  font-family: "Spoqa Han Sans Neo", "sans-seri";

  ::placeholder {
    font-family: "Spoqa Han Sans Neo", "sans-seri";
    text-align: center;
  }
`;

const StyleButton = styled(Button)`
  font-size: 17px;
  font-weight: bold;
  width: 82%;
  height: 50px;

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
    margin-top: 25px;
    margin-bottom: 0px;

    transition: 0s;
  }
`;
