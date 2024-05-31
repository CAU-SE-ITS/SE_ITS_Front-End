import { create } from "zustand";

export const useProjectStore = create<Project.ProjectStore>((set) => ({
  projects: [],

  setProjects: (projects) => {
    set(() => ({ projects: projects }));
  },

  addProject: (project) => {
    set((state) => {
      state.projects.push(project);

      return {};
    });
  },

  setProjectMember: (id, user, type) => {
    set((state) => {
      const project = state.projects.find((project) => project.id === id);

      if (type === "ADD") project?.members.push(user);
      else if (type === "DELETE")
        project?.members.splice(
          project?.members.findIndex((member) => member.id === user.id),
          1
        );

      return {};
    });
  },

  deleteProject: (id: number) => {
    set((state) => {
      const projectIndex = state.projects.findIndex(
        (project) => project.id === id
      );

      if (projectIndex !== -1) state.projects.splice(projectIndex, 1);

      return {};
    });
  },
}));
