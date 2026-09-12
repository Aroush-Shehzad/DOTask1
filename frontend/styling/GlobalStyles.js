import { StyleSheet } from 'react-native';

export const COLORS = {
  primary: '#6366F1',   // Indigo
  secondary: '#8B5CF6', // Violet
  tertiary: '#EC4899', // Pink
  success: '#10B981', // Emerald
  warning: '#F59E0B', // Amber
  danger: '#EF4444', // Red
  background: '#F9FAFB', // Light gray
  white: '#FFFFFF',
  textMain: '#1F2937',
  textSecondary: '#6B7280',
  textTertiary: '#9CA3AF',
  cardBg: '#FFFFFF',
  borderColor: '#E5E7EB',
  divider: '#F3F4F6',
};

export const DARK_COLORS = {
  primary: '#818CF8', // Lighter indigo
  secondary: '#A78BFA', // Lighter violet
  tertiary: '#F472B6', // Lighter pink
  success: '#34D399', // Lighter emerald
  warning: '#FBBF24', // Lighter amber
  danger: '#F87171', // Lighter red
  background: '#111827', // Very dark gray
  white: '#1F2937', // Dark card bg
  textMain: '#F9FAFB',
  textSecondary: '#D1D5DB',
  textTertiary: '#9CA3AF',
  cardBg: '#1F2937',
  borderColor: '#374151',
  divider: '#2D3748',
};

export const TYPOGRAPHY = {
  heading1: { fontSize: 32, fontWeight: '800', lineHeight: 40, letterSpacing: -0.5 },
  heading2: { fontSize: 24, fontWeight: '700', lineHeight: 32, letterSpacing: -0.3 },
  heading3: { fontSize: 20, fontWeight: '600', lineHeight: 28 },
  body: { fontSize: 16, fontWeight: '400', lineHeight: 24 },
  bodyBold: { fontSize: 16, fontWeight: '600', lineHeight: 24 },
  caption: { fontSize: 14, fontWeight: '500', lineHeight: 20 },
  captionSmall: { fontSize: 12, fontWeight: '400', lineHeight: 18 },
  button: { fontSize: 16, fontWeight: '600', lineHeight: 24, letterSpacing: 0.3 },
};

export const SPACING = {
  xs: 4,
  sm: 8,
  md: 12,
  lg: 16,
  xl: 24,
  '2xl': 32,
};

export const SHADOWS = {
  light: {
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.05,
    shadowRadius: 2,
    elevation: 2,
  },
  medium: {
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.1,
    shadowRadius: 8,
    elevation: 4,
  },
  large: {
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 8 },
    shadowOpacity: 0.15,
    shadowRadius: 16,
    elevation: 8,
  },
};

export const getGlobalStyles = (isDark) => {
  const colors = isDark ? DARK_COLORS : COLORS;
  return StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: isDark ? DARK_COLORS.background : 'transparent',
      paddingHorizontal: SPACING.lg,
      paddingTop: SPACING.xl,
    },
    scrollContainer: {
      flexGrow: 1,
      paddingBottom: SPACING['2xl'],
    },
    heading: {
      ...TYPOGRAPHY.heading1,
      color: colors.textMain,
      marginBottom: SPACING.sm,
    },
    heading2: {
      ...TYPOGRAPHY.heading2,
      color: colors.textMain,
      marginBottom: SPACING.sm,
    },
    heading3: {
      ...TYPOGRAPHY.heading3,
      color: colors.textMain,
      marginBottom: SPACING.sm,
    },
    subHeading: {
      ...TYPOGRAPHY.body,
      color: colors.textSecondary,
      marginBottom: SPACING.xl,
    },
    inputContainer: {
      backgroundColor: colors.cardBg,
      flexDirection: 'row',
      alignItems: 'center',
      borderRadius: 12,
      paddingHorizontal: SPACING.lg,
      marginVertical: SPACING.sm,
      borderWidth: 1,
      borderColor: colors.borderColor,
      ...SHADOWS.light,
    },
    input: {
      flex: 1,
      paddingVertical: SPACING.lg,
      paddingHorizontal: SPACING.sm,
      ...TYPOGRAPHY.body,
      color: colors.textMain,
    },
    button: {
      backgroundColor: colors.primary,
      paddingVertical: SPACING.lg,
      paddingHorizontal: SPACING.xl,
      borderRadius: 12,
      marginVertical: SPACING.sm,
      alignItems: 'center',
      ...SHADOWS.medium,
    },
    buttonText: {
      ...TYPOGRAPHY.button,
      color: colors.white,
    },
    buttonSecondary: {
      backgroundColor: 'transparent',
      borderWidth: 1,
      borderColor: colors.primary,
      paddingVertical: SPACING.lg,
      paddingHorizontal: SPACING.xl,
      borderRadius: 12,
      marginVertical: SPACING.sm,
      alignItems: 'center',
    },
    buttonSecondaryText: {
      ...TYPOGRAPHY.button,
      color: colors.primary,
    },
    card: {
      backgroundColor: colors.cardBg,
      padding: SPACING.lg,
      marginVertical: SPACING.sm,
      borderRadius: 16,
      ...SHADOWS.medium,
    },
    section: {
      marginVertical: SPACING.lg,
    },
    centered: {
      justifyContent: 'center',
      alignItems: 'center',
    },
    pagePadding: {
      padding: SPACING.lg,
    },
    textMain: {
      ...TYPOGRAPHY.body,
      color: colors.textMain,
    },
    textSecondary: {
      ...TYPOGRAPHY.body,
      color: colors.textSecondary,
    },
    textCaption: {
      ...TYPOGRAPHY.caption,
      color: colors.textSecondary,
    },
    textSmall: {
      ...TYPOGRAPHY.captionSmall,
      color: colors.textSecondary,
    },
    divider: {
      height: 1,
      backgroundColor: colors.divider,
      marginVertical: SPACING.md,
    },
    badge: {
      backgroundColor: colors.secondary,
      paddingHorizontal: SPACING.sm,
      paddingVertical: SPACING.xs,
      borderRadius: 8,
      alignSelf: 'flex-start',
    },
    badgeText: {
      ...TYPOGRAPHY.captionSmall,
      color: colors.white,
      fontWeight: '600',
    },
    avatar: {
      width: 50,
      height: 50,
      borderRadius: 25,
      borderWidth: 2,
      borderColor: colors.primary,
    },
    iconButton: {
      padding: SPACING.sm,
      borderRadius: 8,
      backgroundColor: colors.cardBg,
      ...SHADOWS.light,
    },
  });
};

export const globalStyles = getGlobalStyles(false);