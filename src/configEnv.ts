import dotenv from 'dotenv';
import path from 'path';

const envFile = process.env.APP_ENV === 'pro' ? '.env.production' : '.env.development';
dotenv.config({ path: path.resolve(envFile) });

const configEnv = {
    NEXT_PUBLIC_API_URL: process.env.NEXT_PUBLIC_API_URL,
    NEXT_PUBLIC_LINK_IMAGE_GG: process.env.NEXT_PUBLIC_LINK_IMAGE_GG,
    NEXT_PUBLIC_LIMIT: process.env.NEXT_PUBLIC_LIMIT,
    NEXT_PUBLIC_DOMAIN: process.env.NEXT_PUBLIC_DOMAIN,
    NEXT_PUBLIC_LOGO: process.env.NEXT_PUBLIC_LOGO,
};

export default configEnv;
