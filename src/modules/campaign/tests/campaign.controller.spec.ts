import { Test, TestingModule } from '@nestjs/testing';
import { campaign, Prisma } from '@prisma/client';
import { Envelope } from 'src/types/envelope';
import { PrismaService } from '../../../database/prisma.service';
import { CampaignController } from '../campaign.controller';
import { CampaignService } from '../campaign.service';

describe('CampaignController', () => {
  // Defino una variable controller que será del tipo CampaignController
  let controller: CampaignController;

  const mockCampaignService = {
    create: jest.fn(),
    list: jest.fn(),
  };

  // Antes de cada prueba, se ejecuta el siguiente bloque de código
  beforeEach(async () => {
    // Creo un módulo de testing con los controladores y servicios necesarios
    const module: TestingModule = await Test.createTestingModule({
      controllers: [CampaignController],
      providers: [
        { provide: CampaignService, useValue: mockCampaignService },
        PrismaService,
      ],
    }).compile();

    // Obtengo la instancia del controlador
    controller = module.get<CampaignController>(CampaignController);
  });

  it('should create a campaign successfully', async () => {
    const campaignData: Prisma.campaignCreateInput = {
      name: 'Campaign 1',
      description: 'Description of Campaign 1',
      template: {
        connect: {
          id: 'template1',
        },
      },
      send_at: new Date(),
      status: 'DRAFT',
    };

    const mockResult: Envelope<Prisma.campaignCreateInput> = {
      success: true,
      data: {
        id: 'ajsdnafalmd',
        ...campaignData,
        created_at: new Date(),
        updated_at: new Date(),
      },
      error: null,
      pagination: null,
    };

    mockCampaignService.create.mockResolvedValue(mockResult);

    // Act
    const result = await controller.create(campaignData);

    // Assert
    expect(result).toEqual(mockResult);
    expect(mockCampaignService.create).toHaveBeenCalledTimes(1);
    expect(mockCampaignService.create).toHaveBeenCalledWith(campaignData);
    expect(result.success).toEqual(true);
    expect(result.error).toEqual(null);
    expect(result.pagination).toEqual(null);
  });

  it('should list campaigns successfully', async () => {
    const mockResult: Envelope<campaign[]> = {
      success: true,
      data: [
        {
          id: 'ajsdnafalmd',
          name: 'Campaign 1',
          description: 'Description of Campaign 1',
          template_id: 'template1',
          send_at: new Date(),
          status: 'DRAFT',
          created_at: new Date(),
          updated_at: new Date(),
        },
      ],
      error: null,
      pagination: {
        total_items: 1,
        page: 1,
        items_per_page: 5,
        total_pages: 1,
      },
    };

    mockCampaignService.list.mockResolvedValue(mockResult);

    // Act
    const result = await controller.list();

    // Assert
    expect(result).toEqual(mockResult);
    expect(mockCampaignService.list).toHaveBeenCalledTimes(1);
    expect(mockCampaignService.list).toHaveBeenCalledWith({});
    expect(result.success).toEqual(true);
    expect(result.error).toEqual(null);
    expect(result.pagination).toEqual(mockResult.pagination);
  });
});
