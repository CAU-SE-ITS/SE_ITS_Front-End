import { AxiosResponse } from "axios";
import { useNavigate } from "react-router";

import { API } from "@/shared/configs/axios";

import { useIssueStore, useProjectStore, PAGE_URL } from "@/shared";

export const IssueService = () => {
  const navigate = useNavigate();

  const URL = "api/v1/issue";
  const COMMENTURL = "api/v1/comment";
  const MEMBERURL = "api/v1/member/account/project/role";

  const setIssue = useIssueStore((state) => state.setIssue);
  const setComment = useIssueStore((state) => state.setComment);
  const setStatus = useIssueStore((state) => state.setStatus);
  const setPriority = useIssueStore((state) => state.setPriority);
  const setAssignee = useIssueStore((state) => state.setAssignee);
  //const setReporter = useIssueStore((state) => state.setReporter);
  const addComment = useIssueStore((state) => state.addComment);
  const deleteComment = useIssueStore((state) => state.deleteComment);
  const updateComment = useIssueStore((state) => state.updateComment);
  const assignee = useIssueStore((state) => state.assignee);

  const addUserIssue = useProjectStore((state) => state.addUserIssue);
  const project = useProjectStore((state) => state.project);

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

  const getComment = async (id: number) => {
    const { data } = (await API.get(
      `${COMMENTURL}?issueId=${id}`
    )) as AxiosResponse<Issue.Comment[]>;

    setComment(data);
  };

  const getTester = async (id: number) => {
    const { data } = (await API.get(
      `${MEMBERURL}?projectId=${id}&role=TESTER`
    )) as AxiosResponse<User.User[]>;

    return data;
  };

  const createIssue = async (body: {
    title: string;
    description: string;
    projectId: number;
    category: string;
  }) => {
    const { data } = (await API.post(
      `${URL}/create`,
      body
    )) as AxiosResponse<Issue.Issue>;

    addUserIssue(data);
  };

  const updataIssue = async (body: {
    issueId: number;
    description: string;
    status: Issue.Status;
    priority: Issue.Priority;
  }) => {
    const { data } = (await API.put(
      `${URL}/update`,
      body
    )) as AxiosResponse<Issue.Issue>;

    setIssue(data);
  };

  const updataIssueDev = async (body: {
    issueId: number;
    status: Issue.Status;
  }) => {
    const { data } = (await API.put(
      `${URL}/update/dev`,
      body
    )) as AxiosResponse<Issue.Issue>;

    console.log(data);

    setIssue(data);
  };

  const deleteIssue = async (id: number) => {
    await API.put(`${URL}/deleteRequest/delete`, { issueId: id });

    if (project) navigate(PAGE_URL.Project, { state: { id: project.id } });
  };

  const requestDeleteIssue = async (id: number) => {
    await API.put(`${URL}/deleteRequest`, { issueId: id });

    setStatus("DELETE_REQUEST");
  };

  const changeAssignee = async (id: number, userId: number) => {
    const { data } = (await API.put(
      assignee ? `${URL}/reassign` : `${URL}/assign`,
      {
        issueId: id,
        assigneeId: userId,
      }
    )) as AxiosResponse<Issue.Issue>;

    console.log(data);

    setIssue(data);
  };

  const createComment = async (id: number, content: string) => {
    const { data } = (await API.post(`${COMMENTURL}/create`, {
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
      `${URL}/issueRecommend?issueId=${id}`
    )) as AxiosResponse<{ issueResponseDto: Issue.Issue; score: number }[]>;

    return data;
  };

  return {
    loadIssue,
    getDev,
    getTester,
    createIssue,
    updataIssue,
    updataIssueDev,
    deleteIssue,
    requestDeleteIssue,
    changeAssignee,
    createComment,
    changeComment,
    removeComment,
    recommendIssue,
    getComment,
  };
};
