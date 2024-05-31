import { useState, useEffect } from "react";

import { ScrollArea, Element, CreateProject } from "@/entities";

import { ProjectService, useProjectStore } from "@/shared";

export const Projects = () => {
  const [onCreate, setOnCreate] = useState(false);
  const projects = useProjectStore((state) => state.projects);
  const { loadAllProjectList } = ProjectService();

  useEffect(() => {
    //loadAllProjectList();
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
        title="프로젝트 관리"
        createClick={() => {
          setOnCreate(true);
        }}
      >
        {projects.map((project) => (
          <Element key={project.id} onClick={() => {}}>
            {`${project.name} [${project.id}]`}
          </Element>
        ))}
      </ScrollArea>
    </>
  );
};
