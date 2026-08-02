export default {
  plugins: {
    tailwindcss: {},
    autoprefixer: {},
    // Rewrites font-display: swap → optional on every @font-face block at build time.
    // This overrides @fontsource's default 'swap' without editing node_modules.
    // 'optional' = browser skips the post-paint font swap on slow connections,
    // eliminating the mobile CLS reflow on the LIVE_PROCESS_MONITOR card and
    // any other element where a late font swap would cause a layout shift.
    'postcss-font-display': { display: 'fallback', replace: true },
  },
}