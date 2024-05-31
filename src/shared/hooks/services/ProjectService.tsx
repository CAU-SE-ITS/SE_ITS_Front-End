import { AxiosResponse } from "axios";

import { API } from "@/shared/configs/axios";

import { useProjectStore } from "@/shared";

export const ProjectService = () => {
  const URL = "api/v1/project";

  const setProjects = useProjectStore((state) => state.setProjects);
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

  const addProject = async (body: { name: string; members: number[] }) => {
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
        id: user.id,
      });
    } else {
      await API.put(`${URL}/${id}/member/add`, {
        id: user.id,
      });
    }

    setSetProjectMember(id, user, type);
  };

  const deleteProject = async (id: number) => {
    await API.put(`${URL}/delete`, {
      id: id,
    });

    setDeleteProject(id);
  };

  return { loadAllProjectList, addProject, setProjectMember, deleteProject };
};
