declare namespace Project {
  //DTO
  export type LoadAccountListResDto = Project[];
  //Var
  export interface Project {
    name: string;
    id: number;
    issue: Issue[];
    members: User.User[];
  }

  export interface Issue {
    id: number;
  }

  //Form
  export interface ProjectCreateFrom {
    name: string;
  }

  //Store
  export interface ProjectStore {
    projects: Project[];
    setProjects: (projects: LoadAccountListResDto) => void;
    addProject: (project: Project) => void;
    setProjectMember: (
      id: number,
      user: User.User,
      type: "DELETE" | "ADD"
    ) => void;
    deleteProject: (id: number) => void;
  }
}
