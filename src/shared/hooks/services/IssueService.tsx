import { AxiosResponse } from "axios";

import { API } from "@/shared/configs/axios";

import { useProjectStore } from "@/shared";

export const IssueService = () => {
  const URL = "api/v1/issue";

  const setProjects = useProjectStore((state) => state.setProjects);
  const setProject = useProjectStore((state) => state.setProject);
  const setAddProject = useProjectStore((state) => state.addProject);
  const setSetProjectMember = useProjectStore(
    (state) => state.setProjectMember
  );
  const setDeleteProject = useProjectStore((state) => state.deleteProject);

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
    console.log(user);
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
  };

  return {
    loadAllProjectList,
    loadProject,
    addProject,
    setProjectMember,
    deleteProject,
  };
};