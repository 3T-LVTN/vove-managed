export interface ModelRepository {
  uploadFile(file: File): Promise<void>;
}
