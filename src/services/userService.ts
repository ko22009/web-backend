const User = require("@/models/User");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

const userService = {
  register: async (login: string, password: string) => {
    const hashedPassword = await bcrypt.hash(password, 12);
    const user = new User({ login, password: hashedPassword });
    return await user.save(function (err: any, user: any) {
      return err ?? user;
    });
  },
  login: async (login: string, password: string) => {
    const user = await User.findOne({ login });
    let status = 400;
    let message: Object = {
      error: "Не корректный логин или пароль",
    };
    if (user) {
      const isMatch = await bcrypt.compare(password, user.password);
      if (isMatch) {
        const token = jwt.sign(
          {
            userId: user.id,
          },
          process.env.JWT_SECRET,
          {
            expiresIn: "24h",
          }
        );
        status = 200;
        message = {
          token,
        };
      }
    }
    return {
      status: status,
      message: message,
    };
  },
};

export default userService;
