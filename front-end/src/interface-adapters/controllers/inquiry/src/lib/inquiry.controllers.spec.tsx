import { render } from '@testing-library/react';

import InquiryControllers from './inquiry.controllers';

describe('InterfaceAdaptersControllersInquiry', () => {
  it('should render successfully', () => {
    const { baseElement } = render(<InquiryControllers />);
    expect(baseElement).toBeTruthy();
  });
});
