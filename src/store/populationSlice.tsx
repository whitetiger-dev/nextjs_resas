import { createSlice } from '@reduxjs/toolkit';
import { PopulationState } from '@/constants/types';
import { generationList } from '@/constants';

// 初期状態を設定します
const initialState: PopulationState = {
  prefectures: [],
  populationInfos: [],
  isLoading: false,
  generation: generationList[0],
  error: '',
};

export const populationSlice = createSlice({
  name: 'population',
  initialState,
  reducers: {
    // 読み込み状態を設定します。エラー状態もリセットします。
    setLoading(state) {
      state.isLoading = true;
      state.error = '';
    },

    // 都道府県のデータをロードします。読み込み状態も更新します。
    loadPrefectures(state, action) {
      state.prefectures = action.payload;
      state.isLoading = false;
    },

    // 人口情報をロードします。読み込み状態も更新します。
    loadPopulation(state, action) {
      state.populationInfos.push(action.payload);
      state.isLoading = false;
    },

    // 指定の都道府県コードの人口情報を削除します。
    removePopulation(state, action) {
      state.populationInfos = state.populationInfos.filter(
        (item) => item.prefCode !== action.payload,
      );
    },

    // 世代情報を設定します。読み込み状態も更新します。
    setGeneration(state, action) {
      state.generation = action.payload;
      state.isLoading = false;
    },

    // エラーメッセージを設定します。読み込み状態も更新します。
    showError(state, action) {
      state.isLoading = false;
      state.error = action.payload.message;
    },
  },
});

export const populationReducer = populationSlice.reducer;
