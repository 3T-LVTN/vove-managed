import { render } from '@testing-library/react';

import ApplicationUsecasesTracking from './tracking.usecases';

describe('ApplicationUsecasesTracking', () => {
  it('should render successfully', () => {
    const { baseElement } = render(<ApplicationUsecasesTracking />);
    expect(baseElement).toBeTruthy();
  });
});
