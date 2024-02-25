import { render, screen } from '@testing-library/react';
import Spinner from './index';

describe('Spinner コンポーネント', () => {
  it('Spinner が正しくレンダリングされます', () => {
    render(<Spinner />);
    const spinnerElement = screen.getByTestId('spinner');
    expect(spinnerElement).toBeInTheDocument();
  });
});
