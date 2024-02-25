import React, { ReactNode } from 'react';
import { render, cleanup } from '@testing-library/react';
import { Provider } from 'react-redux';
import { store } from '../../store';

import Select from './index';
import { generationList } from '../../constants/index';

// コンポーネントをラップするモックストアを準備する関数
const renderWithProvider = (component: ReactNode) => {
  return { ...render(<Provider store={store}>{component}</Provider>), store };
};

describe('Select Component', () => {
  afterEach(cleanup);

  it('適切にレンダリングされます', () => {
    const { getByRole } = renderWithProvider(<Select />);
    expect(getByRole('combobox')).toBeInTheDocument();
  });

  it('正しい初期値をレンダリングします', () => {
    const { getByRole } = renderWithProvider(<Select />);
    const select = getByRole('combobox') as HTMLSelectElement;
    expect(select.value).toBe(generationList[0]);
  });
});
