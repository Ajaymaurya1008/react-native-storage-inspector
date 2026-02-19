/**
 * Centralized user-facing text for the storage inspector.
 * Enables localization and consistent messaging.
 */
export const strings = {
  // StorageInspector
  noAdapterAvailable:
    'No storage adapter available. Install at least one of: react-native-mmkv, @react-native-async-storage/async-storage, react-native-keychain, expo-secure-store',

  // StorageSection
  keychainHint:
    'No generic password items yet. Add a key using + above, or pass keychainKeys for internet credentials.',
  secureStoreHint:
    'Secure Store has no list API. Pass secureStoreKeys prop with known keys, or add a key using + above.',
  loading: 'Loading…',
  noItems: 'No items',
  valueLabel: 'Value',
  emptyValue: '(empty)',
  charCount: (n: number) => (n === 1 ? '1 char' : `${n} chars`),
  deleteItemTitle: (key: string) => `Delete ${key}?`,
  deleteItemMessage: (key: string) =>
    `This will permanently delete the ${key} storage item. Do you wish to continue?`,
  clearAllTitle: (name: string) => `Clear All ${name}?`,
  clearAllMessage: (count: number, name: string) =>
    `This will permanently delete all ${count} ${name} items. Do you wish to continue?`,

  // StorageList
  storageNotAvailable: 'This storage is not available.',
  keychainHintShort:
    'No items yet. Add a key below, or pass keychainKeys for internet credentials.',
  edit: 'Edit',
  delete: 'Delete',
  addItem: 'Add item',

  // ItemForm
  keyRequired: 'Key is required',
  saveFailed: 'Save failed',
  editItemTitle: (key: string) => `Edit ${key}`,
  addItemTitle: (storageName: string) => `Add ${storageName} Item`,
  storageTypeLabel: (name: string) => `Storage Type: ${name}`,
  keyLabel: 'Key',
  enterKeyPlaceholder: 'Enter key',
  enterValuePlaceholder: 'Enter value',
  cancel: 'Cancel',
  saving: 'Saving…',
  save: 'Save',
  add: 'Add',

  // ConfirmModal defaults
  confirmDelete: 'Yes, delete',
  cancelKeep: 'No, keep it',
} as const;
