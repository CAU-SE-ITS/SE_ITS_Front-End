import { useEffect, useState } from "react";
import { useForm, SubmitHandler } from "react-hook-form";
import styled from "@emotion/styled";

import Button from "@mui/material/Button";
import BackspaceIcon from "@mui/icons-material/Backspace";

import {
  Element,
  GrayBackground,
  SelectInput,
  StatusMessage,
  SmallScrollArea,
  InnerSelectInput,
} from "@/entities";
import {
  AccountService,
  useAccountStore,
  ProjectService,
  useProjectStore,
  useIssueStore,
  IssueService,
} from "@/shared";

export const AssigneeControl = () => {
  const issue = useIssueStore((state) => state);

  //Before
  const [options, setOptions] = useState<
    {
      value: number;
      label: string;
    }[]
  >([]);
  const [users, setUsers] = useState<User.User[]>([]);

  const project = useProjectStore((state) => state.project);

  const { getDev, changeAssignee } = IssueService();

  const loadOption = async () => {
    if (project) setUsers(await getDev(project.id));
  };

  useEffect(() => {
    loadOption();
  }, []);

  useEffect(() => {
    const newOptions: {
      value: number;
      label: string;
    }[] = [];
    users.map((user) => {
      newOptions.push({ value: user.id, label: `${user.name} (${user.role})` });
    });
    setOptions(newOptions);
  }, [users]);

  const handleSelectChange = (value: number | string) => {
    changeAssignee(issue.id, value as number);
  };

  return (
    <SmallScrollArea title="이슈 담당 개발자 지정">
      <Title>현재 담당 개발자</Title>
      <Assignee>
        {issue.assignee
          ? `${issue.assignee.name} [${issue.assignee.role}] [${issue.assignee.id}] `
          : `담당 개발자가 지정되어 있지 않습니다`}
      </Assignee>
      <Title>개발자 추천</Title>
      <AssigneeSuggestionBox>
        <AssigneeSuggestionContainer>
          <Element>
            <span
              style={{
                width: "73px",
                marginLeft: "6px",
                display: "flex",
                justifyContent: "center",
              }}
            >
              {"강민규규"}
            </span>
            <span
              style={{
                width: "200px",
                color: "#3030b8",
                marginLeft: "10px",
                display: "flex",
                justifyContent: "center",
              }}
            >
              연관성이 높은 이슈
            </span>
          </Element>
        </AssigneeSuggestionContainer>
      </AssigneeSuggestionBox>

      <Title>이슈 담당 개발자 설정</Title>
      <SelectInput
        options={options}
        onChange={handleSelectChange}
        placeholder="프로젝트 담당자 설정 선택"
      />
    </SmallScrollArea>
  );
};

const Title = styled.div`
  font-size: 21px;
  font-weight: bold;
  color: #2f3542;

  margin-top: 20px;
  margin-bottom: -14px;
`;

const Assignee = styled.div`
  position: relative;

  width: 321px;
  height: 60px;

  background-color: #3030b8;

  color: white;
  font-size: 18px;
  font-weight: bold;

  display: flex;
  align-items: center;
  flex-direction: row;
  justify-content: center;

  margin-top: 20px;

  border-radius: 3px;
`;

const AssigneeSuggestionBox = styled.div`
  position: relative;

  height: 200px;
  background-color: white;
  border: 3px solid #3030b8;

  width: 315px;

  margin-left: 15px;
  margin-right: 15px;
  margin-top: 20px;

  border-radius: 3px;

  overflow-y: auto;

  ::-webkit-scrollbar {
    width: 6px;
  }
  ::-webkit-scrollbar-thumb {
    background-color: #2f3542;
  }
  ::-webkit-scrollbar-track {
    background-color: #dcdcdc;
  }
`;

const AssigneeSuggestionContainer = styled.div`
  width: 100%;

  display: flex;
  align-items: center;
  flex-direction: column;
`;
