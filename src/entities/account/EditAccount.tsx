import { useState } from "react";
import { useForm, SubmitHandler } from "react-hook-form";
import styled from "@emotion/styled";

import Button from "@mui/material/Button";

import { GrayBackground, SelectInput, StatusMessage } from "@/entities";

const options = [
  { value: "PL", label: "PL" },
  { value: "DEV", label: "DEV" },
  { value: "TESTER", label: "TESTER" },
];

export const EditAccount = () => {
  const { handleSubmit, register, setValue } =
    useForm<User.AccountCreateForm>({role: });
  const [message, setMessage] = useState<false | string>(false);

  const onSubmit: SubmitHandler<User.AccountEditForm> = (data) => {
    console.log(data);
  };

  const handleSelectChange = (value: User.Role) => {
    setValue("role", value);
  };

  return (
    <GrayBackground>
      {message ? (
        <StatusMessage
          message={message}
          setMessage={setMessage}
          duration={2000}
        />
      ) : null}
      <Form onSubmit={handleSubmit(onSubmit)}>
        <Title>계정 생성</Title>
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
