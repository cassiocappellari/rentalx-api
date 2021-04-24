import { inject, injectable } from "tsyringe";

import { ICreateUserDTO } from "../../dtos/ICreateUserDTO";
import { IUsersRepository } from "../../repositories/IUsersRepository";

@injectable()
class CreateUserUseCase {
  constructor(
    @inject("UsersRepository")
    private usersRepository: IUsersRepository
  ) {}

  async execute({
    name,
    password,
    email,
    drive_license,
  }: ICreateUserDTO): Promise<void> {
    await this.usersRepository.create({
      name,
      password,
      email,
      drive_license,
    });
  }
}

export { CreateUserUseCase };
