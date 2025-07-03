/** @type {import('next-sitemap').IConfig} */
module.exports = {
  siteUrl: "https://kamilereon.net",
  generateRobotsTxt: true,
  sitemapSize: 7000,
  changefreq: "daily",
  priority: 1,
  robotsTxtOptions: {
    policies: [
      {
        userAgent: "*",
        allow: "/",
      },
    ],
  },
};