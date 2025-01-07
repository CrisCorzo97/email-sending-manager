export const mockDatabase = [];

export const prismaCampaignMock = {
  create: jest.fn((dto) => {
    if (!dto.name || !dto.description) {
      return {
        data: null,
        error: 'Field name is required',
      };
    }

    if (dto.name === 'Server Error') {
      return {
        data: null,
        error: 'Service Error',
      };
    }

    const newCampaign = {
      id: mockDatabase.length + 1,
      ...dto,
      createdAt: new Date(),
      updatedAt: new Date(),
    };
    mockDatabase.push(newCampaign);
    return { data: newCampaign, error: null };
  }),
  list: jest.fn(),
};
