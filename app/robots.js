
export default function robots() {
    return {
      rules: {
        userAgent: '*',
        allow: '/',
        disallow: '/private',
      },
      sitemap: 'https://www.runpen.ca/sitemap.xml',
    }
  }