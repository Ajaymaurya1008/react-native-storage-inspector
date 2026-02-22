import { useState, useCallback, useEffect } from 'react';
import type { IStorageAdapter } from '@/adapters/types';
import type { StorageItem } from '@/adapters/types';

export function useStorageItems(adapter: IStorageAdapter | null): {
  items: StorageItem[];
  loading: boolean;
  error: string | null;
  refresh: () => Promise<void>;
} {
  const [items, setItems] = useState<StorageItem[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const refresh = useCallback(async () => {
    if (!adapter || !adapter.isAvailable()) {
      setItems([]);
      setLoading(false);
      return;
    }
    setLoading(true);
    setError(null);
    try {
      const keys = await adapter.getAllKeys();
      const pairs: StorageItem[] = [];
      for (const key of keys) {
        const value = await adapter.getItem(key);
        if (value === null) continue;
        pairs.push({ key, value });
      }
      setItems(pairs);
    } catch (e) {
      setError(e instanceof Error ? e.message : 'Failed to load items');
      setItems([]);
    } finally {
      setLoading(false);
    }
  }, [adapter]);

  useEffect(() => {
    refresh();
  }, [refresh]);

  return { items, loading, error, refresh };
}
