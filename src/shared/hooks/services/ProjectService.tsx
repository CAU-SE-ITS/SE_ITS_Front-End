import { AxiosResponse } from "axios";
import { useNavigate } from "react-router";

import { API } from "@/shared/configs/axios";

import { PAGE_URL, useProjectStore } from "@/shared";

export const ProjectService = () => {
  const URL = "api/v1/project";
  const ISSUEURL = "api/v1/issue";

  const setProjects = useProjectStore((state) => state.setProjects);
  const setProject = useProjectStore((state) => state.setProject);
  const setAddProject = useProjectStore((state) => state.addProject);
  const setSetProjectMember = useProjectStore(
    (state) => state.setProjectMember
  );
  const setDeleteProject = useProjectStore((state) => state.deleteProject);
  const setProjectIssues = useProjectStore((state) => state.setProjectIssues);
  const setUserIssues = useProjectStore((state) => state.setUserIssue);

  const navigate = useNavigate();

  const loadAllProjectList = async () => {
    const { data } = (await API.get(
      `${URL}`
    )) as AxiosResponse<Project.LoadAccountListResDto>;

    setProjects(data);
  };

  const loadProject = async (id: number) => {
    const { data } = (await API.get(
      `${URL}/${id}`
    )) as AxiosResponse<Project.Project>;

    setProject(data);
  };

  const loadUserIssues = async (id: number, role: "DEV" | "TESTER") => {
    const { data } = (await API.get(
      `${ISSUEURL}/${id}/${role === "DEV" ? "dev" : "tester"}`
    )) as AxiosResponse<Issue.Issue[]>;

    setUserIssues(data);
  };

  const searchIssue = async (
    category: string,
    projectId: number,
    keyword: string
  ) => {
    const { data } = (await API.get(
      `${ISSUEURL}/search?category=${category}&projectId=${projectId}&keyword=${keyword}`
    )) as AxiosResponse<Issue.Issue[]>;

    setProjectIssues(data);
  };

  const addProject = async (body: { name: string; memberIds: number[] }) => {
    const { data } = (await API.post(
      `${URL}/create`,
      body
    )) as AxiosResponse<Project.Project>;

    setAddProject(data);
  };

  const setProjectMember = async (
    id: number,
    user: User.User,
    type: "DELETE" | "ADD"
  ) => {
    if (type === "DELETE") {
      await API.put(`${URL}/${id}/member/delete`, {
        removeMemberId: user.id,
      });
    } else {
      await API.put(`${URL}/${id}/member/add`, {
        addMemberId: user.id,
      });
    }

    setSetProjectMember(id, user, type);
  };

  const deleteProject = async (id: number) => {
    await API.put(`${URL}/${id}`);

    setDeleteProject(id);

    navigate(PAGE_URL.Setting);
  };

  return {
    loadAllProjectList,
    loadProject,
    searchIssue,
    addProject,
    setProjectMember,
    deleteProject,
    loadUserIssues,
  };
};
