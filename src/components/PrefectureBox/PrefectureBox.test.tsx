import { render, screen, fireEvent } from '@testing-library/react';
import { Provider } from 'react-redux';
import { store } from '../../store';
import CheckBox from './index';

describe('PrefectureBox component', () => {
  it('チェックボックスがクリックされるとonChangeイベントが発火されます', () => {
    // モック関数作成
    const onChange = jest.fn();

    // テスト対象のCheckBoxをレンダリング
    render(
      <Provider store={store}>
        <CheckBox name="Test Checkbox" onChange={onChange} prefCode={1} />
      </Provider>,
    );

    // チェックボックス取得とクリック
    const checkbox = screen.getByRole('checkbox');
    fireEvent.click(checkbox);

    // onChangeが正常に呼び出されているかチェック
    expect(onChange).toHaveBeenCalled();
  });
});
