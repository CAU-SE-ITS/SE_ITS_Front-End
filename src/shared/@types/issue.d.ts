declare namespace Issue {
  //Var
  export interface Issue {
    id: number;
    title: string;
    description: string;
    priority: Priority;
    category: string;
    status: Status;
    reporter: User.User;
    reportedDate: string;
    fixer: User.User | undefined;
    assignee: User.User | undefined;
    comments: Comment[];
  }

  export type Priority = "BLOCKER" | "CRITICAL" | "MAJOR" | "MINOR" | "TRIVIAL";

  export type Status =
    | "NEW"
    | "ASSIGNED"
    | "RESOLVED"
    | "CLOSED"
    | "REOPENED"
    | "DELETE_REQUEST";

  export interface Comment {
    id: number;
    writer: User.User;
    content: string;
  }

  //Form
  export interface CreateIssueForm {
    title: string;
    category: string;
    description: string;
  }

  //Store
  export interface IssueStore extends Issue {
    setIssue: (issue: Issue) => void;
    setComment: (comments: Comment[]) => void;
    setStatus: (newStatus: Status) => void;
    setPriority: (priority: Priority) => void;
    setReporter: (user: User) => void;
    setAssignee: (user: User) => void;
    addComment: (comment: Comment) => void;
    deleteComment: (id: number) => void;
    updateComment: (id: number, content: string) => void;
  }
}
