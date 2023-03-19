import { render } from '@testing-library/react';

import InterfaceAdaptersControllersDashboard from './interface-adapters-controllers-dashboard';

describe('InterfaceAdaptersControllersDashboard', () => {
  it('should render successfully', () => {
    const { baseElement } = render(<InterfaceAdaptersControllersDashboard />);
    expect(baseElement).toBeTruthy();
  });
});
