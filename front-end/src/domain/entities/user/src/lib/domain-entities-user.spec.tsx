import { render } from '@testing-library/react';

import DomainEntitiesUser from './domain-entities-user';

describe('DomainEntitiesUser', () => {
  it('should render successfully', () => {
    const { baseElement } = render(<DomainEntitiesUser />);
    expect(baseElement).toBeTruthy();
  });
});
