import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
  Query,
} from '@nestjs/common';
import { campaign, Prisma } from '@prisma/client';
import { Envelope } from 'src/types/envelope';
import { CampaignService } from './campaign.service';

@Controller('campaign')
export class CampaignController {
  constructor(private readonly campaignService: CampaignService) {}

  @Post()
  async create(@Body() createCampaignDto: Prisma.campaignCreateInput) {
    const response: Envelope<campaign> = {
      success: true,
      data: null,
      error: null,
      pagination: null,
    };

    const { data, error } =
      await this.campaignService.create(createCampaignDto);

    response.data = data;
    response.error = error;

    return response;
  }

  @Get()
  async list(
    @Query('page') page?: number,
    @Query('items_per_page') items_per_page?: number,
  ) {
    const response: Envelope<campaign[]> = {
      success: true,
      data: null,
      error: null,
      pagination: null,
    };

    const { data, pagination, error } = await this.campaignService.list({
      page,
      items_per_page,
    });

    response.data = data;
    response.pagination = pagination;
    response.error = error;

    return response;
  }

  @Get(':id')
  async findOne(@Param('campaign_id') campaign_id: string) {
    const response: Envelope<campaign> = {
      success: true,
      data: null,
      error: null,
      pagination: null,
    };

    const { data, error } = await this.campaignService.findOne(campaign_id);

    response.data = data;
    response.error = error;

    return response;
  }

  @Patch(':id')
  async update(
    @Param('campaign_id') campaign_id: string,
    @Body() updateCampaignDto: Prisma.campaignUpdateInput,
  ) {
    const response: Envelope<campaign> = {
      success: true,
      data: null,
      error: null,
      pagination: null,
    };

    const { data, error } = await this.campaignService.update({
      campaign_id,
      updateCampaignDto,
    });

    response.data = data;
    response.error = error;

    return response;
  }

  @Delete(':id')
  async remove(@Param('campaign_id') campaign_id: string) {
    const response: Envelope<campaign> = {
      success: true,
      data: null,
      error: null,
      pagination: null,
    };

    const { data, error } = await this.campaignService.remove(campaign_id);

    response.data = data;
    response.error = error;

    return response;
  }
}
