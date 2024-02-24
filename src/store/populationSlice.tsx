import { createSlice } from '@reduxjs/toolkit';

import { PopulationState } from '@/constants/types';
import { generationList } from '@/constants';

const initialState: PopulationState = {
  prefectures: [],
  populationInfos: [],
  isLoading: false,
  generation: generationList[0],
  error: '',
};

export const PopulationSlice = createSlice({
  name: 'populationReducer',
  initialState,
  reducers: {
    setLoading(state) {
      state.isLoading = true;
      state.error = '';
    },
    loadPrefectures(state, action) {
      state.prefectures = action.payload;
      state.isLoading = false;
    },
    loadPopulation(state, action) {
      state.populationInfos.push(action.payload);
      state.isLoading = false;
    },
    removePopulation(state, action) {
      const newInfos = state.populationInfos.filter(
        (item) => item.prefCode !== action.payload,
      );
      state.populationInfos = newInfos;
    },
    setGeneration(state, action) {
      state.generation = action.payload;
      state.isLoading = false;
    },
    showError(state, action) {
      state.isLoading = false;
      state.error = action.payload.message;
      alert(state.error);
    },
  },
});

export const populationReducer = PopulationSlice.reducer;
