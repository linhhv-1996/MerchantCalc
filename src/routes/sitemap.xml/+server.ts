// src/routes/sitemap.xml/+server.ts
import { tools } from '$lib/config';

export async function GET() {
    // 1. Thay domain thật của bạn vào đây
    const siteUrl = 'https://merchantcalculator.com'; 
    
    // 2. List các trang tĩnh (About, Privacy...)
    const staticPages = [
        '',
        '/about',
        '/contact',
        '/privacy-policy',
        '/terms-of-service',
        // '/sitemap' // Có thể include cả trang HTML sitemap nếu muốn
    ];

    // 3. Tạo header XML
    const xmlHeaders = `<?xml version="1.0" encoding="UTF-8" ?>
    <urlset
      xmlns="http://www.sitemaps.org/schemas/sitemap/0.9"
      xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance"
      xsi:schemaLocation="http://www.sitemaps.org/schemas/sitemap/0.9
            http://www.sitemaps.org/schemas/sitemap/0.9/sitemap.xsd">
    `;

    // 4. Loop qua các trang tĩnh
    const staticEntries = staticPages.map(page => {
        return `
        <url>
            <loc>${siteUrl}${page}</loc>
            <changefreq>monthly</changefreq>
            <priority>0.5</priority>
        </url>
        `;
    }).join('');

    // 5. Loop qua các tool động từ config
    const toolEntries = tools.map(tool => {
        return `
        <url>
            <loc>${siteUrl}/${tool.slug}</loc>
            <changefreq>weekly</changefreq>
            <priority>0.8</priority>
        </url>
        `;
    }).join('');

    // 6. Ghép footer XML
    const sitemap = `${xmlHeaders}${staticEntries}${toolEntries}</urlset>`;

    // 7. Trả về response dạng XML
    return new Response(sitemap, {
        headers: {
            'Content-Type': 'application/xml',
            'Cache-Control': 'max-age=0, s-maxage=3600'
        }
    });
}
