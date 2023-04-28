import {SearchHeatmapModalUsecase} from "@front-end/application/usecases/sreach-heatmap-modal";
import {SearchHeatmapModalViewModel} from "@front-end/interface-adapters/view-models/sreach-heatmap-modal";

export class SearchHeatmapModalController {
  constructor(
    private readonly searchHeatmapModalUsecase: SearchHeatmapModalUsecase
  ) {}

  getSearchHeatmapModalViewModel(): SearchHeatmapModalViewModel {
    return {
      isModalOpened: this.isModalOpened
    }
  }

  setIsModalOpened(isModalOpened: boolean) {
    this.searchHeatmapModalUsecase.setSearchHeatmapModal(isModalOpened);
  }
  get isModalOpened(): boolean {
    return this.searchHeatmapModalUsecase.getSearchHeatmapModal().isModalOpened;
  }
}
