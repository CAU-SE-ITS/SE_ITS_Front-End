import { useState } from "react";
import { useForm, SubmitHandler } from "react-hook-form";
import styled from "@emotion/styled";

import Button from "@mui/material/Button";

import { GrayBackground, InnerSelectInput, StatusMessage } from "@/entities";
import { AccountService } from "@/shared";

const options = [
  { value: "PL", label: "PL" },
  { value: "DEV", label: "DEV" },
  { value: "TESTER", label: "TESTER" },
];

export const SearchIssue = () => {
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

  const handleSelectChange = (value: User.Role | number) => {
    setValue("role", value as User.Role);
  };

  return (
    <>
      {message ? (
        <StatusMessage
          message={message}
          setMessage={setMessage}
          duration={2000}
        />
      ) : null}

      <Form onSubmit={handleSubmit(onSubmit)}>
        <Title>이슈 검색</Title>
        <Input placeholder="검색 내용을 입력해주세요.." {...register("id")} />
        <div
          style={{
            marginTop: "5px",
            width: "95%",
            display: "flex",
            flexDirection: "row",
            justifyContent: "space-between",
            alignItems: "center",
          }}
        >
          <StyleButton type="submit" variant="contained">
            검색하기
          </StyleButton>
          <InnerSelectInput
            options={options}
            onChange={handleSelectChange}
            placeholder="카테고리 설정"
          />
        </div>
      </Form>
    </>
  );
};

const Form = styled.form`
  background-color: #5d5dff;

  width: 97%;
  height: 120px;

  border-radius: 3px;

  margin-top: 6px;

  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
`;

const Title = styled.div`
  font-size: 21px;
  font-weight: bold;
  color: white;

  margin-bottom: 3px;
`;

const Input = styled.input`
  background-color: white;

  width: 94%;
  height: 27px;

  border: 2px solid #5d5dff;
  border-radius: 3px;

  outline: none;

  font-size: 16px;
  text-align: center;
  font-family: "Spoqa Han Sans Neo", "sans-seri";

  ::placeholder {
    font-family: "Spoqa Han Sans Neo", "sans-seri";
    text-align: center;
  }
`;

const StyleButton = styled(Button)`
  font-size: 15px;
  font-weight: bold;
  width: 50%;
  height: 30px;

  background-color: #2528c7;

  border: 0px;

  box-shadow: 0px 5px 0 -0.5px black;

  margin-top: -1px;
  margin-bottom: 9px;

  transition: opacity 1s linear;

  :hover {
    background-color: #2528c7;

    border: 0px;

    box-shadow: 0 0 0 0 black;
    margin-top: 4px;
    margin-bottom: 4px;

    transition: 0s;
  }
`;
