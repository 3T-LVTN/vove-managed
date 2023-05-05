import { render, screen } from '@testing-library/react';
import { act } from 'react-dom/test-utils';

import Login from './login';

describe('Login', () => {
  it('should render successfully', async () => {
    await act(async () => {
      const { baseElement } = render(<Login />);
      expect(baseElement).toBeTruthy();
    });
    //
    // const email = screen.getByTestId('email');
    // expect(email.innerHTML).toContain('user email');
  });

  it.todo('should be able to login');
});
