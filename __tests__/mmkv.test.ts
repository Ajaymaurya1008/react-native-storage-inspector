import { createMMKVAdapter } from '../src/adapters/mmkv';

describe('createMMKVAdapter', () => {
  const mockInstance = {
    getAllKeys: jest.fn(() => ['key1', 'key2']),
    getString: jest.fn((key: string) =>
      key === 'key1' ? 'value1' : key === 'key2' ? 'value2' : undefined
    ),
    set: jest.fn(),
    remove: jest.fn(() => true),
  };

  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('returns adapter with correct type and name', () => {
    const adapter = createMMKVAdapter(mockInstance);
    expect(adapter.type).toBe('mmkv');
    expect(adapter.name).toBe('MMKV');
  });

  it('uses custom name when provided', () => {
    const adapter = createMMKVAdapter(mockInstance, 'My Storage');
    expect(adapter.name).toBe('My Storage');
  });

  it('getAllKeys returns keys from instance', async () => {
    const adapter = createMMKVAdapter(mockInstance);
    const keys = await adapter.getAllKeys();
    expect(keys).toEqual(['key1', 'key2']);
    expect(mockInstance.getAllKeys).toHaveBeenCalledTimes(1);
  });

  it('getItem returns value or null', async () => {
    const adapter = createMMKVAdapter(mockInstance);
    expect(await adapter.getItem('key1')).toBe('value1');
    expect(await adapter.getItem('key2')).toBe('value2');
    expect(await adapter.getItem('missing')).toBeNull();
  });

  it('setItem calls instance.set', async () => {
    const adapter = createMMKVAdapter(mockInstance);
    await adapter.setItem('k', 'v');
    expect(mockInstance.set).toHaveBeenCalledWith('k', 'v');
  });

  it('removeItem calls instance.remove', async () => {
    const adapter = createMMKVAdapter(mockInstance);
    await adapter.removeItem('key1');
    expect(mockInstance.remove).toHaveBeenCalledWith('key1');
  });

  it('isAvailable returns true', () => {
    const adapter = createMMKVAdapter(mockInstance);
    expect(adapter.isAvailable()).toBe(true);
  });
});
