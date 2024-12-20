import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { CampaignController } from './campaign/campaign.controller';

@Module({
  imports: [],
  controllers: [AppController, CampaignController],
  providers: [AppService],
})
export class AppModule {}
