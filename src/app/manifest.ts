import { MetadataRoute } from 'next'

export default function manifest(): MetadataRoute.Manifest {
    return {
        name: "Điện nước Tâm Nhi",
        short_name: "Tâm Nhi",
        description: "Chuyên cung cấp sĩ lẻ thiết bị điện nước chính hãng",
        icons: [
            {
                "src": "https://salt.tikicdn.com/ts/upload/2f/51/80/5643672027a54bfa593300f53c91c12a.png",
                "sizes": "192x192",
                "type": "image/png",
            },
            {
                "src": "https://salt.tikicdn.com/ts/upload/2f/51/80/5643672027a54bfa593300f53c91c12a.png",
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