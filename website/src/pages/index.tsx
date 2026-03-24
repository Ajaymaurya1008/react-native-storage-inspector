import React from 'react';
import clsx from 'clsx';
import Link from '@docusaurus/Link';
import useDocusaurusContext from '@docusaurus/useDocusaurusContext';
import Layout from '@theme/Layout';
import type { ReactNode } from 'react';
import styles from './index.module.css';

function Hero(): ReactNode {
  return (
    <header className={clsx('hero hero--primary', styles.heroBanner)}>
      <div className="container">
        <h1 className="hero__title">React Native Storage Inspector</h1>
        <p className="hero__subtitle">
          Browse, search, and edit all your app's persisted data — MMKV, Async Storage,
          Keychain, and Expo Secure Store in one place.
        </p>
        <div className={styles.buttons}>
          <Link className="button button--secondary button--lg" to="/docs/introduction">
            Get started
          </Link>
          <Link
            className="button button--outline button--secondary button--lg"
            href="https://github.com/Ajaymaurya1008/react-native-storage-inspector"
            style={{ marginLeft: 12 }}
          >
            GitHub
          </Link>
        </div>
      </div>
    </header>
  );
}

interface Feature {
  title: string;
  description: ReactNode;
}

function Features(): ReactNode {
  const features: Feature[] = [
    {
      title: 'All storages in one UI',
      description: (
        <>
          Tabs for MMKV, Async Storage, Keychain, and Expo Secure Store. Only the packages
          you install appear — no extra config.
        </>
      ),
    },
    {
      title: 'Plug-and-play',
      description: (
        <>
          Add the component to a screen, pass your MMKV instances (if any), and optional{' '}
          <code>secureStoreKeys</code> or <code>customAdapters</code>.
        </>
      ),
    },
    {
      title: 'Custom adapters',
      description: (
        <>
          Implement <code>IStorageAdapter</code> to inspect any key-value store. Works
          with the same UI and gestures.
        </>
      ),
    },
  ];

  return (
    <section className={styles.features}>
      <div className="container">
        <div className="row">
          {features.map(({ title, description }, i) => (
            <div key={i} className="col col--4">
              <div className="padding-horiz--md">
                <h3>{title}</h3>
                <p>{description}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

function DemoPlaceholder(): ReactNode {
  return (
    <section className={styles.demoSection}>
      <div className="container">
        <h2 className="text--center">Demo</h2>
        <div className={styles.demoPlaceholder}>
          <p>
            <strong>Demo space</strong>
          </p>
          <p>
            You can add a video, GIF, or link to Expo Snack / simulator here. Run the{' '}
            <Link to="/docs/examples">example apps</Link> locally to try the inspector.
          </p>
        </div>
      </div>
    </section>
  );
}

export default function Home(): ReactNode {
  const { siteConfig } = useDocusaurusContext();
  return (
    <Layout
      title={siteConfig.title}
      description="Plug-and-play storage inspector for React Native and Expo: MMKV, AsyncStorage, Keychain, Expo Secure Store."
    >
      <Hero />
      <main>
        <Features />
        <DemoPlaceholder />
      </main>
    </Layout>
  );
}
