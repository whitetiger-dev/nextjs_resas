import { useDispatch } from 'react-redux';
import axios from 'axios';
import { PopulationSlice } from '@/store/populationSlice';
import { populationURL, prefectureURL } from '@/constants';

axios.defaults.headers.common['X-API-KEY'] =
  process.env.NEXT_PUBLIC_RESAS_API_KEY;

export default function useResas() {
  const dispatch = useDispatch();

  const loadPrefectures = () => {
    dispatch(PopulationSlice.actions.setLoading());
    axios
      .get(prefectureURL)
      .then((res) => {
        const payload = { data: res.data };
        dispatch(PopulationSlice.actions.loadPrefectures(payload));
      })
      .catch((err) => {
        dispatch(PopulationSlice.actions.showError(err));
      });
  };

  const loadPopulation = (prefCode: number) => {
    dispatch(PopulationSlice.actions.setLoading());
    axios
      .get(populationURL + prefCode)
      .then((res) => {
        const payload = { data: res.data, prefCode };
        dispatch(PopulationSlice.actions.loadPopulation(payload));
      })
      .catch((err) => {
        dispatch(PopulationSlice.actions.showError(err));
      });
  };

  const removePopulation = (prefCode: number) => {
    dispatch(PopulationSlice.actions.removePopulation(prefCode));
  };

  const setGeneration = (generation: string) => {
    dispatch(PopulationSlice.actions.setGeneration(generation));
  };

  return {
    loadPrefectures,
    loadPopulation,
    removePopulation,
  };
}
