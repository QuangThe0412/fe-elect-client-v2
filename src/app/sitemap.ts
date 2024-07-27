import { MetadataRoute } from 'next'
import configEnv from '@/configEnv';
import { paths } from '@/lib/paths';

export default function sitemap(): MetadataRoute.Sitemap {
    const urlSiteMap = configEnv.NEXT_PUBLIC_DOMAIN;
    const pathProduct = `${urlSiteMap}${paths.products}`;
    const pathDetails = `${urlSiteMap}${paths.details}`;
    return [
        {
            url: `${urlSiteMap}`,
            lastModified: new Date(),
            changeFrequency: 'yearly',
            priority: 1,
        },
        {
            url: `${pathProduct}`,
            lastModified: new Date(),
            changeFrequency: 'monthly',
            priority: 0.8,
        },
        {
            url: `${pathDetails}`,
            lastModified: new Date(),
            changeFrequency: 'weekly',
            priority: 0.5,
        },
    ]
}