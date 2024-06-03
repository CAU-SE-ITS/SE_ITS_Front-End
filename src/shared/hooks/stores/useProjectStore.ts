import { create } from "zustand";
import { immer } from "zustand/middleware/immer";

export const useProjectStore = create<Project.ProjectStore>()(
  immer((set) => ({
    projects: [],
    project: false,
    userIssues: [],

    setProjects: (projects) => {
      set(() => ({ projects: projects }));
    },

    setProject: (project) => {
      set(() => ({
        project: project,
      }));
    },

    setProjectIssues: (data: Issue.Issue[]) => {
      set((state) => {
        if (state.project) state.project.issues = data;
      });
    },

    addProject: (project) => {
      set((state) => {
        state.projects.push(project);
      });
    },

    setProjectMember: (id, user, type) => {
      set((state) => {
        if (type === "ADD" && state.project) state.project.members.push(user);
        else if (type === "DELETE" && state.project)
          state.project.members.splice(
            state.project.members.findIndex((member) => member.id === user.id),
            1
          );
      });
    },

    deleteProject: (id: number) => {
      set((state) => {
        const projectIndex = state.projects.findIndex(
          (project) => project.id === id
        );

        if (projectIndex !== -1) state.projects.splice(projectIndex, 1);
      });
    },

    setUserIssue: (data) => {
      set((state) => {
        state.userIssues = data;
      });
    },

    addUserIssue: (data) => {
      set((state) => {
        if (state.project) state.project.issues.push(data);
        state.userIssues.push(data);
      });
    },
  }))
);
