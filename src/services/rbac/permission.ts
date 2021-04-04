import { operation } from "@/services/rbac/operation";

export const permission = {
  user: {
    create: operation.create,
    read: operation.read,
    update: operation.update,
  },
  role: operation.crud,
};
