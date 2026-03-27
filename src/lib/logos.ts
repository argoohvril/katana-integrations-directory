export function getLogoUrl(website: string): string {
  const domain = website.replace(/^https?:\/\//, "").replace(/\/.*$/, "");
  return `https://www.google.com/s2/favicons?domain=${domain}&sz=128`;
}

export function getFallbackLogoUrl(website: string): string {
  const domain = website.replace(/^https?:\/\//, "").replace(/\/.*$/, "");
  return `https://logo.clearbit.com/${domain}?size=128`;
}
