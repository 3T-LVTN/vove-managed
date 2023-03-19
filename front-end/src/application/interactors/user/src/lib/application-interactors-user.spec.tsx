import { render } from '@testing-library/react';

import ApplicationInteractorsUser from './application-interactors-user';

describe('ApplicationInteractorsUser', () => {
  it('should render successfully', () => {
    const { baseElement } = render(<ApplicationInteractorsUser />);
    expect(baseElement).toBeTruthy();
  });
});
