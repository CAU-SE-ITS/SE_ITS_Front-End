import { AxiosResponse } from "axios";

import { API } from "@/shared/configs/axios";

import { useIssueStore } from "@/shared";

export const IssueService = () => {
  const URL = "api/v1/issue";

  const setIssue = useIssueStore((state) => state.setIssue);
  const setState = useIssueStore((state) => state.setState);
  const setPriority = useIssueStore((state) => state.setReporter);
  const setAssignee = useIssueStore((state) => state.setAssignee);
  const setReporter = useIssueStore((state) => state.setReporter);
  const addComment = useIssueStore((state) => state.addComment);
  const deleteComment = useIssueStore((state) => state.deleteComment);

  /*   const loadIssue = async () => {
    const { data } = (await API.get(`${URL}`)) as AxiosResponse<Issue.Issue>;

    setIssue(data);
  };

  const changeAssignee = async (id); */

  return {};
};
