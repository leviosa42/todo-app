export declare type Todo = {
  id: number;
  title: string;
  createdAt: Date;
  updatedAt: Date | null;
  completedAt: Date | null;
  deadlineAt: Date | null;
  removedAt: Date | null;
};

export function isTodo(value: unknown): value is Todo {
  return (
    typeof value === "object" &&
    value !== null &&
    "id" in value && typeof (value?.id) === "number" &&
    "title" in value && typeof (value?.title) === "string" &&
    "createdAt" in value && value?.createdAt instanceof Date &&
    "updatedAt" in value && (value?.updatedAt === null || value?.updatedAt instanceof Date) &&
    "completedAt" in value && (value?.completedAt === null || value?.completedAt instanceof Date) &&
    "deadlineAt" in value && (value?.deadlineAt === null || value?.deadlineAt instanceof Date) &&
    "removedAt" in value && (value?.removedAt === null || value?.removedAt instanceof Date)
  );
}
