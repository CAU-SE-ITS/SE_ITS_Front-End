import { useState } from "react";
import { useForm, SubmitHandler } from "react-hook-form";
import styled from "@emotion/styled";

import Button from "@mui/material/Button";

import { InnerSelectInput, StatusMessage } from "@/entities";
import { ProjectService, useProjectStore } from "@/shared";

const options = [
  { value: "TITLE", label: "이름" },
  { value: "STATUS", label: "상태" },
  { value: "PRIORITY", label: "우선순위" },
  { value: "ASSIGNEE", label: "담당 개발자" },
];

export const SearchIssue = () => {
  const { handleSubmit, register, setValue } = useForm<{
    keyword: string;
    category: string | number;
  }>();
  const [message, setMessage] = useState<false | string>(false);
  const { loadProject, searchIssue } = ProjectService();
  const project = useProjectStore((state) => state.project);

  const onSubmit: SubmitHandler<{
    keyword: string;
    category: string | number;
  }> = (data) => {
    if (!project) return;

    if (!data.keyword || data.keyword === "") {
      loadProject(project.id);
      return;
    }
    if (!data.category) {
      setMessage("카테고리를 설정 해주세요.");
      return;
    }

    searchIssue(data.category as string, project.id, data.keyword);
  };

  const handleSelectChange = (value: string | number) => {
    setValue("category", value);
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
        <Input
          placeholder="검색 내용을 입력해주세요"
          {...register("keyword")}
        />
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
