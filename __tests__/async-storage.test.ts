describe('createAsyncStorageAdapter', () => {
  const originalRequire = global.require;

  beforeEach(() => {
    jest.resetModules();
    delete (global as unknown as { require?: unknown }).require;
  });

  afterEach(() => {
    (global as unknown as { require: unknown }).require = originalRequire;
  });

  it('returns adapter with correct type when module unavailable', async () => {
    const { createAsyncStorageAdapter } = await import('../src/adapters/async-storage');
    const adapter = createAsyncStorageAdapter();
    expect(adapter.type).toBe('async-storage');
    expect(adapter.name).toBe('Async Storage');
  });

  it('isAvailable returns false when module unavailable', async () => {
    const { createAsyncStorageAdapter } = await import('../src/adapters/async-storage');
    const adapter = createAsyncStorageAdapter();
    expect(adapter.isAvailable()).toBe(false);
  });

  it('getAllKeys returns empty array when unavailable', async () => {
    const { createAsyncStorageAdapter } = await import('../src/adapters/async-storage');
    const adapter = createAsyncStorageAdapter();
    expect(await adapter.getAllKeys()).toEqual([]);
  });

  it('getItem returns null when unavailable', async () => {
    const { createAsyncStorageAdapter } = await import('../src/adapters/async-storage');
    const adapter = createAsyncStorageAdapter();
    expect(await adapter.getItem('any')).toBeNull();
  });
});
