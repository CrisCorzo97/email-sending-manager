export class CreateCampaignDto {
  title: string;
  receivers: string[];
  content: string;
  send_date: Date;
  created_at: Date;
}
