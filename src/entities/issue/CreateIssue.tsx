import { useEffect, useState } from "react";
import { useForm, SubmitHandler } from "react-hook-form";
import styled from "@emotion/styled";

import Button from "@mui/material/Button";
import BackspaceIcon from "@mui/icons-material/Backspace";

import { GrayBackground, SelectInput, StatusMessage } from "@/entities";
import { IssueService, useProjectStore } from "@/shared";

export const CreateIssue = ({ onClose }: { onClose: () => void }) => {
  const { handleSubmit, register } = useForm<Issue.CreateIssueForm>();
  const [message, setMessage] = useState<false | string>(false);

  const { createIssue } = IssueService();
  const project = useProjectStore((state) => state.project);

  const onSubmit: SubmitHandler<Issue.CreateIssueForm> = (data) => {
    if (!project) return;

    if (!data.title || !data.description) {
      setMessage("모든 정보를 입력해주세요.");
      return;
    }

    createIssue({
      title: data.title,
      description: data.description,
      projectId: project.id,
      category: data.category,
    });

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
      <Form onSubmit={handleSubmit(onSubmit)}>
        <Title>이슈 생성</Title>
        <Input placeholder="이슈 이름" {...register("title")} />
        <Input placeholder="이슈 카테고리" {...register("category")} />
        <Textarea placeholder="이슈 설명" {...register("description")} />
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

  margin-bottom: 30px;
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
