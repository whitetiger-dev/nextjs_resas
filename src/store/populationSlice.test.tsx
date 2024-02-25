import { UnknownAction } from '@reduxjs/toolkit';
import { populationSlice, populationReducer } from './populationSlice';
import { generationList } from '@/constants';

describe('populationSlice', () => {
  // 初期状態定義
  const initialState = {
    prefectures: [],
    populationInfos: [],
    isLoading: false,
    generation: generationList[0],
    error: '',
  };

  it('初期状態を返します', () => {
    expect(populationReducer(undefined, {} as UnknownAction)).toEqual(
      initialState,
    );
  });

  it('setLoading アクションが正しく状態を更新します', () => {
    const expectedState = {
      ...initialState,
      isLoading: true,
      error: '',
    };
    expect(
      populationReducer(initialState, populationSlice.actions.setLoading()),
    ).toEqual(expectedState);
  });

  it('loadPrefectures アクションが正しく状態を更新します', () => {
    const payload = ['dummy prefecture'];
    const expectedState = {
      ...initialState,
      prefectures: payload,
      isLoading: false,
    };
    expect(
      populationReducer(
        initialState,
        populationSlice.actions.loadPrefectures(payload),
      ),
    ).toEqual(expectedState);
  });

  it('loadPopulation アクションが正しく状態を更新します', () => {
    const payload = { data: 'dummy data', prefCode: 1 };
    const expectedState = {
      ...initialState,
      populationInfos: [payload],
      isLoading: false,
    };
    expect(
      populationReducer(
        initialState,
        populationSlice.actions.loadPopulation(payload),
      ),
    ).toEqual(expectedState);
  });

  it('removePopulation アクションが正しく状態を更新します', () => {
    const initialStatePop = {
      ...initialState,
      populationInfos: [{ data: [], prefCode: 1 }],
    };
    const expectedState = {
      ...initialState,
      populationInfos: [],
    };
    expect(
      populationReducer(
        initialStatePop,
        populationSlice.actions.removePopulation(1),
      ),
    ).toEqual(expectedState);
  });

  it('setGeneration アクションが正しく状態を更新します', () => {
    const payload = 'dummy generation';
    const expectedState = {
      ...initialState,
      generation: payload,
      isLoading: false,
    };
    expect(
      populationReducer(
        initialState,
        populationSlice.actions.setGeneration(payload),
      ),
    ).toEqual(expectedState);
  });

  it('showError アクションが正しく状態を更新します', () => {
    const error = new Error('An error occurred!');
    const expectedState = {
      ...initialState,
      isLoading: false,
      error: error.message,
    };
    expect(
      populationReducer(initialState, populationSlice.actions.showError(error)),
    ).toEqual(expectedState);
  });
});
