import configEnv from '@/configEnv'
import { generateLinkGoogleImage } from '@/lib/utils';
import { MetadataRoute } from 'next'

export default function manifest(): MetadataRoute.Manifest {
    const src = generateLinkGoogleImage(configEnv.NEXT_PUBLIC_LOGO as string);
    return {
        name: "Điện nước Tâm Nhi",
        short_name: "Tâm Nhi",
        description: "Chuyên cung cấp sĩ lẻ thiết bị điện nước chính hãng",
        icons: [
            {
                "src": `${src}`,
                "sizes": "192x192",
                "type": "image/png",
            },
            {
                "src": `${src}`,
                "sizes": "512x512",
                "type": "image/png",
            }
        ],
        theme_color: "#1A94FF",
        background_color: "#1A94FF",
        start_url: "/",
        display: "standalone",
        orientation: "portrait",
        scope: "/",
    }
}