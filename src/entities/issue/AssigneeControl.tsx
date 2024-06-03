import { useEffect, useState } from "react";
import styled from "@emotion/styled";
import { useNavigate } from "react-router";

import { Element, SelectInput, SmallScrollArea } from "@/entities";
import {
  useUserStore,
  useProjectStore,
  useIssueStore,
  IssueService,
  PAGE_URL,
} from "@/shared";

export const AssigneeControl = () => {
  const navigate = useNavigate();
  const issue = useIssueStore((state) => state);
  const userState = useUserStore((state) => state);

  //Before
  const [options, setOptions] = useState<
    {
      value: number;
      label: string;
    }[]
  >([]);
  const [users, setUsers] = useState<User.User[]>([]);
  const [recommendIssues, setRecommendIssues] = useState<
    { issueResponseDto: Issue.Issue; score: number }[]
  >([]);

  const project = useProjectStore((state) => state.project);

  const { getDev, changeAssignee, recommendIssue } = IssueService();

  const loadOption = async () => {
    if (project) {
      const list = await getDev(project.id);
      console.log(list);
      setUsers(list);
    }
  };

  const loadRecomend = async () => {
    const list = await recommendIssue(issue.id);
    console.log(list);
    setRecommendIssues(list);
  };

  useEffect(() => {
    if (issue.id !== -1) loadRecomend();
    if (userState.isAdmin() || userState.isPl()) loadOption();
  }, [issue.id]);

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
      {userState.isAdmin() || userState.isPl() ? (
        <>
          <Title>이슈 담당 개발자 설정</Title>
          <SelectInput
            options={options}
            onChange={handleSelectChange}
            placeholder="프로젝트 담당자 설정 선택"
          />
        </>
      ) : null}
      <Title>개발자 추천</Title>
      <AssigneeSuggestionBox>
        <AssigneeSuggestionContainer>
          {recommendIssues.map((issue) => (
            <Element
              key={issue.issueResponseDto.id}
              onClick={() => {
                navigate(PAGE_URL.Issue, {
                  state: { id: issue.issueResponseDto.id },
                });
              }}
            >
              <span
                style={{
                  width: "73px",
                  marginLeft: "6px",
                  display: "flex",
                  justifyContent: "center",
                }}
              >
                {issue.issueResponseDto.assignee
                  ? issue.issueResponseDto.assignee.name
                  : "없음"}
              </span>
              <span
                style={{
                  width: "200px",
                  color: "#3030b8",
                  marginLeft: "px",
                  display: "flex",
                  justifyContent: "center",
                }}
              >
                {issue.issueResponseDto.title}
              </span>
              <span
                style={{
                  width: "30px",
                  color: "#3030b8",
                  marginLeft: "5px",
                  marginRight: "10px",
                  display: "flex",
                  justifyContent: "center",
                }}
              >
                {`${issue.score}%`}
              </span>
            </Element>
          ))}
        </AssigneeSuggestionContainer>
      </AssigneeSuggestionBox>
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

  width: 365px;
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

  height: 206px;
  background-color: white;
  border: 3px solid #3030b8;

  width: 365px;

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
