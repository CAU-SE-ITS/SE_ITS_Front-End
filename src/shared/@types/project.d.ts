declare namespace Project {
  //DTO
  export type LoadAccountListResDto = Project[];
  //Var
  export interface Project {
    name: string;
    id: number;
    issues: Issue.Issue[];
    members: User.User[];
  }

  //Form
  export interface ProjectCreateFrom {
    name: string;
  }

  //Store
  export interface ProjectStore {
    projects: Project[];
    project: Project | false;
    setProjects: (projects: LoadAccountListResDto) => void;
    setProject: (project: Project) => void;
    setProjectIssues: (data: Issue.Issue[]) => void;
    addProject: (project: Project) => void;
    setProjectMember: (
      id: number,
      user: User.User,
      type: "DELETE" | "ADD"
    ) => void;
    deleteProject: (id: number) => void;
  }
}
