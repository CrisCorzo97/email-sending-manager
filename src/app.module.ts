import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { CampaignModule } from './modules/campaign/campaign.module';

@Module({
  imports: [CampaignModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
