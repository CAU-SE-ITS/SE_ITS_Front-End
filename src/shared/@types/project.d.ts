declare namespace Project {
  //DTO
  //Var
  export type Project = {
    name: string;
    id: number;
    issue: Issue[];
    members: User.User[];
  };

  export interface Issue {
    id: number;
  }
  //Form
  //Store
  export interface ProjectStore {
    projects: Project[];
    setProjects: (projects: LoadAccountListResDto) => void;
    addProject: (project: Project) => void;
    setProjectMember: (id: number, user: User, type: "DELETE" | "ADD") => void;
    deleteProject: (id: number) => void;
  }
}
