import { create } from 'zustand';
import { SearchHeatmapModal } from "@front-end/domain/entities/sreach-heatmap-modal";
import {SearchHeatmapModalRepository} from "@front-end/application/repositories/sreach-heatmap-modal";

const store = create<SearchHeatmapModal>(() => ({
  isModalOpened: false
}));

export class SearchHeatmapModalGlobalState
  implements SearchHeatmapModalRepository
{
  get(): SearchHeatmapModal {
    return store();
  }
  set(isModalOpened: boolean): void {
    store.setState({isModalOpened: isModalOpened})
  }
}
