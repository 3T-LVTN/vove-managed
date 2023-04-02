import { render, screen } from '@testing-library/react';
import { act } from 'react-dom/test-utils';

import PageNotFound from './page-not-found';

describe('Dashboard', () => {
  it('should render successfully', async () => {
    await act(async () => {
      const { baseElement } = render(<PageNotFound />);
      expect(baseElement).toBeTruthy();
    });
  });
});
