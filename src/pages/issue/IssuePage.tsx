import { useState, useEffect } from "react";

import { useNavigate, useLocation } from "react-router";

import {
  ScrollArea,
  Element,
  CreateComment,
  Container,
  ProjectControl,
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

      <ScrollArea
        title="댓글"
        createClick={() => {
          setOnCreate(true);
        }}
      >
        {project &&
          project.issues.map((issue) => (
            <Element key={project.id} onClick={() => {}}>
              {`${issue.title} [${issue.id}] [${issue.state}/${issue.priority}]`}
            </Element>
          ))}
      </ScrollArea>
      <ProjectControl />
    </Container>
  );
};

export default IssuePage;
