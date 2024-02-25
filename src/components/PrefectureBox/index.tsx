import { useSelector } from 'react-redux';
import { useState, useCallback } from 'react';
import styles from './style.module.scss';
import classNames from 'classnames';
import { selectPopulation } from '@/store';

interface Props {
  name: string;
  prefCode: number;
  onChange: (prefCode: number, checked: boolean) => void;
}

const CheckBox: React.FC<Props> = ({ name, onChange, prefCode }) => {
  const { isLoading } = useSelector(selectPopulation);
  const [checked, setChecked] = useState(false);

  // useCallbackでメモ化して不要な再描画を防ぎます
  const handleChange = useCallback(() => {
    if (!isLoading) {
      setChecked((prevState) => !prevState);
      onChange(prefCode, !checked);
    }
  }, [onChange, prefCode, isLoading, checked]);

  return (
    <div
      className={classNames({
        [styles.container]: true,
        [styles.active]: checked,
      })}
    >
      <input
        type="checkbox"
        checked={checked}
        id={name}
        onChange={handleChange}
      />
      <label htmlFor={name}>{name}</label>
    </div>
  );
};

export default CheckBox;
