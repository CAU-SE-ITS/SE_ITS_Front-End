import { useEffect, useState } from "react";
import { useForm, SubmitHandler } from "react-hook-form";
import styled from "@emotion/styled";

import Button from "@mui/material/Button";
import BackspaceIcon from "@mui/icons-material/Backspace";

import { GrayBackground, SelectInput, StatusMessage } from "@/entities";
import {
  AccountService,
  useAccountStore,
  useIssueStore,
  IssueService,
  useProjectStore,
} from "@/shared";

export const CreateComment = ({
  onClose,
  edit,
}: {
  onClose: () => void;
  edit?: number;
}) => {
  const { handleSubmit, register } = useForm<{ content: string }>();
  const [message, setMessage] = useState<false | string>(false);

  const { createComment, changeComment, removeComment } = IssueService();
  const id = useIssueStore((state) => state.id);

  const onEditSubmit: SubmitHandler<{ content: string }> = (data) => {
    if (!data.content) {
      setMessage("댓글 내용을 입력해주세요.");
      return;
    }

    if (edit) changeComment(edit, data.content);

    onClose();
  };

  const onCreateSubmit: SubmitHandler<{ content: string }> = (data) => {
    if (!data.content) {
      setMessage("댓글 내용을 입력해주세요.");
      return;
    }

    createComment(id, data.content);

    onClose();
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
      <Form onSubmit={handleSubmit(edit ? onEditSubmit : onCreateSubmit)}>
        <Title>{edit ? "댓글 수정" : "댓글 작성"}</Title>
        <Textarea placeholder="댓글을 작성해주세요." {...register("content")} />
        <StyleButton type="submit" variant="contained">
          {edit ? "댓글 변경" : "댓글 작성"}
        </StyleButton>

        {edit ? (
          <DeleteButton onClick={() => removeComment(edit)}>
            삭제하기
          </DeleteButton>
        ) : null}
      </Form>
    </GrayBackground>
  );
};

const Title = styled.div`
  font-size: 35px;
  font-weight: bold;
  color: #2528c7;

  margin-bottom: 30px;
`;

const Form = styled.form`
  width: 100%;

  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
`;

const Textarea = styled.textarea`
  background-color: white;

  width: 80%;
  height: 145px;

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

  margin-top: 65px;
  margin-bottom: 5px;

  transition: opacity 1s linear;

  :hover {
    background-color: #2528c7;

    border: 0px;

    box-shadow: 0 0 0 0 black;
    margin-top: 70px;
    margin-bottom: 0px;

    transition: 0s;
  }
`;

const DeleteButton = styled(Button)`
  font-size: 17px;
  font-weight: bold;
  color: white;
  width: 82%;
  height: 50px;

  background-color: #c72525;

  border: 0px;

  box-shadow: 0px 5px 0 -0.5px black;

  margin-top: 24px;
  margin-bottom: 5px;

  transition: opacity 1s linear;

  :hover {
    background-color: #c72525;

    border: 0px;

    box-shadow: 0 0 0 0 black;
    margin-top: 29px;
    margin-bottom: 0px;

    transition: 0s;
  }
`;
