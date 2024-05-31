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

export const EditAccount = ({
  user,
  onClose,
}: {
  user: User.User;
  onClose: () => void;
}) => {
  const { handleSubmit, setValue } = useForm<User.AccountEditForm>();
  const [message, setMessage] = useState<false | string>(false);

  const { deleteAccount, editAccount } = AccountService();

  const onSubmit: SubmitHandler<User.AccountEditForm> = (data) => {
    if (!data.role) {
      setMessage("직책을 선택하지 않았습니다.");
      return;
    }

    editAccount(user.id, data.role);

    onClose();
  };

  const handleSelectChange = (value: User.Role) => {
    setValue("role", value);
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
        <Title>{user.name} 계정 편집</Title>
        <SelectInput
          options={options}
          onChange={handleSelectChange}
          placeholder="직책 설정"
        />
        <StyleButton type="submit" variant="contained">
          변경하기
        </StyleButton>

        <DeleteButton
          onClick={() => {
            deleteAccount(user.id);
            onClose();
          }}
        >
          계정 삭제하기
        </DeleteButton>
      </Form>
    </GrayBackground>
  );
};

const Title = styled.div`
  font-size: 35px;
  font-weight: bold;
  color: #2528c7;

  margin-bottom: 60px;
`;

const Form = styled.form`
  width: 100%;

  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
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

const DeleteButton = styled(StyleButton)`
  background-color: #c72525;
  color: white;
  margin-top: 80px;

  :hover {
    margin-top: 85px;
    background-color: #c72525;
  }
`;
