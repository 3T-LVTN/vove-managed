import { render } from '@testing-library/react';

import DomainEntitiesTracking from './tracking.entities';

describe('DomainEntitiesTracking', () => {
  it('should render successfully', () => {
    const { baseElement } = render(<DomainEntitiesTracking />);
    expect(baseElement).toBeTruthy();
  });
});
