export interface Prefecture {
  prefCode: number;
  prefName: string;
}

export interface PopulationState {
  prefectures: Prefecture[];
  isLoading: boolean;
  error: string;
  generation: string;
  populationInfos: PopulationInfo[];
}

export interface PopulationInfo {
  prefCode: number;
  data: Array<{
    label: string;
    data: {
      year: number;
      value: number;
    };
  }>;
}
