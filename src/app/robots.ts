// app/robots.ts
import { MetadataRoute } from 'next'

export default function robots(): MetadataRoute.Robots {
  const baseUrl = 'https://esmeraldacompany.com.br' 
  
  return {
    rules: [
      {
        userAgent: '*',
        allow: [
          '/',
          '/sobre',
          '/projetos',
          '/projetos/*',
          '/blog',
          '/blog/*', 
          '/contato',
          '/recursos',
          '/newsletter',
          '/faq',
        ],
        disallow: [
          '/api/',
          '/admin/',
          '/studio/', 
          '/private/',
          '/dashboard/',
        ],
      },
      // Regras específicas para Googlebot
      {
        userAgent: 'Googlebot',
        allow: '/',
        disallow: ['/api/', '/admin/'],
        crawlDelay: 1, 
      },
    ],
    sitemap: `${baseUrl}/sitemap.xml`,
    
    // 👇 Host directive 
    host: baseUrl,
  }
}