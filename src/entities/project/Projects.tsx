import { useState } from "react";

import { ScrollArea, Element, CreateProject } from "@/entities";

export const Projects = () => {
  const [onCreate, setOnCreate] = useState(false);

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
        <Element></Element>
        <Element></Element>
        <Element></Element>
        <Element></Element>
        <Element></Element>
        <Element></Element>
        <Element></Element>
        <Element></Element>
        <Element></Element>
        <Element></Element>
        <Element></Element>
        <Element></Element>
      </ScrollArea>
    </>
  );
};
