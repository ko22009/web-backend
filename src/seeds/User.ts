const bcrypt = require("bcryptjs");

const user = () => {
  const login = "admin";
  const password = "admin";
  const hashedPassword = bcrypt.hashSync(password, 12);
  return {
    model: "User",
    documents: [
      {
        login: login,
        password: hashedPassword,
        is_admin: true,
      },
    ],
  };
};

export default user();
