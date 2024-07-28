import { MetadataRoute } from 'next';
import { paths } from '@/lib/paths';
import configEnv from '@/configEnv';

export default function robots(): MetadataRoute.Robots {
    const urlSiteMap = configEnv.NEXT_PUBLIC_DOMAIN;
    return {
        rules: [
            {
                userAgent: '*',
                allow: '/',
                disallow: [
                    `${paths.cart}`,
                    `${paths.login}`,
                    `${paths.register}`,
                ],
            },
        ],
        sitemap: `${urlSiteMap}/sitemap.xml`,
    };
}