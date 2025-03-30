import apiClient from "@/services/apiClient";
import { Project } from "../../types";
import { CreateProjectRequest } from "./requests";

export const CreateProject = async (
  request: CreateProjectRequest
): Promise<Project> => {
  const response = await apiClient.post<Project>("/projects", request);
  return response.data;
};
