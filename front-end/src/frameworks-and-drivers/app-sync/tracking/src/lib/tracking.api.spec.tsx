import { render } from '@testing-library/react';

import TrackingApi from './tracking.api';

describe('FrameworksAndDriversAppSyncTracking', () => {
  it('should render successfully', () => {
    const { baseElement } = render(<TrackingApi />);
    expect(baseElement).toBeTruthy();
  });
});
