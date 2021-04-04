const roleUser = {
  name: "user",
  parent: null,
  permissions: [
    {
      section: "user",
      operations: ["create", "read", "update"],
    },
  ],
};

const roleManager = {
  name: "manager",
  parent: "user",
  permissions: [
    {
      section: "user",
      operations: ["create", "read", "update", "delete"],
      interact: {
        with_user_id: [1],
      },
    },
    {
      section: "user",
      operations: ["create", "read", "update"],
      interact: {
        with_user_id: [2, 3],
      },
    },
  ],
};

// по отношению кому эти операции работают?
