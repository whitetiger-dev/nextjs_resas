import { useEffect } from 'react';
import { useSelector } from 'react-redux';
import useResas from '@/utils/useResas';
import { selectPopulation } from '@/store';
import CheckBox from '@/components/PrefectureBox';
import Spinner from '@/components/Spinner';
import styles from './style.module.scss';
import Select from '@/components/GenerationSelect';
import Chart from '@/components/Chart';

export default function Home() {
  const { loadPrefectures, loadPopulation, removePopulation } = useResas();
  const { error, prefectures, isLoading } = useSelector(selectPopulation);

  // エラーがある場合、アラートを表示します。
  useEffect(() => {
    if (error) {
      alert(error);
    }
  }, [error]);

  // コンポーネントがマウントされたときに都道府県をロードします。
  useEffect(() => {
    loadPrefectures();
  }, [loadPrefectures]);

  // チェック状態が変更されたときに呼び出される関数をハンドルします。
  const handleCheck = (code: number, checked: boolean) => {
    if (checked) {
      loadPopulation(code);
    } else {
      removePopulation(code);
    }
  };

  return (
    <main className={styles.main}>
      <title>人口統計資料</title>

      <div className={styles.header}>
        <h1>人口統計資料</h1>
      </div>

      <div>
        <h2 className={styles.sectionTitle}>都道府県</h2>
        <div className={styles.prefectureContainer}>
          {prefectures.map((item) => (
            <CheckBox
              name={item.prefName}
              prefCode={item.prefCode}
              onChange={handleCheck}
              key={item.prefName}
            />
          ))}
        </div>
      </div>

      <div className={styles.generationContainer}>
        年齢: <Select />
      </div>

      <div>
        <Chart />
      </div>

      {isLoading && <Spinner />}
    </main>
  );
}
