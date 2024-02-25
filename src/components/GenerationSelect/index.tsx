import { generationList } from '@/constants';
import useResas from '../../utils/useResas';
import { useSelector } from 'react-redux';
import { selectPopulation } from '@/store';
import styles from './style.module.scss';

const Select: React.FC = () => {
  const { setGeneration } = useResas();
  const { generation } = useSelector(selectPopulation);

  const handleChange = (e: React.FormEvent<HTMLSelectElement>) => {
    setGeneration(e.currentTarget.value);
  };

  return (
    <select
      className={styles.select}
      value={generation}
      onChange={handleChange}
    >
      {generationList.map((item, index) => (
        <option value={item} key={index}>
          {item}
        </option>
      ))}
    </select>
  );
};

export default Select;
