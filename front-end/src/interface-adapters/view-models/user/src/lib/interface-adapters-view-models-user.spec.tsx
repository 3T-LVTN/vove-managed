import { render } from '@testing-library/react';

import InterfaceAdaptersViewModelsUser from './interface-adapters-view-models-user';

describe('InterfaceAdaptersViewModelsUser', () => {
  it('should render successfully', () => {
    const { baseElement } = render(<InterfaceAdaptersViewModelsUser />);
    expect(baseElement).toBeTruthy();
  });
});
