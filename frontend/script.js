/**
 * Mistral Inspired Design System - Tailwind Configuration
 * This configuration defines the colors, typography, and spacing for the 404 Biotech platform.
 */

tailwind.config = {
    darkMode: "class",
    theme: {
        extend: {
            "colors": {
                "surface-dim": "#f1d4cb",
                "surface-container-low": "#fff1ed",
                "outline": "#907066",
                "surface": "#fff8f6",
                "mistral-flame": "#fb6424",
                "secondary-fixed-dim": "#ffb865",
                "sunshine-300": "#ffd06a",
                "on-secondary-container": "#673e00",
                "on-error": "#ffffff",
                "on-error-container": "#93000a",
                "inverse-surface": "#3e2c27",
                "black-tint": "hsl(0, 0%, 24%)",
                "secondary": "#875200",
                "on-background": "#271813",
                "surface-variant": "#fadcd3",
                "surface-bright": "#fff8f6",
                "inverse-on-surface": "#ffede8",
                "on-primary": "#ffffff",
                "surface-container-high": "#ffe2da",
                "sunshine-900": "#ff8a00",
                "secondary-fixed": "#ffddba",
                "on-primary-fixed": "#3a0b00",
                "on-primary-container": "#fffbff",
                "warm-ivory": "#fffaeb",
                "tertiary-container": "#0077ce",
                "background": "#fff8f6",
                "bright-yellow": "#ffd900",
                "cream": "#fff0c2",
                "error": "#ba1a1a",
                "input-border": "hsl(240, 5.9%, 90%)",
                "mistral-black": "#1f1f1f",
                "on-tertiary-fixed-variant": "#004881",
                "on-secondary": "#ffffff",
                "mistral-orange": "#fa520f",
                "surface-container": "#ffe9e3",
                "surface-container-lowest": "#ffffff",
                "on-tertiary": "#ffffff",
                "on-primary-fixed-variant": "#842500",
                "sunshine-500": "#ffb83e",
                "on-secondary-fixed": "#2b1700",
                "primary-container": "#d34000",
                "surface-tint": "#ad3300",
                "tertiary-fixed-dim": "#a2c9ff",
                "inverse-primary": "#ffb59e",
                "on-surface": "#271813",
                "on-surface-variant": "#5c4038",
                "block-orange": "#ff8105",
                "on-tertiary-fixed": "#001c38",
                "primary": "#a93100",
                "primary-fixed": "#ffdbd0",
                "sunshine-700": "#ffa110",
                "outline-variant": "#e5beb3",
                "on-secondary-fixed-variant": "#673d00",
                "surface-container-highest": "#fadcd3",
                "on-tertiary-container": "#fdfcff",
                "error-container": "#ffdad6",
                "tertiary-fixed": "#d3e4ff",
                "block-gold": "#ffe295",
                "primary-fixed-dim": "#ffb59e",
                "tertiary": "#005ea4",
                "secondary-container": "#ffa110"
            },
            "borderRadius": {
                "DEFAULT": "0rem",
                "lg": "0rem",
                "xl": "0rem",
                "full": "0rem"
            },
            "spacing": {
                "xl": "80px",
                "lg": "48px",
                "md": "24px",
                "xs": "4px",
                "unit": "8px",
                "sm": "12px",
                "hero-gap": "100px",
                "container-max": "1280px"
            },
            "fontFamily": {
                "subheading-md": ["Work Sans"],
                "display-hero": ["Work Sans"],
                "card-title": ["Work Sans"],
                "section-heading": ["Work Sans"],
                "caption": ["Work Sans"],
                "body": ["Work Sans"],
                "subheading-lg": ["Work Sans"],
                "label-uppercase": ["Work Sans"],
                "feature-title": ["Work Sans"]
            },
            "fontSize": {
                "subheading-md": ["32px", { "lineHeight": "1.15", "letterSpacing": "normal", "fontWeight": "400" }],
                "display-hero": ["82px", { "lineHeight": "1.00", "letterSpacing": "-2.05px", "fontWeight": "900" }],
                "card-title": ["30px", { "lineHeight": "1.20", "letterSpacing": "normal", "fontWeight": "700" }],
                "section-heading": ["56px", { "lineHeight": "0.95", "letterSpacing": "normal", "fontWeight": "900" }],
                "caption": ["14px", { "lineHeight": "1.43", "letterSpacing": "normal", "fontWeight": "400" }],
                "body": ["16px", { "lineHeight": "1.50", "letterSpacing": "normal", "fontWeight": "400" }],
                "subheading-lg": ["48px", { "lineHeight": "0.95", "letterSpacing": "normal", "fontWeight": "700" }],
                "label-uppercase": ["16px", { "lineHeight": "1.50", "letterSpacing": "0.05em", "fontWeight": "700" }],
                "feature-title": ["24px", { "lineHeight": "1.33", "letterSpacing": "normal", "fontWeight": "700" }]
            },
            "boxShadow": {
                'golden-float': '0 16px 24px rgba(127, 99, 21, 0.1), 0 32px 48px rgba(127, 99, 21, 0.15), 0 64px 96px rgba(127, 99, 21, 0.2)',
                'nav-docked': '0 20px 50px rgba(127,99,21,0.3)'
            }
        }
    }
}
