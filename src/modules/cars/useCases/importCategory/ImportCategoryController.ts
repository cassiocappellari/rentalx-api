import { Request, Response } from "express";
import { container } from "tsyringe";

import { ImportCategoryUseCase } from "./ImportCategoryUseCase";

class ImportCategoryController {
  async handle(req: Request, res: Response): Promise<Response> {
    const { file } = req;

    const importCategoriesUseCases = container.resolve(ImportCategoryUseCase);

    await importCategoriesUseCases.execute(file);

    return res.send();
  }
}

export { ImportCategoryController };
