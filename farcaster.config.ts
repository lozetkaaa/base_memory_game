const ROOT_URL =
  process.env.NEXT_PUBLIC_URL ||
  (process.env.VERCEL_PROJECT_PRODUCTION_URL ? `https://${process.env.VERCEL_PROJECT_PRODUCTION_URL}` : 'http://localhost:3000');

export const farcasterConfig = {
  accountAssociation: {
    header: "eyJmaWQiOi0xLCJ0eXBlIjoiYXV0aCIsImtleSI6IjB4MDRmMTg0N2I2NDY4NTZhMDQ3MjZlNjkwRjkyMENlNDY1RGE4M0FjQSJ9",
    payload: "eyJkb21haW4iOiJiYXNlbWVtb3J5Z2FtZS52ZXJjZWwuYXBwIn0",
    signature: "AAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAACAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAgAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAABAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAgAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAIAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAADAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAASAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAFwAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAABHjCbQMDL0avKqifnL1lVJ_B3nh-RmMdrNBQHmLgMrDoccMIvnZoOodbfuY3O2gydt_LSm8GvNVedBID07XjTmwAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAl8ZgIay2xclZzG8RWZzuWvO8j9R0fus3XxDee9lRlVy8dAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAACKeyJ0eXBlIjoid2ViYXV0aG4uZ2V0IiwiY2hhbGxlbmdlIjoiR1JUWkhRcTZwTTFseUpFQXJTLUhTVC1oZnlZc3RaR3l2ajRLX3hyWjhQZyIsIm9yaWdpbiI6Imh0dHBzOi8va2V5cy5jb2luYmFzZS5jb20iLCJjcm9zc09yaWdpbiI6ZmFsc2V9AAAAAAAAAAAAAAAAAAAAAAAAAAAAAA"
  },
  miniapp: {
    version: "1",
    name: "Crypto Memory",
    subtitle: "Find crypto pairs!",
    description: "A fun memory card game with crypto icons. Find all matching pairs!",
    screenshotUrls: [`${ROOT_URL}/screenshot-portrait.png`],
    iconUrl: `${ROOT_URL}/blue-icon.png`,
    splashImageUrl: `${ROOT_URL}/blue-hero.png`,
    splashBackgroundColor: "#0a0a1a",
    homeUrl: ROOT_URL,
    webhookUrl: `${ROOT_URL}/api/webhook`,
    primaryCategory: "games",
    tags: ["game", "memory", "crypto", "base"],
    heroImageUrl: `${ROOT_URL}/blue-hero.png`,
    tagline: "Test your memory with crypto!",
    ogTitle: "Crypto Memory Game",
    ogDescription: "Find all matching crypto pairs!",
    ogImageUrl: `${ROOT_URL}/blue-hero.png`,
  },
} as const;

