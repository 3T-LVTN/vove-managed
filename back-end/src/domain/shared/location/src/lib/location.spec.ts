import { query } from './location';

describe('shared', () => {
  it('should work', () => {
    expect(query()).toEqual('shared');
  });
});
