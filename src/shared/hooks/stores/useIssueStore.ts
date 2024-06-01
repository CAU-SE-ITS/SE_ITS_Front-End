import { create } from "zustand";
import { immer } from "zustand/middleware/immer";

export const useIssueStore = create<Issue.IssueStore>()(
  immer((set) => ({
    /* id: -1,
    title: "",
    description: "",
    priority: "MAJOR",
    state: "NEW",
    reporter: { id: -1, name: "", role: "DEV" },
    reporterDate: "",
    fixer: undefined,
    assignee: undefined,
    comments: [], */

    id: 0,
    title: "테스트 이슈",
    description:
      "테스트를 하기 위함 이슈 테스트를 하기 위함 이슈 테스트를 하기 위함 이슈 테스트를 하기 위함 이슈테스트를 하기 위함 이슈 테스트를 하기 위함 이슈 테스트를 하기 위함 이슈 테스트를 하기 위함 이슈 테스트를 하기 위함 이슈",
    priority: "MAJOR",
    state: "NEW",
    reporter: { id: 0, name: "강민규", role: "DEV" },
    reporterDate: "2024-06-01T19:19:47.514Z",
    fixer: undefined,
    assignee: { id: 0, name: "강민규", role: "TESTER" },
    comments: [
      {
        id: 0,
        member: {
          id: 0,
          name: "강민규",
          role: "TESTER",
        },
        content:
          "댓글댓글댓글댓글댓글댓글댓글댓글댓글댓글댓글댓글댓글댓글댓글댓글댓글댓글댓글댓글댓글댓글댓글댓글댓글댓글댓글댓글댓글댓글댓글댓글댓글댓글댓글댓글댓글댓글댓글댓글댓글댓글댓글댓글댓글댓글댓글댓글댓글댓글댓글댓글댓글댓글댓글댓글",
      },
    ],

    setIssue: (issue) => {
      set(() => ({ ...issue }));
    },

    setState: (newState: Issue.State) => {
      set((state) => {
        state.state = newState;
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
