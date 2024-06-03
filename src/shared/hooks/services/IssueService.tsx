import { AxiosResponse } from "axios";

import { API } from "@/shared/configs/axios";

import { useIssueStore, useProjectStore } from "@/shared";

export const IssueService = () => {
  const URL = "api/v1/issue";
  const COMMENTURL = "api/v1/comment";
  const MEMBERURL = "api/v1/member/account/project/role";

  const setIssue = useIssueStore((state) => state.setIssue);

  const setStatus = useIssueStore((state) => state.setStatus);
  const setPriority = useIssueStore((state) => state.setReporter);
  const setAssignee = useIssueStore((state) => state.setAssignee);
  const setReporter = useIssueStore((state) => state.setReporter);
  const addComment = useIssueStore((state) => state.addComment);
  const deleteComment = useIssueStore((state) => state.deleteComment);
  const updateComment = useIssueStore((state) => state.updateComment);

  const loadIssue = async (id: number) => {
    const { data } = (await API.get(
      `${URL}?issueId=${id}`
    )) as AxiosResponse<Issue.Issue>;

    console.log(data);

    setIssue(data);
  };

  const getDev = async (id: number) => {
    const { data } = (await API.get(
      `${MEMBERURL}?projectId=${id}&role=DEV`
    )) as AxiosResponse<User.User[]>;

    return data;
  };

  const getTester = async (id: number) => {
    const { data } = (await API.get(
      `${MEMBERURL}?projectId=${id}&role=TESTER`
    )) as AxiosResponse<User.User[]>;

    return data;
  };

  const updataIssue = async (body: {
    issueId: number;
    description: string;
    status: Issue.Status;
    priority: Issue.Priority;
  }) => {
    await API.put(`${URL}/update`, body);

    setStatus(body.status);
    setPriority(body.priority);
  };

  const updataIssueDev = async (body: {
    issueId: number;
    status: Issue.Status;
  }) => {
    await API.put(`${URL}/update/dev`, body);

    setStatus(body.status);
  };

  const deleteIssue = async (id: number) => {
    await API.put(`${URL}/deleteRequest/delete`, { issueId: id });
  };

  const requestDeleteIssue = async (id: number) => {
    await API.put(`${URL}/deleteRequest`, { issueId: id });

    setStatus("DELETE_REQUEST");
  };

  const changeAssignee = async (id: number, userId: number) => {
    const { data } = (await API.put(`${URL}/reassign`, {
      issueId: id,
      assigneeId: userId,
    })) as AxiosResponse<Issue.Issue>;

    setAssignee(data.assignee);
  };

  const createComment = async (id: number, content: string) => {
    const { data } = (await API.put(`${COMMENTURL}/create`, {
      issueId: id,
      content: content,
    })) as AxiosResponse<Issue.Comment>;

    addComment(data);
  };

  const changeComment = async (id: number, content: string) => {
    const { data } = (await API.put(`${COMMENTURL}/update`, {
      commentId: id,
      content: content,
    })) as AxiosResponse<Issue.Comment>;

    updateComment(data.id, data.content);
  };

  const removeComment = async (id: number) => {
    const { data } = (await API.put(`${COMMENTURL}/delete`, {
      commentId: id,
    })) as AxiosResponse<Issue.Comment>;

    deleteComment(data.id);
  };

  const recommendIssue = async (id: number) => {
    const { data } = (await API.get(
      `${URL}/issueRecommend?${id}`
    )) as AxiosResponse<{ issue: Issue.Issue; score: number }[]>;

    return data;
  };

  return {
    loadIssue,
    getDev,
    getTester,
    updataIssue,
    updataIssueDev,
    deleteIssue,
    requestDeleteIssue,
    changeAssignee,
    createComment,
    changeComment,
    removeComment,
    recommendIssue,
  };
};
