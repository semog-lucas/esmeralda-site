/** @type {import('next-sitemap').IConfig} */
module.exports = {
  // URL base do seu site
  siteUrl: 'https://esmeraldacompany.com.br',
  
  // Gerar robots.txt automaticamente
  generateRobotsTxt: true,
  
  // Opções do robots.txt
  robotsTxtOptions: {
    policies: [
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
          '/perfil',
          '/termos-e-condicoes',
        ],
        disallow: [
          '/api/*',
          '/admin/*',
          '/studio/*',
          '/private/*',
          '/dashboard/*',
          '/_next/*',
          '/404',
          '/500',
        ],
      },
      {
        userAgent: 'Googlebot',
        allow: '/',
        disallow: ['/api/*', '/admin/*'],
        crawlDelay: 1,
      },
      {
        userAgent: 'Bingbot',
        allow: '/',
        disallow: ['/api/*', '/admin/*'],
        crawlDelay: 2,
      },
    ],
    
    // Sitemaps adicionais (se você tiver outros no futuro)
    additionalSitemaps: [],
  },
  
  // Excluir estas rotas do sitemap
  exclude: [
    '/api/*',
    '/admin/*',
    '/studio/*',
    '/private/*',
    '/dashboard/*',
    '/404',
    '/500',
    '/server-sitemap.xml', // Se você tiver um dinâmico
  ],
  
  // Configurações padrão para todas as URLs
  changefreq: 'weekly',
  priority: 0.7,
  autoLastmod: true,
  
  // Transform function para prioridades customizadas
  transform: async (config, path) => {
    // Defina prioridades customizadas para cada rota
    const customPriorities = {
      '/': 1.0,
      '/sobre': 0.8,
      '/projetos': 0.9,
      '/blog': 0.9,
      '/contato': 0.7,
      '/recursos': 0.6,
      '/newsletter': 0.5,
      '/faq': 0.6,
      '/perfil': 0.7,
      '/termos-e-condicoes': 0.3,
    }
    
    // Frequências de mudança customizadas
    const customChangefreq = {
      '/': 'weekly',
      '/sobre': 'monthly',
      '/projetos': 'weekly',
      '/blog': 'weekly',
      '/contato': 'monthly',
      '/recursos': 'monthly',
      '/newsletter': 'monthly',
      '/faq': 'monthly',
      '/perfil': 'monthly',
      '/termos-e-condicoes': 'yearly',
    }
    
    return {
      loc: path,
      changefreq: customChangefreq[path] || config.changefreq,
      priority: customPriorities[path] || config.priority,
      lastmod: config.autoLastmod ? new Date().toISOString() : undefined,
    }
  },
  
  // Configurações avançadas
  generateIndexSitemap: false,
  sourceDir: '.next',
  outDir: 'public',
}