import { z } from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";

const projectSchema = z.object({
  name: z.string().optional(),
  description: z.string().optional(),
  githubUrl: z.string().optional(),
});

export type ProjectFormData = z.infer<typeof projectSchema>;

interface CreateProjectFormProps {
  onSubmit: (data: ProjectFormData) => void;
  isLoading: boolean;
}

export default function CreateProjectForm({
  onSubmit,
  isLoading,
}: CreateProjectFormProps) {
  const form = useForm<ProjectFormData>({
    resolver: zodResolver(projectSchema),
    defaultValues: {
      name: "",
      description: "",
      githubUrl: "",
    },
  });

  const handleSubmit = (data: ProjectFormData) => {
    onSubmit(data);
  };

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(handleSubmit)} className="space-y-8">
        <FormField
          control={form.control}
          name="name"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Nom du projet</FormLabel>
              <FormControl>
                <Input placeholder="Mon super projet" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="description"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Desciption</FormLabel>
              <FormControl>
                <Input placeholder="Une superbe description" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <Button type="submit" disabled={isLoading}>
          {isLoading ? "Création en cours ..." : "Créer le projet"}
        </Button>
      </form>
    </Form>
  );
}
