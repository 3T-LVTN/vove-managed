import {SearchHeatmapModal} from "@front-end/domain/entities/sreach-heatmap-modal";

export interface SearchHeatmapModalRepository {
  get(): SearchHeatmapModal;
  set(isModalOpened: boolean): void;
}
