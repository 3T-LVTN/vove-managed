import {ModelUseCases} from "@front-end/application/usecases/model";

export class ModelController {
  constructor(private readonly modelUsecases: ModelUseCases) {
  }

  async uploadFile(file: File) {
    await this.modelUsecases.uploadFile(file)
      .catch((err) => {
        throw new Error(err);
      });
  }
}
