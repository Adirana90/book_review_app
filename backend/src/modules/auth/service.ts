import { comparePassword, generateToken, hashPassword } from "../../utils/auth";
import { APIError } from "../../utils/error";
import { UserModel } from "./model";
import { TuserLoginSchema, TuserRegisterSchema } from "./validation";

export async function createUserservice(input: TuserRegisterSchema) {
  const { email, username, password } = input;

  const user = await UserModel.findOne({ email });
  if (user) {
    throw APIError.conflict("user email already exist");
  }

  const hashedPassword = await hashPassword(password);

  const newUser = new UserModel({
    email,
    username,
    password: hashedPassword,
  });
  await newUser.save();

  return newUser;
}

export async function loginService(input: TuserLoginSchema) {
  const { email, password } = input;
  const user = await UserModel.findOne({ email });
  if (!user) {
    throw APIError.unauthorized("Invalid username or password");
  }

  const isMatch = await comparePassword(password, user.password);
  if (!isMatch) {
    throw APIError.unauthorized("Invalid username or password");
  }
  const token = generateToken({
    id: user._id.toString(),
    username: user.username,
    email: user.email,
  });

  return {
    user: {
      id: user._id.toString(),
      username: user.username,
      email: user.email,
    },
    token,
  };
}

export async function getUserById(id: string) {
  const user = await UserModel.findById(id);
  if (!user) {
    throw APIError.notFound("User not found");
  }

  return user;
}
