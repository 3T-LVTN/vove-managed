import { render } from '@testing-library/react';

import InquiryApi from './inquiry.api';

describe('FrameworksAndDriversAppSyncInquiry', () => {
  it('should render successfully', () => {
    const { baseElement } = render(<InquiryApi />);
    expect(baseElement).toBeTruthy();
  });
});
