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

  const onDelete = (value: number) => {
    if (project)
      setProjectMember(
        project.id,
        project.members.find((member) => member.id === value)!,
        "DELETE"
      );
  };

  return (
    <SmallScrollArea title="이슈 담당 개발자 지정">
      <Title>현재 담당 개발자</Title>
      <Assignee>
        {issue.assignee
          ? `${issue.assignee.name} [${issue.assignee.role}] [${issue.assignee.id}] `
          : `현재 담당 개발자가 지정되어 있지 않습니다`}
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

const MemberBox = styled.div`
  position: relative;
  background-color: white;

  width: 80%;
  height: 200px;
  background-color: #5d5dff;
  border: 3.5px solid #5d5dff;

  margin-left: 15px;
  margin-right: 15px;
  margin-top: 10px;

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

const MemberContainer = styled.div`
  width: 100%;

  display: flex;
  align-items: center;
  flex-direction: column;
`;

const MemberDelete = styled(BackspaceIcon)`
  position: absolute;
  right: 10px;
`;

const Member = styled.div`
  position: relative;

  background-color: white;

  width: 290px;
  height: 40px;

  border-radius: 3px;

  margin-top: 8px;
  margin-bottom: 3px;

  color: #5d5dff;
  font-size: 16px;

  display: flex;
  align-items: center;
  justify-content: center;
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
