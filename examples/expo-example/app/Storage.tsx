import { View } from 'react-native';
import React from 'react';
import { StorageInspector } from 'react-native-storage-inspector';
import { storage } from '../lib/storage';

export default function Storage() {
  return (
    <View style={{ flex: 1 }}>
      <StorageInspector mmkvInstances={[storage]} />
    </View>
  );
}
