import { render } from '@testing-library/react';

import TrackingControllers from './tracking.controllers';

describe('InterfaceAdaptersControllersTracking', () => {
  it('should render successfully', () => {
    const { baseElement } = render(<TrackingControllers />);
    expect(baseElement).toBeTruthy();
  });
});
