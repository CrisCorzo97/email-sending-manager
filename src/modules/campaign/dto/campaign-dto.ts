import { $Enums } from '@prisma/client';

export class CreateCampaignDto {
  name: string;
  description: string;
  status: $Enums.campaign_status;
  send_at: Date;
  template_id: string;
}
