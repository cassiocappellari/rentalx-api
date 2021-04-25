import { compare } from "bcrypt";
import { sign } from "jsonwebtoken";
import { inject, injectable } from "tsyringe";

import { IUsersRepository } from "../../repositories/IUsersRepository";

interface IRequest {
  email: string;
  password: string;
}

interface IResponse {
  user: {
    name: string;
    email: string;
  };
  token: string;
}

@injectable()
class AuthUserUseCase {
  constructor(
    @inject("UsersRepository")
    private usersRepository: IUsersRepository
  ) {}

  async execute({ email, password }: IRequest): Promise<IResponse> {
    const user = await this.usersRepository.findByEmail(email);

    if (!user) {
      throw new Error("user not found");
    }

    const checkPassword = await compare(password, user.password);

    if (!checkPassword) {
      throw new Error("invalid password");
    }

    const token = sign({}, "f5168c53a45ceac1025d45790ff22ab3", {
      subject: user.id,
      expiresIn: "1d",
    });

    const userData: IResponse = {
      user: {
        name: user.name,
        email: user.email,
      },
      token,
    };

    return userData;
  }
}

export { AuthUserUseCase };
