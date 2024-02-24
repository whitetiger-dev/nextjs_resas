import { useEffect } from 'react';
import useResas from '@/utils/useResas';

export default function Home() {
  const { loadPrefectures } = useResas();

  useEffect(() => {
    loadPrefectures();
  }, [loadPrefectures]);

  return <main></main>;
}
