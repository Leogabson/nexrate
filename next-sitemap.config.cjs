/** @type {import('next-sitemap').IConfig} */
module.exports = {
  siteUrl: "https://nexrate.vercel.app", // change to nexrate.io when domain is ready
  generateRobotsTxt: true, // will also generate robots.txt
  sitemapSize: 7000,
  changefreq: "daily",
  priority: 0.7,
};
