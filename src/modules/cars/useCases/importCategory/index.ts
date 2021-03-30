import { ImportCategoryController } from "./ImportCategoryController";
import { ImportCategoryUseCase } from "./ImportCategoryUseCase";

const importCategoriesUseCase = new ImportCategoryUseCase();
const importCategoryController = new ImportCategoryController(
  importCategoriesUseCase
);

export { importCategoryController };
