import {ModelUseCases} from "@front-end/application/usecases/model";
import {ModelRepository} from "@front-end/application/repositories/model";

export class ModelInteractors implements ModelUseCases {
  constructor(private readonly modelRepository: ModelRepository) {
  }

  async uploadFile(file: File): Promise<void> {
    await this.modelRepository.uploadFile(file)
      .catch((error) => {
        throw new Error(error);
      });
  }
}
