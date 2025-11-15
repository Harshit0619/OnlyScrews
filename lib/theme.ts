/**
 * Centralized theme configuration for OnlyScrews
 * Use these constants across all components for consistency
 */

export const COLORS = {
    primary: '#BCFF83',
    primaryHover: '#BCFF83',
    primaryDark: '#94d65e',
    black: '#000000',
    white: '#FFFFFF',
    gray: {
        50: '#F9FAFB',
        100: '#F3F4F6',
        200: '#E5E7EB',
        300: '#D1D5DB',
        400: '#9CA3AF',
        500: '#6B7280',
        600: '#4B5563',
        700: '#374151',
        800: '#1F2937',
        900: '#111827',
    }
} as const;

export const FONTS = {
    heading: '"Montserrat", sans-serif',
    body: '"Nunito Sans", sans-serif',
} as const;

export const TYPOGRAPHY = {
    // Main page title (H1)
    h1: {
        fontSize: '48px',
        lineHeight: '1.2',
        fontWeight: '700',
        fontFamily: FONTS.heading,
    },
    // Section headings (H2)
    h2: {
        fontSize: '36px',
        lineHeight: '1.3',
        fontWeight: '600',
        fontFamily: FONTS.heading,
    },
    // Subsection headings (H3)
    h3: {
        fontSize: '24px',
        lineHeight: '1.4',
        fontWeight: '600',
        fontFamily: FONTS.heading,
    },
    // Small headings (H4)
    h4: {
        fontSize: '20px',
        lineHeight: '1.5',
        fontWeight: '600',
        fontFamily: FONTS.heading,
    },
    // Subheadings/leads
    subtitle: {
        fontSize: '18px',
        lineHeight: '1.6',
        fontWeight: '400',
        fontFamily: FONTS.body,
    },
    // Body text
    body: {
        fontSize: '16px',
        lineHeight: '1.6',
        fontWeight: '400',
        fontFamily: FONTS.body,
    },
    // Small text
    small: {
        fontSize: '14px',
        lineHeight: '1.5',
        fontWeight: '400',
        fontFamily: FONTS.body,
    },
} as const;

export const CARD = {
    // Standard card dimensions - symmetrical
    width: '280px',
    height: '320px',
    padding: '24px',
    borderRadius: '16px',
    imageHeight: '200px',
} as const;

export const SPACING = {
    section: {
        py: 'py-12 md:py-16',
        px: 'px-4',
    },
    container: 'max-w-7xl mx-auto',
    gap: {
        sm: 'gap-4',
        md: 'gap-6',
        lg: 'gap-8',
    },
} as const;
