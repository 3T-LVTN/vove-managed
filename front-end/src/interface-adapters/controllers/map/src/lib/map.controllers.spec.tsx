import { render } from '@testing-library/react';

import InquiryControllers from './map.controllers';

describe('InterfaceAdaptersControllersInquiry', () => {
  it('should render successfully', () => {
    const { baseElement } = render(<InquiryControllers />);
    expect(baseElement).toBeTruthy();
  });
});
