import { Test, TestingModule } from '@nestjs/testing';
import { campaign } from '@prisma/client';
import { Envelope } from 'src/types/envelope';
import { PrismaService } from '../../../database/prisma.service';
import { CampaignController } from '../campaign.controller';
import { CampaignService } from '../campaign.service';
import { CreateCampaignDto } from '../dto/campaign-dto';
import { mockDatabase, prismaCampaignMock } from './prisma-mock';

describe('CampaignController', () => {
  // Defino una variable controller que será del tipo CampaignController
  let controller: CampaignController;

  // Antes de cada prueba, se ejecuta el siguiente bloque de código
  beforeEach(async () => {
    // Creo un módulo de testing con los controladores y servicios necesarios
    const module: TestingModule = await Test.createTestingModule({
      controllers: [CampaignController],
      providers: [
        { provide: CampaignService, useValue: prismaCampaignMock },
        PrismaService,
      ],
    }).compile();

    // Obtengo la instancia del controlador
    controller = module.get<CampaignController>(CampaignController);
  });

  describe('POST /campaign (create)', () => {
    it('should create a campaign successfully with valid data', async () => {
      const campaignData: CreateCampaignDto = {
        name: 'Campaign 1',
        description: 'Description of Campaign 1',
        template_id: 'template1',
        send_at: new Date(),
        status: 'DRAFT',
      };

      // Act
      const result = await controller.create(campaignData);

      // Assert
      expect(result.success).toBe(true);
      expect(result.data).toMatchObject(campaignData);
      expect(result.error).toBe(null);
      expect(result.pagination).toBe(null);
      expect(mockDatabase.length).toBe(1);
    });

    it('should throw an error if the service fails', async () => {
      const campaignData: CreateCampaignDto = {
        name: 'Server Error',
        description: 'Description of Campaign 1',
        template_id: 'template1',
        send_at: new Date(),
        status: 'DRAFT',
      };

      // Act
      const result = await controller.create(campaignData);

      // Assert
      expect(prismaCampaignMock.create).toHaveBeenCalledWith(campaignData);
      expect(result.success).toBe(false);
      expect(result.error).toEqual('Service Error');
      expect(result.pagination).toBe(null);
    });

    it('should return a validation error if input is invalid', async () => {
      const invalidData = {
        description: 'Description of Campaign 1',
        template_id: 'template1',
        send_at: new Date(),
        status: 'DRAFT',
      };

      const mockResult: Envelope<CreateCampaignDto> = {
        success: false,
        data: null,
        error: 'Field name is required',
        pagination: null,
      };

      prismaCampaignMock.create(mockResult);

      // Act
      const result = await controller.create(invalidData as CreateCampaignDto);

      // Assert
      expect(result).toEqual(mockResult);
      expect(prismaCampaignMock.create).toHaveBeenCalledWith(invalidData);
      expect(result.success).toBe(false);
      expect(result.error).toEqual('Field name is required');
      expect(result.pagination).toBe(null);
    });
  });

  describe('GET / (list)', () => {
    it('should call the service to list campaigns and return the result', async () => {
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

      prismaCampaignMock.list.mockResolvedValue(mockResult);

      // Act
      const result = await controller.list();

      // Assert
      expect(result).toEqual(mockResult);
      expect(prismaCampaignMock.list).toHaveBeenCalledTimes(1);
      expect(prismaCampaignMock.list).toHaveBeenCalledWith({});
      expect(result.success).toBe(true);
      expect(result.error).toBe(null);
      expect(result.pagination).toBe(mockResult.pagination);
    });
  });
});
