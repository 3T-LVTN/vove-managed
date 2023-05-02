import { render } from '@testing-library/react';

import TrackingInteractors from './tracking.interactors';

describe('ApplicationInteractorsTracking', () => {
  it('should render successfully', () => {
    const { baseElement } = render(<TrackingInteractors />);
    expect(baseElement).toBeTruthy();
  });
});
