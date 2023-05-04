import { render } from '@testing-library/react';

import ApplicationRepositoriesInquiry from './inquiry.repositories';

describe('ApplicationRepositoriesInquiry', () => {
  it('should render successfully', () => {
    const { baseElement } = render(<ApplicationRepositoriesInquiry />);
    expect(baseElement).toBeTruthy();
  });
});
