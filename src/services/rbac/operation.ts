class Operation {
  [name: string]: number;
}

export const operation: Operation = {
  none: 0,
  create: 1,
  read: 2,
  update: 3,
  delete: 4,
};

export const crud = {
  create: operation.create,
  read: operation.read,
  update: operation.update,
  delete: operation.delete,
};
