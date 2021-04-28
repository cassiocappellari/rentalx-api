import { Request, Response, NextFunction } from "express";
import { verify } from "jsonwebtoken";

import { AppError } from "../errors/AppError";
import { UsersRepository } from "../modules/accounts/repositories/implementations/UsersRepository";

interface ITokenPayload {
  sub: string;
}

export async function ensureAuthenticated(
  req: Request,
  res: Response,
  next: NextFunction
): Promise<void> {
  const authHeader = req.headers.authorization;

  if (!authHeader) {
    throw new AppError("token not found", 401);
  }

  const [, token] = authHeader.split(" ");

  try {
    const { sub: userId } = verify(
      token,
      "f5168c53a45ceac1025d45790ff22ab3"
    ) as ITokenPayload;

    const usersRepository = new UsersRepository();
    const user = await usersRepository.findById(userId);

    if (!user) {
      throw new AppError("user not found", 401);
    }

    next();
  } catch {
    throw new AppError("invalid token", 401);
  }
}
