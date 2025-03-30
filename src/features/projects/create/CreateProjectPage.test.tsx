// src/features/projects/create/CreateProjectPage.test.tsx

import { render, screen } from "@testing-library/react";
import { describe, it, expect, vi, beforeEach } from "vitest";
import CreateProjectPage from "./CreateProjectPage";
import { CreateProject } from "../services/Api/projectApi";
import { ProjectFormData } from "./components/CreateProjectForm";
import { Project } from "../types";
import userEvent from "@testing-library/user-event";

vi.mock("../services/Api/projectApi", () => ({
  CreateProject: vi.fn(),
}));

let mockFormProps: {
  onSubmit: (data: ProjectFormData) => void;
  isLoading: boolean;
};
vi.mock("./components/CreateProjectForm", () => ({
  default: vi.fn((props) => {
    mockFormProps = props;
    const simulateSubmit = () => {
      props.onSubmit({ name: "Mock Data", description: "", githubUrl: "" });
    };
    return (
      <div data-testid="mock-create-project-form">
        <span>Loading: {mockFormProps.isLoading.toString()}</span>
        <button
          data-testid="mock-submit-button"
          onClick={simulateSubmit}
          disabled={mockFormProps.isLoading}
        >
          Mock Submit
        </button>
      </div>
    );
  }),
}));

describe("CreateProjectPage", () => {
  const mockedCreateProject = vi.mocked(CreateProject);

  beforeEach(() => {
    vi.clearAllMocks();
    mockedCreateProject.mockResolvedValue({ id: "mock-project-id" } as Project);
  });

  it("should render the CreateProjectForm", () => {
    render(<CreateProjectPage />);
    expect(screen.getByTestId("mock-create-project-form")).toBeInTheDocument();
    expect(screen.getByText("Loading: false")).toBeInTheDocument();
    expect(screen.getByTestId("mock-submit-button")).toBeInTheDocument();
  });

  it("should update isLoading state during form submission", async () => {
    const user = userEvent.setup();
    render(<CreateProjectPage />);

    let resolvePromise!: (value: Project) => void;
    const pendingPromise = new Promise((resolve) => {
      resolvePromise = resolve;
    });

    mockedCreateProject.mockReturnValue(pendingPromise as Promise<Project>);

    expect(screen.getByText("Loading: false")).toBeInTheDocument();

    await user.click(screen.getByTestId("mock-submit-button"));

    expect(screen.getByText("Loading: true")).toBeInTheDocument();

    resolvePromise({ id: "mock-project-id" } as Project);

    await screen.findByText("Loading: false");

    expect(screen.getByText("Loading: false")).toBeInTheDocument();

    expect(mockedCreateProject).toHaveBeenCalledTimes(1);
    expect(mockedCreateProject).toHaveBeenCalledWith({
      name: "Mock Data",
      description: "",
      githubUrl: "",
    });
  });
});
