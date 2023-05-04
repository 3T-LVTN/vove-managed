import { render } from '@testing-library/react';

import ApplicationRepositoriesTracking from './tracking.repositories';

describe('ApplicationRepositoriesTracking', () => {
  it('should render successfully', () => {
    const { baseElement } = render(<ApplicationRepositoriesTracking />);
    expect(baseElement).toBeTruthy();
  });
});
