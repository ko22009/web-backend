import { User } from "@/models/User";

const bcrypt = require("bcryptjs");

export interface FoundUser {
  id: string;
}

export function isFoundUser(message: any): message is FoundUser {
  return (message as FoundUser).id != undefined;
}

const userService = {
  register: async (login: string, password: string) => {
    const hashedPassword = await bcrypt.hash(password, 12);
    const user = new User({ login, password: hashedPassword });
    const res = await user.save();
    return {
      status: 200,
      message: res,
    };
  },
  login: async (login: string, password: string) => {
    const user = await User.findOne({ login }).exec();
    const isMatch = await bcrypt.compare(password, user?.password);
    let response: RResponse = {
      status: 200,
      message: {
        id: user?._id,
      },
    };
    if (!user || !isMatch) {
      response = {
        status: 400,
        message: "Login or password is not correct",
      };
    }
    return response;
  },
};

export default userService;
