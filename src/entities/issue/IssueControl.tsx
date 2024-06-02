import { useEffect, useState } from "react";
import { useForm, SubmitHandler } from "react-hook-form";
import styled from "@emotion/styled";

import Button from "@mui/material/Button";
import BackspaceIcon from "@mui/icons-material/Backspace";

import {
  GrayBackground,
  InnerSelectInput,
  StatusMessage,
  SmallScrollArea,
  SelectInput,
} from "@/entities";
import {
  AccountService,
  useAccountStore,
  ProjectService,
  useProjectStore,
  useIssueStore,
} from "@/shared";

export const IssueControl = () => {
  const issue = useIssueStore((state) => state);

  //Before
  const [options, setOptions] = useState<
    {
      value: number;
      label: string;
    }[]
  >([]);

  const users = useAccountStore((state) => state.accounts);
  const project = useProjectStore((state) => state.project);
  const { loadAllAccountList } = AccountService();
  const { setProjectMember } = ProjectService();

  useEffect(() => {
    loadAllAccountList();
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

  const handleSelectChange = (value: number | User.Role) => {
    if (
      project &&
      project.members.findIndex((member) => `${member.id}` === value) === -1
    ) {
      setProjectMember(
        project.id,
        users.find((member) => `${member.id}` === value)!,
        "ADD"
      );
    }
  };

  return (
    <SmallScrollArea title={`[${issue.title}] 이슈 정보`}>
      <Date>{`이슈 등록 시간 : ${issue.reporterDate.split("T")[0]} ${
        issue.reporterDate.split("T")[1].split(".")[0]
      }`}</Date>

      <DesriptionBox>
        <DescriptionrContainer>"{issue.description}"</DescriptionrContainer>
      </DesriptionBox>

      <Title>이슈 상태</Title>
      <State>
        <div>{issue.state}</div>
        <InnerSelectInput
          options={options}
          onChange={handleSelectChange}
          placeholder="이슈 상태 변경"
        />
      </State>

      <Date style={{ backgroundColor: "#831717", borderColor: "#831717" }}>{`${
        issue.fixer
          ? `해당 이슈는 ${issue.fixer.name}에 의하여 닫혔습니다.}`
          : `해당 이슈는 아직 닫히지 않았습니다.`
      }`}</Date>

      <Title>이슈 우선순위</Title>
      <Priority>
        <div>{issue.priority}</div>
        <InnerSelectInput
          options={options}
          onChange={handleSelectChange}
          placeholder="이슈 우선순위 변경"
        />
      </Priority>

      <Title>이슈 관리자</Title>
      <Reporter>
        <div>{`${issue.reporter.name} [${issue.reporter.id}] `}</div>
        <InnerSelectInput
          options={options}
          onChange={handleSelectChange}
          placeholder="이슈 관리자 변경"
        />
      </Reporter>
    </SmallScrollArea>
  );
};

const Title = styled.div`
  font-size: 21px;
  font-weight: bold;
  color: #2f3542;

  margin-top: 10px;
  margin-bottom: 4px;
`;

const Date = styled.div`
  position: relative;

  width: 365px;
  height: 20px;
  background-color: #3030b8;
  border: 10px solid #3030b8;

  margin-left: 15px;
  margin-right: 15px;
  margin-top: 5px;

  border-radius: 3px;

  color: white;
  font-weight: bold;
`;

const DesriptionBox = styled.div`
  position: relative;

  width: 365px;
  height: 90px;
  background-color: #3030b8;
  border: 10px solid #3030b8;

  margin-left: 15px;
  margin-right: 15px;
  margin-top: 5px;

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

const DescriptionrContainer = styled.div`
  width: 100%;

  display: flex;
  align-items: center;
  flex-direction: column;

  color: white;
`;

const State = styled.div`
  position: relative;

  width: 365px;
  height: 28px;

  background-color: #b13b3b;
  border: 10px solid #b13b3b;

  color: white;
  font-size: 22px;
  font-weight: bold;

  display: flex;
  align-items: center;
  flex-direction: row;
  justify-content: space-between;

  margin-top: 5px;

  border-radius: 3px;
`;

const Priority = styled(State)`
  background-color: #ffbb00;
  border: 10px solid #ffbb00;
`;

const Reporter = styled(State)`
  background-color: #00c30d;
  border: 10px solid #00c30d;
`;
