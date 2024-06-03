import { useEffect, useState } from "react";
import styled from "@emotion/styled";

import Button from "@mui/material/Button";
import BackspaceIcon from "@mui/icons-material/Backspace";

import { SelectInput, SmallScrollArea, StatusMessage } from "@/entities";
import {
  useUserStore,
  AccountService,
  useAccountStore,
  ProjectService,
  useProjectStore,
} from "@/shared";

export const ProjectControl = () => {
  const [options, setOptions] = useState<
    {
      value: number;
      label: string;
    }[]
  >([]);
  const [message, setMessage] = useState<false | string>(false);

  const isAdmin = useUserStore((state) => state.isAdmin);
  const users = useAccountStore((state) => state.accounts);
  const project = useProjectStore((state) => state.project);
  const { loadAllAccountList } = AccountService();
  const { setProjectMember, deleteProject } = ProjectService();

  useEffect(() => {
    loadAllAccountList();
  }, []);

  useEffect(() => {
    const newOptions: {
      value: number;
      label: string;
    }[] = [];
    users.map((user) => {
      if (user.role !== "PL" && user.role !== "ADMIN")
        newOptions.push({
          value: user.id,
          label: `${user.name} (${user.role})`,
        });
    });
    setOptions(newOptions);
  }, [users]);

  const handleSelectChange = (value: number | string) => {
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
    <SmallScrollArea title="프로젝트 설정">
      {message ? (
        <StatusMessage
          message={message}
          setMessage={setMessage}
          duration={2000}
        />
      ) : null}
      <Title>프로젝트 담당자 설정</Title>
      <SelectInput
        options={options}
        onChange={handleSelectChange}
        placeholder="프로젝트 담당자 설정 선택"
      />
      <MemberBox>
        <MemberContainer>
          {project
            ? project.members.map((member) => {
                return (
                  <div key={member.id}>
                    <Member>
                      {`${member.name} [${member.role}] [${member.id}]`}
                      {member.role !== "PL" ? (
                        <MemberDelete
                          onClick={() => {
                            onDelete(member.id);
                          }}
                        />
                      ) : null}
                    </Member>
                  </div>
                );
              })
            : null}
        </MemberContainer>
      </MemberBox>

      {isAdmin() ? (
        <>
          <Title>프로젝트 삭제</Title>
          <DeleteButton
            onClick={() => {
              if (project) deleteProject(project.id);
            }}
          >
            삭제하기
          </DeleteButton>
        </>
      ) : null}
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
