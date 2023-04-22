import {SearchHeatmapModalUsecase} from "@front-end/application/usecases/sreach-heatmap-modal";
import {SearchHeatmapModalRepository} from "@front-end/application/repositories/sreach-heatmap-modal";
import {SearchHeatmapModal} from "@front-end/domain/entities/sreach-heatmap-modal";

export class SearchHeatmapModalInteractor implements SearchHeatmapModalUsecase {
  constructor(
    private readonly SearchHeatmapModalRepository: SearchHeatmapModalRepository
  ) {}

  getSearchHeatmapModal(): SearchHeatmapModal {
    return this.SearchHeatmapModalRepository.get();
  }

  setSearchHeatmapModal(isModalOpened: boolean): void {
    this.SearchHeatmapModalRepository.set(isModalOpened);
  }
}
