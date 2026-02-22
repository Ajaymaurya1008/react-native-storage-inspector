import React, { useState, useEffect } from 'react';
import { View, Text, TextInput, TouchableOpacity, Modal, StyleSheet } from 'react-native';
import type { StorageItem } from '@/adapters/types';
import { IconButton } from '@/components/IconButton';
import { LAYOUT } from '@/constants';
import { theme } from '@/theme';
import { strings } from '@/strings';

export interface ItemFormProps {
  visible: boolean;
  storageName: string;
  editingItem: StorageItem | null;
  onSave: (key: string, value: string) => Promise<void>;
  onCancel: () => void;
}

export function ItemForm(props: ItemFormProps) {
  const { visible, storageName, editingItem, onSave, onCancel } = props;

  const [key, setKey] = useState('');
  const [value, setValue] = useState('');
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const isEdit = editingItem !== null;

  useEffect(() => {
    if (visible) {
      setKey(editingItem?.key ?? '');
      setValue(editingItem?.value ?? '');
      setError(null);
    }
  }, [visible, editingItem]);

  const handleSubmit = async () => {
    const k = key.trim();
    if (!k) {
      setError(strings.keyRequired);
      return;
    }
    setSaving(true);
    setError(null);
    try {
      await onSave(k, value);
      onCancel();
    } catch (e) {
      setError(e instanceof Error ? e.message : strings.saveFailed);
    } finally {
      setSaving(false);
    }
  };

  const title = isEdit
    ? strings.editItemTitle(editingItem?.key ?? '')
    : strings.addItemTitle(storageName);

  return (
    <Modal visible={visible} transparent animationType="slide" onRequestClose={onCancel}>
      <View style={styles.formOverlay}>
        <TouchableOpacity
          style={{ flex: 1, width: '100%' }}
          activeOpacity={1}
          onPress={onCancel}
        />
        <View style={styles.formModal}>
          <View style={styles.formHeader}>
            <Text style={styles.formTitle} numberOfLines={1}>
              {title}
            </Text>
            <IconButton
              name="close"
              onPress={onCancel}
              size={24}
              tintColor={theme.colors.textSecondary}
              style={styles.formCloseButton}
              hitSlop={LAYOUT.hitSlopLarge}
            />
          </View>
          <Text style={styles.formStorageType}>
            {strings.storageTypeLabel(storageName)}
          </Text>
          <Text style={styles.formLabel}>{strings.keyLabel}</Text>
          <TextInput
            style={[styles.formInput, isEdit && styles.formInputDisabled]}
            value={key}
            onChangeText={setKey}
            placeholder={strings.enterKeyPlaceholder}
            placeholderTextColor={theme.colors.textMuted}
            editable={!isEdit}
            autoCapitalize="none"
            multiline
          />
          <Text style={styles.formLabel}>{strings.valueLabel}</Text>
          <TextInput
            style={styles.formInput}
            value={value}
            onChangeText={setValue}
            placeholder={strings.enterValuePlaceholder}
            placeholderTextColor={theme.colors.textMuted}
            multiline
            numberOfLines={3}
          />
          {error ? (
            <Text style={[styles.errorText, { marginBottom: 12 }]}>{error}</Text>
          ) : null}
          <View style={styles.formActions}>
            <TouchableOpacity
              style={[styles.formButton, styles.formButtonCancel]}
              onPress={onCancel}
              disabled={saving}
            >
              <Text style={[styles.formButtonText, styles.formButtonTextCancel]}>
                {strings.cancel}
              </Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={[styles.formButton, styles.formButtonSubmit]}
              onPress={handleSubmit}
              disabled={saving}
            >
              <Text style={[styles.formButtonText, styles.formButtonTextSubmit]}>
                {saving ? strings.saving : isEdit ? strings.save : strings.add}
              </Text>
            </TouchableOpacity>
          </View>
        </View>
      </View>
    </Modal>
  );
}

const { colors } = theme;

const styles = StyleSheet.create({
  formOverlay: {
    flex: 1,
    backgroundColor: colors.overlayBackdrop,
    justifyContent: 'flex-end',
    alignItems: 'center',
  },
  formModal: {
    width: '100%',
    maxWidth: LAYOUT.screenWidth,
    backgroundColor: colors.background,
    borderTopLeftRadius: LAYOUT.modalRadius,
    borderTopRightRadius: LAYOUT.modalRadius,
    padding: LAYOUT.padding,
    paddingBottom: LAYOUT.padding + 34,
  },
  formHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginBottom: LAYOUT.padding,
  },
  formTitle: {
    fontSize: 17,
    fontWeight: '600',
    color: colors.text,
    flex: 1,
  },
  formCloseButton: {
    width: 44,
    height: 44,
    alignItems: 'flex-end',
    justifyContent: 'center',
  },
  formStorageType: {
    fontSize: 13,
    color: colors.textSecondary,
    marginBottom: 12,
  },
  formLabel: {
    fontSize: 12,
    fontWeight: '600',
    color: colors.textSecondary,
    marginBottom: 6,
  },
  formInput: {
    borderWidth: 1,
    borderColor: colors.border,
    borderRadius: 10,
    padding: 12,
    fontSize: LAYOUT.fontSize,
    marginBottom: LAYOUT.padding,
    color: colors.text,
    backgroundColor: colors.background,
  },
  formInputDisabled: {
    backgroundColor: colors.backgroundSecondary,
    color: colors.textSecondary,
  },
  formActions: {
    flexDirection: 'row',
    justifyContent: 'flex-end',
    gap: 12,
    marginTop: 8,
  },
  formButton: {
    paddingVertical: 12,
    paddingHorizontal: 20,
    borderRadius: 10,
    minWidth: 100,
    alignItems: 'center',
  },
  formButtonCancel: {
    backgroundColor: 'transparent',
    borderWidth: 1,
    borderColor: colors.text,
  },
  formButtonSubmit: {
    backgroundColor: colors.text,
  },
  formButtonText: {
    fontSize: 16,
    fontWeight: '600',
  },
  formButtonTextCancel: {
    color: colors.text,
  },
  formButtonTextSubmit: {
    color: colors.inverted,
  },
  errorText: {
    fontSize: LAYOUT.fontSize,
    color: colors.text,
  },
});
