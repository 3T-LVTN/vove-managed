import { render } from '@testing-library/react';

import ApplicationRepositoriesUser from './application-repositories-user';

describe('ApplicationRepositoriesUser', () => {
  it('should render successfully', () => {
    const { baseElement } = render(<ApplicationRepositoriesUser />);
    expect(baseElement).toBeTruthy();
  });
});
