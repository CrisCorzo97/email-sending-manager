import { Injectable } from '@nestjs/common';
import { Prisma } from '@prisma/client';
import { PrismaService } from '../../database/prisma.service';
import { CreateCampaignDto } from './dto/campaign-dto';

@Injectable()
export class CampaignService {
  constructor(private readonly repository: PrismaService) {}

  async create(createCampaignDto: CreateCampaignDto) {
    for (const key in createCampaignDto) {
      if (!createCampaignDto[key]) {
        return {
          data: null,
          error: `Field ${key} is required`,
        };
      }
    }

    try {
      const campaign = await this.repository.campaign.create({
        data: { ...createCampaignDto },
      });

      return { data: campaign, error: null };
    } catch (error) {
      console.error(error);
      return { data: null, error: error.message };
    }
  }

  async list(input: { page?: number; items_per_page?: number }) {
    const { page, items_per_page } = input;

    const query: Prisma.campaignFindManyArgs = {
      take: 5,
    };

    if (items_per_page) {
      query.take = items_per_page;
    }

    if (page) {
      query.skip = (page - 1) * query.take;
    }

    try {
      const campaigns = await this.repository.campaign.findMany(query);
      const total_items = await this.repository.campaign.count();

      return {
        data: campaigns,
        pagination: {
          total_items,
          page: page ?? 1,
          items_per_page: query.take,
          total_pages: Math.ceil(total_items / query.take),
        },
        error: null,
      };
    } catch (error) {
      console.error(error);
      return {
        data: null,
        pagination: null,
        error: error.message,
      };
    }
  }

  async findOne(id: string) {
    try {
      const campaign = await this.repository.campaign.findUnique({
        where: { id },
      });

      return { data: campaign, error: null };
    } catch (error) {
      console.error(error);
      return { data: null, error: error.message };
    }
  }

  async update(input: {
    campaign_id: string;
    updateCampaignDto: Prisma.campaignUpdateInput;
  }) {
    const { campaign_id, updateCampaignDto } = input;

    try {
      const campaign = await this.repository.campaign.update({
        where: { id: campaign_id },
        data: { ...updateCampaignDto },
      });

      return { data: campaign, error: null };
    } catch (error) {
      console.error(error);
      return { data: null, error: error.message };
    }
  }

  async remove(id: string) {
    try {
      const campaign = await this.repository.campaign.delete({
        where: { id },
      });

      return { data: campaign, error: null };
    } catch (error) {
      console.error(error);
      return { data: null, error: error.message };
    }
  }
}
