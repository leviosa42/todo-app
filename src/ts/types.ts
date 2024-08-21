export type TodoItemModelOptions = {
  id: string;
  title: string;
  createdAt: Date;
  updatedAt: Date | null;
  completedAt: Date | null;
  deadlineAt: Date;
};

export type OnUpdate = (
  { id, title, completedAt }: {
    id: string;
    title?: string;
    completedAt?: Date | null;
  },
) => void;

export type OnDelete = ({ id }: { id: string }) => void;
