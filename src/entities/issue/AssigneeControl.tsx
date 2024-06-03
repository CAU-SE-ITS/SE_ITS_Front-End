import { useEffect, useState } from "react";
import styled from "@emotion/styled";

import { Element, SelectInput, SmallScrollArea } from "@/entities";
import { useProjectStore, useIssueStore, IssueService } from "@/shared";

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
  const [recommendIssues, setRecommendIssues] = useState<
    { issue: Issue.Issue; score: number }[]
  >([]);

  const project = useProjectStore((state) => state.project);

  const { getDev, changeAssignee, recommendIssue } = IssueService();

  const loadOption = async () => {
    if (project) setUsers(await getDev(project.id));
  };

  const loadRecomend = async () => {
    setRecommendIssues(await recommendIssue(issue.id));
  };

  useEffect(() => {
    loadOption();
    //loadRecomend();
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
      <Title>이슈 담당 개발자 설정</Title>
      <SelectInput
        options={options}
        onChange={handleSelectChange}
        placeholder="프로젝트 담당자 설정 선택"
      />
      <Title>개발자 추천</Title>
      <AssigneeSuggestionBox>
        <AssigneeSuggestionContainer>
          {recommendIssues.map((issue) => (
            <Element>
              <span
                style={{
                  width: "73px",
                  marginLeft: "6px",
                  display: "flex",
                  justifyContent: "center",
                }}
              >
                {issue.issue.assignee
                  ? issue.issue.assignee.name
                  : "개발자 없음"}
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
                {issue.issue.title}
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
