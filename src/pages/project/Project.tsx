import { useState, useEffect } from "react";

import { useNavigate, useLocation } from "react-router";

import { ScrollArea, Element, CreateIssue, Container } from "@/entities";
import { ProjectService, useProjectStore, PAGE_URL } from "@/shared";

const Project = () => {
  const location = useLocation();
  const [onCreate, setOnCreate] = useState(false);

  const project = useProjectStore((state) => state.project);
  const setProject = useProjectStore((state) => state.setProject);
  const { loadProject } = ProjectService();

  useEffect(() => {
    //loadProject(location.state.id);
    setProject({
      name: "걸작",
      id: 1,
      issue: [],
      members: [],
    });
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
        {project &&
          project.issue.map((issue) => (
            <Element key={project.id} onClick={() => {}}>
              {`${issue.title} [${issue.id}] [${issue.state}/${issue.priority}]`}
            </Element>
          ))}
      </ScrollArea>
    </Container>
  );
};

export default Project;
