import { render } from '@testing-library/react';

import DomainEntitiesInquiry from './inquiry.entities';

describe('DomainEntitiesInquiry', () => {
  it('should render successfully', () => {
    const { baseElement } = render(<DomainEntitiesInquiry />);
    expect(baseElement).toBeTruthy();
  });
});
