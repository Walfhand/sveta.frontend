import { useState } from "react";
import CreateProjectForm, {
  ProjectFormData,
} from "./components/CreateProjectForm";
import { CreateProject } from "../services/Api/projectApi";
import { CreateProjectRequest } from "../services/Api/requests";

export default function CreateProjectPage() {
  const [isLoading, setIsLoading] = useState(false);

  const onSubmit = (formData: ProjectFormData) => {
    setIsLoading(true);
    const createProjectRequest = { ...formData } as CreateProjectRequest;
    CreateProject(createProjectRequest)
      .then((response) => {
        console.log("Project ID : ", response.id);
      })
      .finally(() => setIsLoading(false));
  };
  return <CreateProjectForm onSubmit={onSubmit} isLoading={isLoading} />;
}
