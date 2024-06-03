import { AxiosResponse } from "axios";

import { API } from "@/shared/configs/axios";

import { useIssueStore, useProjectStore } from "@/shared";

export const IssueService = () => {
  const URL = "api/v1/issue";
  const MEMBERURL = "api/v1/member/account/project/role";

  const setIssue = useIssueStore((state) => state.setIssue);

  const setState = useIssueStore((state) => state.setState);
  const setPriority = useIssueStore((state) => state.setReporter);
  const setAssignee = useIssueStore((state) => state.setAssignee);
  const setReporter = useIssueStore((state) => state.setReporter);
  const addComment = useIssueStore((state) => state.addComment);
  const deleteComment = useIssueStore((state) => state.deleteComment);

  const loadIssue = async (id: number) => {
    const { data } = (await API.get(
      `${URL}?issueId=${id}`
    )) as AxiosResponse<Issue.Issue>;

    console.log(data);

    setIssue(data);
  };

  const getDev = async (id: number) => {
    const { data } = (await API.get(
      `{MEMBERURL}?projectId=${id}&role=DEV`
    )) as AxiosResponse<User.User[]>;

    return data;
  };

  const getTester = async (id: number) => {
    const { data } = (await API.get(
      `{MEMBERURL}?projectId=${id}&role=TESTER`
    )) as AxiosResponse<User.User[]>;

    return data;
  };

  /*   cconst changeAssignee = async (id); */

  return { loadIssue, getDev, getTester };
};
