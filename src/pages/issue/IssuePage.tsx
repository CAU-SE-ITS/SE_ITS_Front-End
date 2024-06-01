import { useState, useEffect } from "react";

import { useNavigate, useLocation } from "react-router";

import {
  ScrollArea,
  Element,
  Comment,
  CreateComment,
  Container,
  AssigneeControl,
  IssueControl,
} from "@/entities";
import { ProjectService, useProjectStore, PAGE_URL } from "@/shared";

const IssuePage = () => {
  const [onCreate, setOnCreate] = useState(false);

  const project = useProjectStore((state) => state.project);
  const setProject = useProjectStore((state) => state.setProject);
  const { loadProject } = ProjectService();

  useEffect(() => {
    //loadProject(location.state.id);
  }, []);

  return (
    <Container>
      {onCreate && (
        <CreateComment
          onClose={() => {
            setOnCreate(false);
          }}
        />
      )}

      <IssueControl />
      <ScrollArea
        title="댓글"
        createClick={() => {
          setOnCreate(true);
        }}
      >
        <Comment
          writer="강민규"
          content="댓글댓글댓글댓글댓글댓글댓글댓글댓글댓글댓글댓글댓글댓글댓글댓글댓글댓글댓글댓글댓글댓글댓글댓글댓글댓글댓글댓글댓글댓글댓글댓글댓글댓글댓글댓글댓글댓글댓글댓글댓글댓글댓글댓글댓글댓글댓글댓글댓글댓글댓글댓글댓글댓글댓글댓글"
        />
        <Comment writer="강민규" content="댓글" />
      </ScrollArea>
      <AssigneeControl />
    </Container>
  );
};

export default IssuePage;
