import React from "react";
import { View, Text, Modal, TouchableOpacity } from "react-native";
import { IconButton } from "@/components/IconButton";
import { styles } from "@/components/styles";
import { LAYOUT } from "@/constants";
import { theme } from "@/theme";
import { strings } from "@/strings";

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

export function ConfirmModal({
  visible,
  title,
  message,
  confirmLabel = strings.confirmDelete,
  cancelLabel = strings.cancelKeep,
  danger = true,
  onConfirm,
  onCancel,
}: ConfirmModalProps) {
  const handleConfirm = () => {
    void Promise.resolve(onConfirm());
  };

  return (
    <Modal
      visible={visible}
      transparent
      animationType="slide"
      onRequestClose={onCancel}
    >
      <View style={styles.confirmOverlay}>
        <TouchableOpacity
          style={{ flex: 1, width: "100%" }}
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
              <Text
                style={[
                  styles.confirmButtonText,
                  styles.confirmButtonTextSecondary,
                ]}
              >
                {cancelLabel}
              </Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={[
                styles.confirmButton,
                danger ? styles.confirmButtonDanger : styles.formButtonSubmit,
              ]}
              onPress={handleConfirm}
            >
              <Text
                style={[
                  styles.confirmButtonText,
                  danger
                    ? styles.confirmButtonTextDanger
                    : styles.formButtonTextSubmit,
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
