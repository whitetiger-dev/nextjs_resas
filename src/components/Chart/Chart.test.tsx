import React, { ReactNode } from 'react';
import { render, cleanup } from '@testing-library/react';
import { Provider } from 'react-redux';
import { store } from '../../store';

import Chart from './index';

// コンポーネントをラップするモックストアを準備する関数
const renderWithProvider = (component: ReactNode) => {
  return { ...render(<Provider store={store}>{component}</Provider>), store };
};

describe('Chart Component', () => {
  afterEach(cleanup);

  it('適切にレンダリングされます', () => {
    const { getByText } = renderWithProvider(<Chart />);
    expect(getByText('人口統計資料')).toBeInTheDocument();
  });
});
