import { create } from "zustand";
import { immer } from "zustand/middleware/immer";

export const useIssueStore = create<Issue.IssueStore>()(
  immer((set) => ({
    id: -1,
    title: "",
    description: "",
    priority: "MAJOR",
    state: "NEW",
    reporter: { id: -1, name: "", role: "DEV" },
    reporterDate: "",
    fixed: undefined,
    assignee: undefined,
    comments: [],

    setIssue: (issue) => {
      set(() => ({ ...issue }));
    },

    setState: (newState: Issue.State) => {
      set((state) => {
        state.state = newState;
      });
    },

    setPriority: (priority) => {
      set((state) => {
        state.priority = priority;
      });
    },

    addComment: (comment) => {
      set((state) => {
        state.comments.push(comment);
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
  }))
);
