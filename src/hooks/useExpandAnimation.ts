import { useRef } from 'react';
import { Animated } from 'react-native';

/**
 * Encapsulates chevron rotation + height expansion animations.
 *
 * Animations are triggered imperatively via `animate` / `animateChevron` —
 * no `useEffect` needed in consuming components unless the expanded state
 * is controlled externally (e.g. via a prop).
 */
export function useExpandAnimation(initialExpanded: boolean) {
  const chevronAnim = useRef(new Animated.Value(initialExpanded ? 1 : 0)).current;
  const heightAnim = useRef(new Animated.Value(0)).current;
  const measuredHeight = useRef(0);
  const isExpandedRef = useRef(initialExpanded);

  const chevronStyle = {
    transform: [
      {
        rotate: chevronAnim.interpolate({
          inputRange: [0, 1],
          outputRange: ['0deg', '180deg'],
        }),
      },
    ],
  };

  // Stable function refs — safe to call without re-render, always read latest ref values.
  const animateChevron = useRef((toExpanded: boolean) => {
    Animated.timing(chevronAnim, {
      toValue: toExpanded ? 1 : 0,
      duration: 250,
      useNativeDriver: true,
    }).start();
  }).current;

  const animateHeight = useRef((toExpanded: boolean) => {
    if (measuredHeight.current === 0) return;
    Animated.timing(heightAnim, {
      toValue: toExpanded ? measuredHeight.current : 0,
      duration: 200,
      useNativeDriver: false,
    }).start();
  }).current;

  /** Triggers both chevron rotation and height expansion together. */
  const animate = useRef((toExpanded: boolean) => {
    isExpandedRef.current = toExpanded;
    animateChevron(toExpanded);
    animateHeight(toExpanded);
  }).current;

  /**
   * Attach to the ghost measurement view's `onLayout`.
   * The ghost view must be absolutely positioned so it is not constrained
   * by the animated container's height.
   */
  const onMeasureLayout = useRef((e: { nativeEvent: { layout: { height: number } } }) => {
    const h = e.nativeEvent.layout.height;
    if (h === 0) return;
    measuredHeight.current = h;
    // If already expanded (e.g. value text reflows), snap to new height immediately.
    if (isExpandedRef.current) heightAnim.setValue(h);
  }).current;

  return { chevronStyle, heightAnim, animate, animateChevron, onMeasureLayout };
}
