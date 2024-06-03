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
import {
  useUserStore,
  ProjectService,
  useProjectStore,
  PAGE_URL,
} from "@/shared";

const ProjectPage = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const [onCreate, setOnCreate] = useState(false);

  const project = useProjectStore((state) => state.project);
  const setProject = useProjectStore((state) => state.setProject);
  const userIssues = useProjectStore((state) => state.userIssues);
  const { loadProject, loadUserIssues } = ProjectService();

  const userState = useUserStore((state) => state);

  useEffect(() => {
    loadProject(location.state.id);
    if (userState.isDev() || userState.isTester())
      loadUserIssues(location.state.id, userState.role as "DEV" | "TESTER");
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
        createClick={
          userState.isTester()
            ? () => {
                setOnCreate(true);
              }
            : undefined
        }
      >
        <SearchIssue />
        {project &&
          project.issues.map((issue) => (
            <Element
              key={issue.id}
              onClick={() => {
                navigate(PAGE_URL.Issue, { state: { id: issue.id } });
              }}
            >
              {`${issue.title} [${issue.status}/${issue.priority}] [${
                issue.assignee ? issue.assignee.name : "담당자 없음"
              }]`}
            </Element>
          ))}
      </ScrollArea>
      {userState.isDev() || userState.isTester() ? (
        <ScrollArea title="담당 이슈">
          {project &&
            userIssues.map((issue) => (
              <Element
                key={issue.id}
                onClick={() => {
                  navigate(PAGE_URL.Issue, { state: { id: issue.id } });
                }}
              >
                {`${issue.title} [${issue.status}/${issue.priority}] [${
                  issue.assignee ? issue.assignee.name : "담당자 없음"
                }]`}
              </Element>
            ))}
        </ScrollArea>
      ) : null}
      {userState.isAdmin() || userState.isPl() ? <ProjectControl /> : null}
    </Container>
  );
};

export default ProjectPage;
