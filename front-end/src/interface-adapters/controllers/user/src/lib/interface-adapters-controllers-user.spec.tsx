import { render } from '@testing-library/react';

import InterfaceAdaptersControllersUser from './interface-adapters-controllers-user';

describe('InterfaceAdaptersControllersUser', () => {
  it('should render successfully', () => {
    const { baseElement } = render(<InterfaceAdaptersControllersUser />);
    expect(baseElement).toBeTruthy();
  });
});
