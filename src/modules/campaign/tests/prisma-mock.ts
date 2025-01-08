import { Prisma } from '@prisma/client';
import { CreateCampaignDto } from '../dto/campaign-dto';

export const mockDatabase = [];

export const prismaCampaignMock = {
  create: jest.fn((dto: CreateCampaignDto) => {
    for (const key in dto) {
      if (!dto[key]) {
        return {
          data: null,
          error: `Field ${key} is required`,
        };
      }
    }

    if (dto.name === 'Server Error') {
      return {
        data: null,
        error: 'Service Error',
      };
    }

    const newCampaign = {
      id: crypto.randomUUID(),
      ...dto,
      createdAt: new Date(),
      updatedAt: new Date(),
    };
    mockDatabase.push(newCampaign);
    return { data: newCampaign, error: null };
  }),
  list: jest.fn((dto: { page?: number; items_per_page?: number }) => {
    const { page, items_per_page } = dto;

    if (page === 404) {
      return {
        data: null,
        error: 'Service Error',
        pagination: null,
      };
    }

    const query: Prisma.campaignFindManyArgs = {
      take: 5,
    };

    if (items_per_page) {
      query.take = items_per_page;
    }

    if (page) {
      query.skip = (page - 1) * query.take;
    }

    const campaigns = mockDatabase.slice(
      query.skip,
      query.take + (query.skip ?? 0),
    );

    return {
      data: campaigns,
      pagination: {
        total_items: mockDatabase.length,
        page: page ?? 1,
        items_per_page: query.take,
        total_pages: Math.ceil(mockDatabase.length / query.take),
      },
      error: null,
    };
  }),
};
