/**
 * Sidebar order for the docs.
 * @see https://docusaurus.io/docs/sidebar
 */
import type { SidebarsConfig } from '@docusaurus/plugin-content-docs';

const sidebars: SidebarsConfig = {
  docsSidebar: [
    'introduction',
    'installation',
    'usage',
    {
      type: 'category',
      label: 'Supported storages',
      link: { type: 'doc', id: 'storages/index' },
      items: [
        'storages/mmkv',
        'storages/async-storage',
        'storages/keychain',
        'storages/secure-store',
      ],
    },
    {
      type: 'category',
      label: 'API',
      link: { type: 'doc', id: 'api/overview' },
      items: [
        'api/storage-inspector-props',
        'api/i-storage-adapter',
        'api/adapter-factories',
        'api/theme-and-strings',
      ],
    },
    'expo',
    'custom-adapters',
    'troubleshooting',
    'examples',
    'demo',
    'contributing',
    'license',
  ],
};

export default sidebars;
