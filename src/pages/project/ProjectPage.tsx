import { useState, useEffect } from "react";

import { useNavigate, useLocation } from "react-router";

import {
  ScrollArea,
  Element,
  CreateIssue,
  Container,
  ProjectControl,
  SearchIssue,
} from "@/entities";
import { ProjectService, useProjectStore, PAGE_URL } from "@/shared";

const ProjectPage = () => {
  const location = useLocation();
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
        <CreateIssue
          onClose={() => {
            setOnCreate(false);
          }}
        />
      )}
      <ScrollArea
        title="이슈"
        createClick={() => {
          setOnCreate(true);
        }}
      >
        <SearchIssue />
        {project &&
          project.issues.map((issue) => (
            <Element key={issue.id} onClick={() => {}}>
              {`${issue.title} [${issue.state}/${issue.priority}] [${issue.assignee?.name}]`}
            </Element>
          ))}
      </ScrollArea>
      <ProjectControl />
    </Container>
  );
};

export default ProjectPage;
