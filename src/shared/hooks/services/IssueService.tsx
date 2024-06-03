import { AxiosResponse } from "axios";

import { API } from "@/shared/configs/axios";

import { useIssueStore, useProjectStore } from "@/shared";

export const IssueService = () => {
  const URL = "api/v1/issue";

  const setIssue = useIssueStore((state) => state.setIssue);

  const setState = useIssueStore((state) => state.setState);
  const setPriority = useIssueStore((state) => state.setReporter);
  const setAssignee = useIssueStore((state) => state.setAssignee);
  const setReporter = useIssueStore((state) => state.setReporter);
  const addComment = useIssueStore((state) => state.addComment);
  const deleteComment = useIssueStore((state) => state.deleteComment);

  const loadIssue = async (id: number) => {
    const { data } = (await API.get(`${URL}`, {
      headers: { issueId: id },
    })) as AxiosResponse<Issue.Issue>;

    setIssue(data);
  };

  /*   cconst changeAssignee = async (id); */

  return { loadIssue };
};
