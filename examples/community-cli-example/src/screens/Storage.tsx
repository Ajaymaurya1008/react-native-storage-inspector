import React from 'react';
import { View, StyleSheet } from 'react-native';
import { StorageInspector } from 'react-native-storage-inspector';
import { mmkvInstance } from '../lib/storage';

export default function Storage() {
  return (
    <View style={styles.container}>
      <StorageInspector mmkvInstances={[mmkvInstance]} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});
