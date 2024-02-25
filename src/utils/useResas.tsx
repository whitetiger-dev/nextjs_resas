import { useCallback } from 'react';
import { useDispatch } from 'react-redux';
import axios from 'axios';
import { populationSlice } from '@/store/populationSlice';
import { populationURL, prefectureURL } from '@/constants';

axios.defaults.headers.common['X-API-KEY'] =
  process.env.NEXT_PUBLIC_RESAS_API_KEY;

export default function useResas() {
  const dispatch = useDispatch();

  // 都道府県をロードする関数
  const loadPrefectures = useCallback(() => {
    dispatch(populationSlice.actions.setLoading());
    axios
      .get(prefectureURL)
      .then((res) => {
        const payload = res.data.result;
        dispatch(populationSlice.actions.loadPrefectures(payload));
      })
      .catch((err) => {
        dispatch(populationSlice.actions.showError(err));
      });
  }, [dispatch]);

  // 人口をロードする関数
  const loadPopulation = useCallback(
    (prefCode: number) => {
      dispatch(populationSlice.actions.setLoading());
      axios
        .get(`${populationURL}${prefCode}`)
        .then((res) => {
          const payload = { data: res.data.result.data, prefCode };
          dispatch(populationSlice.actions.loadPopulation(payload));
        })
        .catch((err) => {
          dispatch(populationSlice.actions.showError(err));
        });
    },
    [dispatch],
  );

  // 人口情報を削除する関数
  const removePopulation = useCallback(
    (prefCode: number) => {
      dispatch(populationSlice.actions.removePopulation(prefCode));
    },
    [dispatch],
  );

  // 世代を設定する関数
  const setGeneration = useCallback(
    (generation: string) => {
      dispatch(populationSlice.actions.setGeneration(generation));
    },
    [dispatch],
  );

  return {
    loadPrefectures,
    loadPopulation,
    removePopulation,
    setGeneration,
  };
}
