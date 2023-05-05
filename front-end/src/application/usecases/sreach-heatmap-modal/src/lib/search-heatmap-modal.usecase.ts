import {SearchHeatmapModal} from "@front-end/domain/entities/sreach-heatmap-modal";

export interface SearchHeatmapModalUsecase {
  getSearchHeatmapModal(): SearchHeatmapModal;
  setSearchHeatmapModal(isModalOpened: boolean): void;
}
