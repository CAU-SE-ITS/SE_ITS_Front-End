import { create } from "zustand";
import { immer } from "zustand/middleware/immer";

export const useIssueStore = create<Issue.IssueStore>()(
  immer((set) => ({
    id: -1,
    title: "",
    description: "",
    category: "",
    priority: "MAJOR",
    status: "NEW",
    reporter: { id: -1, name: "", role: "DEV" },
    reportedDate: "",
    fixer: undefined,
    assignee: undefined,
    comments: [],

    setIssue: (issue) => {
      console.log(issue);
      set(() => ({
        id: issue.id,
        title: issue.title,
        description: issue.description,
        category: issue.category,
        priority: issue.priority,
        status: issue.status,
        reporter: issue.reporter,
        reportedDate: issue.reportedDate,
        fixer: issue.fixer,
        assignee: issue.assignee,
        comments: issue.comments,
      }));
    },

    setStatus: (newStatus) => {
      set((state) => {
        state.status = newStatus;
      });
    },

    setReporter: (user) => {
      set((state) => {
        state.reporter = user;
      });
    },

    setAssignee: (user) => {
      set((state) => {
        state.assignee = user;
      });
    },

    setPriority: (newPriority) => {
      set(() => ({
        priority: newPriority,
      }));
    },

    setComment: (comments) => {
      set((state) => {
        state.comments = comments;
      });
    },

    addComment: (comment) => {
      set((state) => {
        state.comments.unshift(comment);
      });
    },

    deleteComment: (id: number) => {
      set((state) => {
        state.comments.splice(
          state.comments.findIndex((comment) => comment.id === id),
          1
        );
      });
    },

    updateComment: (id: number, content: string) => {
      set((state) => {
        if (state.comments.find((comment) => comment.id === id))
          state.comments.find((comment) => comment.id === id)!.content =
            content;
      });
    },
  }))
);
