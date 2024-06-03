import { useEffect, useState, useRef } from "react";
import { useForm, SubmitHandler } from "react-hook-form";
import styled from "@emotion/styled";

import Button from "@mui/material/Button";
import BackspaceIcon from "@mui/icons-material/Backspace";

import { GrayBackground, SelectInput, StatusMessage } from "@/entities";
import { AccountService, useAccountStore, ProjectService } from "@/shared";

export const CreateProject = ({ onClose }: { onClose: () => void }) => {
  const { handleSubmit, register } = useForm<Project.ProjectCreateFrom>();
  const [message, setMessage] = useState<false | string>(false);

  const [members, setMembers] = useState<number[]>([]);
  const [options, setOptions] = useState<
    {
      value: number;
      label: string;
    }[]
  >([]);

  const includePl = useRef(false);

  const users = useAccountStore((state) => state.accounts);
  const { loadAllAccountList } = AccountService();
  const { addProject } = ProjectService();

  useEffect(() => {
    loadAllAccountList();
  }, []);

  useEffect(() => {
    const newOptions: {
      value: number;
      label: string;
    }[] = [];

    if (includePl.current)
      users.map((user) => {
        if (user.role !== "PL")
          newOptions.push({
            value: user.id,
            label: `${user.name} [${user.role}] [${user.id}]`,
          });
      });
    else
      users.map((user) => {
        newOptions.push({
          value: user.id,
          label: `${user.name} [${user.role}] [${user.id}]`,
        });
      });

    setOptions(newOptions);
  }, [users, includePl.current]);

  const onSubmit: SubmitHandler<Project.ProjectCreateFrom> = (data) => {
    if (!data.name) {
      setMessage("모든 정보를 입력해주세요.");
      return;
    }

    addProject({ name: data.name, memberIds: members });

    onClose();
  };

  const handleSelectChange = (value: number | string) => {
    if (
      options
        .find((option) => `${option.value}` === value)
        ?.label.includes("PL")
    )
      includePl.current = true;
    if (members.findIndex((member) => `${member}` === value) === -1) {
      const newMembers = [...members];
      newMembers.push(`${value}`.match(/\d+/g)!.map(Number)[0]);
      setMembers(newMembers);
    }
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
        <Title>프로젝트 생성</Title>
        <Input placeholder="프로젝트 이름" {...register("name")} />
        <SelectInput
          options={options}
          onChange={handleSelectChange}
          placeholder="프로젝트 담당자 설정 선택"
        />
        <MemberBox>
          <MemberContainer>
            {members.map((id, index) => {
              const user = users.find((user) => user.id === id);
              return (
                <div key={id}>
                  {user ? (
                    <Member>
                      {`${user.name} (${user.role})`}
                      <MemberDelete
                        onClick={() => {
                          if (user.role === "PL") includePl.current = false;
                          const newMembers = [...members];
                          newMembers.splice(index, 1);
                          setMembers(newMembers);
                        }}
                      />
                    </Member>
                  ) : null}
                </div>
              );
            })}
          </MemberContainer>
        </MemberBox>

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

  margin-bottom: -8px;
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

const MemberBox = styled.div`
  position: relative;
  background-color: white;

  width: 80%;
  height: 170px;
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

  width: 330px;
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

const StyleButton = styled(Button)`
  font-size: 17px;
  font-weight: bold;
  width: 82%;
  height: 50px;

  background-color: #2528c7;

  border: 0px;

  box-shadow: 0px 5px 0 -0.5px black;

  margin-top: 20px;
  margin-bottom: 5px;

  transition: opacity 1s linear;

  :hover {
    background-color: #2528c7;

    border: 0px;

    box-shadow: 0 0 0 0 black;
    margin-top: 25px;
    margin-bottom: 0px;

    transition: 0s;
  }
`;
