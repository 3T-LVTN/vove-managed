import { query } from './query';

describe('shared', () => {
  it('should work', () => {
    expect(query()).toEqual('shared');
  });
});
