declare namespace Issue {
  //Var
  export interface Issue {
    id: number;
    title: string;
    description: string;
    priority: "BLOCKER" | "CRITICAL" | "MAJOR" | "MINOR" | "TRIVIAL";
    state: "NEW" | "ASSIGNED" | "RESOLVED" | "CLOSED" | "REOPENED";
    reporter: User.User[];
    reporterDate: string;
    fixed: User.User[];
    assignee: User.USer[];
  }

  //Form
  export interface CreateIssueForm {
    title: string;
    description: string;
  }

  //Store
  export interface IssueStore extends Issue {
    setIssue: (issue: Issue) => void;
  }
}
