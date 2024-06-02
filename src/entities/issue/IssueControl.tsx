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

  const onDelete = (value: number) => {
    if (project)
      setProjectMember(
        project.id,
        project.members.find((member) => member.id === value)!,
        "DELETE"
      );
  };

  return (
    <SmallScrollArea title={`[${issue.title}] 이슈 정보`}>
      <DesriptionBox>
        <DescriptionrContainer>"{issue.description}"</DescriptionrContainer>
      </DesriptionBox>
      <State>
        <div>{issue.state}</div>
        <InnerSelectInput
          options={options}
          onChange={handleSelectChange}
          placeholder="이슈 상태 변경"
        />
      </State>
      <Priority>
        <div>{issue.priority}</div>
        <InnerSelectInput
          options={options}
          onChange={handleSelectChange}
          placeholder="이슈 우선순위 변경"
        />
      </Priority>

      <Title>프로젝트 담당자 설정</Title>
      <MemberBox>
        <MemberContainer>
          {project
            ? project.members.map((member) => {
                return (
                  <div key={member.id}>
                    <Member>
                      {`${member.name} [${member.role}] [${member.id}]`}
                      <MemberDelete
                        onClick={() => {
                          onDelete(member.id);
                        }}
                      />
                    </Member>
                  </div>
                );
              })
            : null}
        </MemberContainer>
      </MemberBox>
      <Title>프로젝트 삭제</Title>
      <DeleteButton>삭제하기</DeleteButton>
    </SmallScrollArea>
  );
};

const Title = styled.div`
  font-size: 23px;
  font-weight: bold;
  color: #2f3542;

  margin-top: 26px;
  margin-bottom: -10px;
`;

const DesriptionBox = styled.div`
  position: relative;

  width: 365px;
  height: 70px;
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
