import { render } from '@testing-library/react';

import ApplicationUsecasesUser from './application-usecases-user';

describe('ApplicationUsecasesUser', () => {
  it('should render successfully', () => {
    const { baseElement } = render(<ApplicationUsecasesUser />);
    expect(baseElement).toBeTruthy();
  });
});
