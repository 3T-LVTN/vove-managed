import { render } from '@testing-library/react';

import InquiryInteractors from './inquiry.interactors';

describe('ApplicationInteractorsInquiry', () => {
  it('should render successfully', () => {
    const { baseElement } = render(<InquiryInteractors />);
    expect(baseElement).toBeTruthy();
  });
});
