import { SlackService } from './slack_adapter';

describe('hoe thy', () => {
  it('should work', () => {
    const adapter = new SlackService;
    adapter.SendErrorNotification("hoe thy", new Error("hoe thy"))
  });
});
