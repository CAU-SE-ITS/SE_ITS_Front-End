import { useState, useEffect } from "react";

import { useNavigate } from "react-router";

import { ScrollArea, Element, CreateProject } from "@/entities";
import { ProjectService, useProjectStore, PAGE_URL } from "@/shared";

export const Projects = () => {
  const [onCreate, setOnCreate] = useState(false);
  const navigate = useNavigate();

  const projects = useProjectStore((state) => state.projects);
  const { loadAllProjectList } = ProjectService();

  useEffect(() => {
    loadAllProjectList();
  }, []);

  return (
    <>
      {onCreate && (
        <CreateProject
          onClose={() => {
            setOnCreate(false);
          }}
        />
      )}

      <ScrollArea
        title="프로젝트"
        createClick={() => {
          setOnCreate(true);
        }}
      >
        {projects.map((project) => (
          <Element
            key={project.id}
            onClick={() => {
              navigate(PAGE_URL.Project, { state: { id: project.id } });
            }}
          >
            {`${project.name} [${project.id}]`}
          </Element>
        ))}
      </ScrollArea>
    </>
  );
};
