import { UUID } from 'crypto';

export class Campaign {
  id: UUID;
  title: string;
  receivers: string[];
  content: string;
  send_date: Date;
  created_at: Date;
}
