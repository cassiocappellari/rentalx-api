import { Request, Response } from "express";

import { ImportCategoryUseCase } from "./ImportCategoryUseCase";

class ImportCategoryController {
  constructor(private importCategoriesUseCases: ImportCategoryUseCase) {}

  handle(req: Request, res: Response): Response {
    const { file } = req;

    this.importCategoriesUseCases.execute(file);

    return res.send();
  }
}

export { ImportCategoryController };
