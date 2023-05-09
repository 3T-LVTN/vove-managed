import { render } from '@testing-library/react';

import ApplicationUsecasesInquiry from './inquiry.usecases';

describe('ApplicationUsecasesInquiry', () => {
  it('should render successfully', () => {
    const { baseElement } = render(<ApplicationUsecasesInquiry />);
    expect(baseElement).toBeTruthy();
  });
});
