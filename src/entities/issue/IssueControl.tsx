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
  IssueService,
  useProjectStore,
  useIssueStore,
  useUserStore,
} from "@/shared";

const statusDevOption = [{ value: "RESOLVED", label: "RESOLVED" }];

const statusTesterOption = [
  { value: "CLOSED", label: "CLOSED" },
  { value: "REOPENED", label: "REOPENED" },
];

const statusOption = [
  { value: "RESOLVED", label: "RESOLVED" },
  { value: "CLOSED", label: "CLOSED" },
  { value: "REOPENED", label: "REOPENED" },
];

const priorityOption = [
  { value: "BLOCKER", label: "BLOCKER" },
  { value: "CRITICAL", label: "CRITICAL" },
  { value: "MAJOR", label: "MAJOR" },
  { value: "MINOR", label: "MINOR" },
  { value: "TRIVIAL", label: "TRIVIAL" },
];

export const IssueControl = () => {
  const issue = useIssueStore((state) => state);
  const userState = useUserStore((state) => state);

  console.log(issue.priority);

  //Before
  /* const [options, setOptions] = useState<
    {
      value: number;
      label: string;
    }[]
  >([]); */
  //const [users, setUsers] = useState<User.User[]>([]);

  //const project = useProjectStore((state) => state.project);

  const {
    //getTester,
    updataIssue,
    deleteIssue,
    requestDeleteIssue,
    updataIssueDev,
  } = IssueService();

  /* const loadOption = async () => {
    if (project) setUsers(await getTester(project.id));
  }; */

  /* useEffect(() => {
    loadOption();
  }, []); */

  /* useEffect(() => {
    const newOptions: {
      value: number;
      label: string;
    }[] = [];
    users.map((user) => {
      newOptions.push({ value: user.id, label: `${user.name} (${user.role})` });
    });
    setOptions(newOptions);
  }, [users]); */

  const handlePriority = (value: number | string) => {
    console.log(value);
    updataIssue({
      issueId: issue.id,
      description: issue.description,
      status: issue.status,
      priority: value as Issue.Priority,
    });
  };

  const handleStatus = (value: number | string) => {
    if (userState.isDev()) {
      updataIssueDev({
        issueId: issue.id,
        status: value as Issue.Status,
      });
    } else {
      updataIssue({
        issueId: issue.id,
        description: issue.description,
        status: value as Issue.Status,
        priority: issue.priority,
      });
    }
  };

  return (
    <SmallScrollArea title={`[${issue.title}] 이슈 정보`}>
      <Category>
        {issue.category ? issue.category : "카테고리가 없습니다."}
      </Category>

      {issue.id !== -1 ? (
        <Date>{`이슈 등록 시간 : ${issue.reportedDate.split("T")[0]} ${
          issue.reportedDate.split("T")[1].split(".")[0]
        }`}</Date>
      ) : null}

      <DesriptionBox>
        <DescriptionrContainer>"{issue.description}"</DescriptionrContainer>
      </DesriptionBox>

      <State>
        <div>{issue.status}</div>
        {userState.isPl() ||
        userState.isAdmin() ||
        (issue.assignee && userState.userId === issue.assignee.id) ||
        userState.userId === issue.reporter.id ? (
          <InnerSelectInput
            options={
              userState.isPl() || userState.isAdmin()
                ? statusOption
                : userState.userId === issue.reporter.id
                ? statusTesterOption
                : statusDevOption
            }
            onChange={handleStatus}
            placeholder="이슈 상태 변경"
          />
        ) : null}
      </State>

      <Date style={{ backgroundColor: "#831717", borderColor: "#831717" }}>{`${
        issue.fixer
          ? `해당 이슈는 ${issue.fixer.name}에 의하여 해결되었습니다.`
          : `해당 이슈는 아직 닫히지 않았습니다.`
      }`}</Date>

      <Priority>
        <div>{issue.priority}</div>
        {userState.isPl() || userState.isAdmin() ? (
          <InnerSelectInput
            options={priorityOption}
            onChange={handlePriority}
            placeholder="이슈 우선순위 변경"
          />
        ) : null}
      </Priority>

      <Title>담당 관리자</Title>
      <Reporter>
        <div>{`${issue.reporter.name} [${issue.reporter.id}] `}</div>
        {/* <InnerSelectInput
          options={options}
          onChange={handleSelectChange}
          placeholder="이슈 관리자 변경"
        /> */}
      </Reporter>

      <Date
        style={{
          backgroundColor: `${
            userState.userId === issue.reporter.id
              ? "#831717"
              : userState.isAdmin() && issue.status === "DELETE_REQUEST"
              ? "#831717"
              : userState.isAdmin()
              ? "#606060"
              : "#606060"
          }`,
          borderColor: `${
            userState.userId === issue.reporter.id
              ? "#831717"
              : userState.isAdmin() && issue.status === "DELETE_REQUEST"
              ? "#831717"
              : userState.isAdmin()
              ? "#606060"
              : "#606060"
          }`,
          display: "flex",
          justifyContent: "center",
        }}
        onClick={() => {
          if (userState.userId === issue.reporter.id)
            requestDeleteIssue(issue.id);
          else if (userState.isAdmin() && issue.status === "DELETE_REQUEST")
            deleteIssue(issue.id);
        }}
      >
        {userState.userId === issue.reporter.id
          ? "이슈 삭제 요청 보내기"
          : userState.isAdmin() && issue.status === "DELETE_REQUEST"
          ? "이슈 삭제하기"
          : userState.isAdmin()
          ? "이슈 삭제 요청이 없습니다."
          : "이슈 삭제 관련 권한이 없습니다."}
      </Date>
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
  background-color: #252588;
  border: 10px solid #252588;

  margin-left: 15px;
  margin-right: 15px;
  margin-top: 5px;

  border-radius: 3px;

  color: white;
  font-weight: bold;
`;

const Category = styled(Date)`
  background-color: #3030b8;
  border: 10px solid #3030b8;
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

  justify-content: center;
`;
