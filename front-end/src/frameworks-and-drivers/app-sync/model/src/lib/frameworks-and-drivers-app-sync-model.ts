import {axios} from "@front-end/frameworks-and-drivers/app-sync/axios";
import {ModelRepository} from "@front-end/application/repositories/model";

export class ModelApi implements ModelRepository {
  async uploadFile(file: File): Promise<void> {
    const formData = new FormData();
    formData.append("file", file);
    formData.append("fileName", file.name);
    formData.append("delimiter", ",");
    await axios.post("/upload", formData, {
      headers: {
        "Content-Type": "multipart/form-data"
      }
    })
      .catch((error) => {
        throw new Error(error);
      });
  }
}
