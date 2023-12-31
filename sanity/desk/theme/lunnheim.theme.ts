import { buildLegacyTheme } from "sanity"

export const themeProps = {
  "--lunnheim-black": "#302C19",
  "--lunnheim-white": "#E9D1A0",
  "--lunnheim-olive": "#AA9966",
  "--lunnheim-dark-olive": "#474224",
  "--lunnheim-pale-yellow": "#E9D1A0",
  "--lunnheim-ivory-yellow": "#FFF6DE",
  "--lunnheim-vibrant-yellow": "#FFBE2E",
  "--lunnheim-dusty-pink": "#EFB9AB",
  "--lunnheim-light-pink": "#D9D9D9",
}

export const lunnheimTheme = buildLegacyTheme({
  /* Base theme colors */
  "--black": themeProps["--lunnheim-black"],
  "--white": themeProps["--lunnheim-white"],
  "--gray": themeProps["--lunnheim-white"],
  "--gray-base": themeProps["--lunnheim-white"],
  "--font-family-base": "var(--font-arizona)",
  "--font-family-monospace": "var(--font-grotesk)",

  /* Component */
  "--component-bg": themeProps["--lunnheim-black"],
  "--component-text-color": themeProps["--lunnheim-white"],
  "--default-button-color": themeProps["--lunnheim-white"],

  /* Brand */
  "--brand-primary": themeProps["--lunnheim-white"],

  /* State */
  "--state-info-color": themeProps["--lunnheim-light-pink"],
  "--state-success-color": themeProps["--lunnheim-ivory-yellow"],
  "--state-warning-color": themeProps["--lunnheim-light-pink"],
  "--state-danger-color": themeProps["--lunnheim-light-pink"],
  "--default-button-danger-color": themeProps["--lunnheim-dusty-pink"],
  "--default-button-success-color": themeProps["--lunnheim-olive"],
  "--default-button-warning-color": themeProps["--lunnheim-dusty-pink"],

  /* Navbar */
  "--main-navigation-color": themeProps["--lunnheim-black"],
  "--main-navigation-color--inverted": themeProps["--lunnheim-white"],
})
