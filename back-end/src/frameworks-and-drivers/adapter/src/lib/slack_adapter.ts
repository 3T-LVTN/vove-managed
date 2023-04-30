import { Injectable } from '@nestjs/common';
import { IncomingWebhook, IncomingWebhookResult } from '@slack/webhook';

@Injectable()
export class SlackService {
  private readonly webhook: IncomingWebhook;

  constructor() {
    this.webhook = new IncomingWebhook(process.env.SLACK_WEBHOOK_URL?process.env.SLACK_WEBHOOK_URL:"https://hooks.slack.com/services/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");
  }

  SendErrorNotification(path: string, error: Error): Promise<IncomingWebhookResult> {
    const message = `
      Request to ${path} failed with error:
      \`\`\`
      ${error.stack}
      \`\`\`
    `;
    return this.webhook.send({ text: message });
  }
}