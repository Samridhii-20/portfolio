/** @type {import('tailwindcss').Config} */
export default {
  darkMode: "class",
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        "primary-fixed-dim": "#adc6ff",
        "outline": "#8c909f",
        "primary-fixed": "#d8e2ff",
        "on-tertiary-fixed": "#3e0022",
        "surface-tint": "#adc6ff",
        "on-primary-fixed": "#001a42",
        "surface": "#0c1324",
        "tertiary": "#ffb0cd",
        "on-error-container": "#ffdad6",
        "tertiary-fixed": "#ffd9e4",
        "on-background": "#dce1fb",
        "error-container": "#93000a",
        "tertiary-container": "#f751a1",
        "on-secondary-container": "#c4abff",
        "secondary-fixed-dim": "#d0bcff",
        "on-surface-variant": "#c2c6d6",
        "surface-container-highest": "#2e3447",
        "on-primary-fixed-variant": "#004395",
        "surface-bright": "#33394c",
        "primary": "#adc6ff",
        "error": "#ffb4ab",
        "surface-container": "#191f31",
        "on-tertiary": "#640039",
        "on-tertiary-fixed-variant": "#8c0053",
        "surface-variant": "#2e3447",
        "inverse-primary": "#005ac2",
        "surface-container-high": "#23293c",
        "on-secondary-fixed": "#23005c",
        "surface-container-lowest": "#070d1f",
        "secondary-fixed": "#e9ddff",
        "primary-container": "#4d8eff",
        "on-primary": "#002e6a",
        "on-secondary": "#3c0091",
        "background": "#0c1324",
        "secondary": "#d0bcff",
        "tertiary-fixed-dim": "#ffb0cd",
        "on-primary-container": "#00285d",
        "on-surface": "#dce1fb",
        "secondary-container": "#571bc1",
        "outline-variant": "#424754",
        "on-error": "#690005",
        "inverse-surface": "#dce1fb",
        "surface-dim": "#0c1324",
        "surface-container-low": "#151b2d",
        "on-tertiary-container": "#570032",
        "inverse-on-surface": "#2a3043",
        "on-secondary-fixed-variant": "#5516be"
      },
      borderRadius: {
        "DEFAULT": "0.25rem",
        "lg": "0.5rem",
        "xl": "0.75rem",
        "full": "9999px"
      },
      spacing: {
        "stack-lg": "80px",
        "stack-sm": "16px",
        "gutter": "32px",
        "unit": "8px",
        "stack-md": "32px",
        "margin-page": "64px",
        "container-max": "1280px"
      },
      fontFamily: {
        "body-lg": ["Inter"],
        "label-caps": ["Space Grotesk"],
        "h3": ["Space Grotesk"],
        "body-md": ["Inter"],
        "h1": ["Space Grotesk"],
        "h2": ["Space Grotesk"]
      },
      fontSize: {
        "body-lg": ["18px", {"lineHeight": "1.6", "letterSpacing": "0.01em", "fontWeight": "400"}],
        "label-caps": ["12px", {"lineHeight": "1.0", "letterSpacing": "0.2em", "fontWeight": "700"}],
        "h3": ["32px", {"lineHeight": "1.3", "letterSpacing": "0.02em", "fontWeight": "600"}],
        "body-md": ["16px", {"lineHeight": "1.6", "letterSpacing": "0.01em", "fontWeight": "400"}],
        "h1": ["80px", {"lineHeight": "1.1", "letterSpacing": "0.05em", "fontWeight": "700"}],
        "h2": ["48px", {"lineHeight": "1.2", "letterSpacing": "0.02em", "fontWeight": "600"}]
      }
    },
  },
  plugins: [
    require('@tailwindcss/forms'),
    require('@tailwindcss/container-queries')
  ],
}
