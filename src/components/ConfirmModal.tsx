import React from 'react';
import { View, Text, Modal, TouchableOpacity, StyleSheet } from 'react-native';
import { IconButton } from '@/components/IconButton';
import { LAYOUT } from '@/constants';
import { theme } from '@/theme';
import { strings } from '@/strings';

export interface ConfirmModalProps {
  visible: boolean;
  title: string;
  message: string;
  confirmLabel?: string;
  cancelLabel?: string;
  danger?: boolean;
  onConfirm: () => void | Promise<void>;
  onCancel: () => void;
}

export function ConfirmModal(props: ConfirmModalProps) {
  const {
    visible,
    title,
    message,
    confirmLabel = strings.confirmDelete,
    cancelLabel = strings.cancelKeep,
    danger = true,
    onConfirm,
    onCancel,
  } = props;

  return (
    <Modal visible={visible} transparent animationType="slide" onRequestClose={onCancel}>
      <View style={styles.confirmOverlay}>
        <TouchableOpacity
          style={{ flex: 1, width: '100%' }}
          activeOpacity={1}
          onPress={onCancel}
        />
        <View style={styles.confirmModal}>
          <View style={styles.confirmHeader}>
            <Text style={styles.confirmTitle}>{title}</Text>
            <IconButton
              name="close"
              onPress={onCancel}
              size={24}
              tintColor={theme.colors.textSecondary}
              style={styles.formCloseButton}
              hitSlop={LAYOUT.hitSlopLarge}
            />
          </View>
          <Text style={styles.confirmMessage}>{message}</Text>
          <View style={styles.confirmActions}>
            <TouchableOpacity
              style={[styles.confirmButton, styles.confirmButtonSecondary]}
              onPress={onCancel}
            >
              <Text style={[styles.confirmButtonText, styles.confirmButtonTextSecondary]}>
                {cancelLabel}
              </Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={[
                styles.confirmButton,
                danger ? styles.confirmButtonDanger : styles.formButtonSubmit,
              ]}
              onPress={onConfirm}
            >
              <Text
                style={[
                  styles.confirmButtonText,
                  danger ? styles.confirmButtonTextDanger : styles.formButtonTextSubmit,
                ]}
              >
                {confirmLabel}
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
  confirmOverlay: {
    flex: 1,
    backgroundColor: colors.overlayBackdrop,
    justifyContent: 'flex-end',
    alignItems: 'center',
  },
  confirmModal: {
    width: '100%',
    maxWidth: LAYOUT.screenWidth,
    backgroundColor: colors.background,
    borderTopLeftRadius: LAYOUT.modalRadius,
    borderTopRightRadius: LAYOUT.modalRadius,
    padding: LAYOUT.padding,
    paddingBottom: LAYOUT.padding + 34,
  },
  confirmHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginBottom: 12,
  },
  confirmTitle: {
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
  confirmMessage: {
    fontSize: 15,
    color: colors.textSecondary,
    lineHeight: 22,
    marginBottom: 20,
  },
  confirmActions: {
    flexDirection: 'row',
    gap: 12,
  },
  confirmButton: {
    flex: 1,
    paddingVertical: 14,
    borderRadius: 10,
    alignItems: 'center',
  },
  confirmButtonSecondary: {
    backgroundColor: 'transparent',
    borderWidth: 1,
    borderColor: colors.text,
  },
  confirmButtonDanger: {
    backgroundColor: colors.text,
  },
  formButtonSubmit: {
    backgroundColor: colors.text,
  },
  confirmButtonText: {
    fontSize: 16,
    fontWeight: '600',
  },
  confirmButtonTextSecondary: {
    color: colors.text,
  },
  confirmButtonTextDanger: {
    color: colors.inverted,
  },
  formButtonTextSubmit: {
    color: colors.inverted,
  },
});
