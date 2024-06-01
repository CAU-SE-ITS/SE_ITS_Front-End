declare namespace Issue {
  //Var
  export interface Issue {
    id: number;
    title: string;
    description: string;
    priority: Priority;
    state: State;
    reporter: User.User;
    reporterDate: string;
    fixer: User.User | undefined;
    assignee: User.User | undefined;
    comments: Comment[];
  }

  export type Priority = "BLOCKER" | "CRITICAL" | "MAJOR" | "MINOR" | "TRIVIAL";

  export type State = "NEW" | "ASSIGNED" | "RESOLVED" | "CLOSED" | "REOPENED";

  export interface Comment {
    id: number;
    member: User.User;
    content: string;
  }

  //Form
  export interface CreateIssueForm {
    title: string;
    description: string;
  }

  //Store
  export interface IssueStore extends Issue {
    setIssue: (issue: Issue) => void;
    setState: (newState: State) => void;
    setPriority: (priority: Priority) => void;
    setReporter: (user: User) => void;
    setAssignee: (user: User) => void;
    addComment: (comment: Comment) => void;
    deleteComment: (id: number) => void;
  }
}
