const User = require("@/models/User");
const bcrypt = require("bcryptjs");

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
    let message: any = {
      error: "Login or password is not correct",
    };
    if (user) {
      const isMatch = await bcrypt.compare(password, user.password);
      if (isMatch) {
        status = 200;
        message = {
          user_id: user._id,
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
