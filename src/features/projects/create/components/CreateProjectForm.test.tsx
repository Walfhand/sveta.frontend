// src/features/projects/create/components/CreateProjectForm.test.tsx

import { render, screen, waitFor } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { describe, it, expect, vi } from "vitest"; // Fonctions de Vitest
import CreateProjectForm, { ProjectFormData } from "./CreateProjectForm"; // Le composant à tester

// On utilise 'describe' pour grouper les tests liés à ce composant
describe("CreateProjectForm", () => {
  // Test simple pour vérifier que le formulaire s'affiche correctement
  it("should render the form fields and submit button", () => {
    // Arrange: Préparer le test
    const mockSubmit = vi.fn(); // Crée un "mock" de la fonction onSubmit
    render(<CreateProjectForm onSubmit={mockSubmit} isLoading={false} />);

    // Act & Assert: Agir et vérifier
    // Vérifier que les labels/inputs existent (on cherche par label ou placeholder)
    expect(screen.getByLabelText(/Nom du projet/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/Desciption/i)).toBeInTheDocument();
    // On peut aussi chercher par rôle (plus robuste)
    expect(
      screen.getByRole("textbox", { name: /Nom du projet/i })
    ).toBeInTheDocument();
    expect(
      screen.getByRole("textbox", { name: /Desciption/i })
    ).toBeInTheDocument();
    expect(
      screen.getByRole("button", { name: /Créer le projet/i })
    ).toBeInTheDocument();
  });

  // Test de la saisie et de la soumission
  it("should call onSubmit with form data when submitted", async () => {
    // Arrange
    const user = userEvent.setup(); // Initialiser user-event
    const mockSubmit = vi.fn();
    render(<CreateProjectForm onSubmit={mockSubmit} isLoading={false} />);

    const nameInput = screen.getByRole("textbox", { name: /Nom du projet/i });
    const descriptionInput = screen.getByRole("textbox", {
      name: /Desciption/i,
    });
    const submitButton = screen.getByRole("button", {
      name: /Créer le projet/i,
    });

    const testData: ProjectFormData = {
      name: "Mon Projet Test",
      description: "Une description de test",
      githubUrl: "", // Le champ github n'est pas rendu dans cet exemple, donc vide
    };

    // Act: Simuler la saisie utilisateur
    await user.type(nameInput, testData.name!);
    await user.type(descriptionInput, testData.description!);

    // Vérifier que les champs ont bien la valeur saisie
    expect(nameInput).toHaveValue(testData.name);
    expect(descriptionInput).toHaveValue(testData.description);

    // Simuler le clic sur le bouton de soumission
    await user.click(submitButton);

    // Assert: Vérifier que la fonction mockée onSubmit a été appelée
    // 'waitFor' est parfois utile si la soumission déclenche des mises à jour asynchrones
    await waitFor(() => {
      expect(mockSubmit).toHaveBeenCalledTimes(1);
      // Vérifier qu'elle a été appelée avec les bonnes données
      expect(mockSubmit).toHaveBeenCalledWith(testData);
    });
  });

  // Test de l'état de chargement
  it("should disable the submit button when isLoading is true", () => {
    // Arrange
    const mockSubmit = vi.fn();
    render(<CreateProjectForm onSubmit={mockSubmit} isLoading={true} />); // isLoading = true

    // Act & Assert
    const submitButton = screen.getByRole("button", {
      name: /Création en cours \.\.\./i,
    }); // Le texte change
    expect(submitButton).toBeInTheDocument();
    expect(submitButton).toBeDisabled(); // Le bouton doit être désactivé
  });

  // Optionnel : Test de validation (si vous aviez des règles plus strictes dans Zod)
  // Exemple : si le nom était requis avec min 3 caractères
  /*
  it('should show validation error if name is too short', async () => {
    const user = userEvent.setup();
    const mockSubmit = vi.fn();
    render(<CreateProjectForm onSubmit={mockSubmit} isLoading={false} />);

    const nameInput = screen.getByRole('textbox', { name: /Nom du projet/i });
    const submitButton = screen.getByRole('button', { name: /Créer le projet/i });

    await user.type(nameInput, 'ab'); // Saisir un nom trop court
    await user.click(submitButton); // Tenter de soumettre

    // Assert: Vérifier qu'un message d'erreur s'affiche
    // La méthode exacte dépend de comment FormMessage est implémenté
    // screen.findByText est asynchrone car l'erreur peut apparaître après validation
    expect(await screen.findByText(/Le nom doit contenir au moins 3 caractères/i)).toBeInTheDocument();

    // Vérifier que onSubmit n'a PAS été appelé
    expect(mockSubmit).not.toHaveBeenCalled();
  });
  */
});
