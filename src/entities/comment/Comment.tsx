import styled from "@emotion/styled";
import ModeEditIcon from "@mui/icons-material/ModeEdit";
import { useState } from "react";

import { CreateComment } from "./CreateComment";

import { useUserStore } from "@/shared";

export const Comment = ({
  id,
  writer,
  content,
}: {
  id: number;
  writer: User.User;
  content: string;
}) => {
  const [onEdit, setOnEdit] = useState(false);
  const userId = useUserStore((state) => state.userId);

  return (
    <Container>
      {onEdit && (
        <CreateComment
          onClose={() => {
            setOnEdit(false);
          }}
          edit={id}
        />
      )}

      {userId === writer.id ? (
        <EditButton
          onClick={() => {
            setOnEdit(true);
          }}
        />
      ) : null}
      <Writer>{writer.role === "ADMIN" ? "시스템" : writer.name}</Writer>
      <Content>{content}</Content>
    </Container>
  );
};

const EditButton = styled(ModeEditIcon)`
  position: absolute;
  font-size: 23px;

  top: 13.5px;
  right: 6px;

  color: white;
`;

const Container = styled.div`
  position: relative;
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
`;

const Writer = styled.div`
  width: 430px;
  margin: 7px 0px 1px 0px;

  background-color: #656565;
  border-radius: 2px;

  height: 30px;

  font-size: 15px;
  font-weight: bold;
  color: white;

  margin-top: 10px;
  margin-bottom: 3px;

  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: row;
`;

const Content = styled.div`
  width: 420px;

  background-color: #eaeaea;
  border-radius: 2px;
  border: 5px solid #eaeaea;

  font-size: 14px;
  font-weight: bold;

  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: row;
`;
