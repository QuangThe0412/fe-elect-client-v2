import dotenv from 'dotenv';
import path from 'path';

const envFile = process.env.APP_ENV === 'pro' ? '.env.prodction' : '.env.development';
dotenv.config({ path: path.resolve(envFile) });

const configEnv = {
    NEXT_PUBLIC_API_URL : process.env.NEXT_PUBLIC_API_URL,
    NEXT_PUBLIC_LINK_IMAGE_GG : process.env.NEXT_PUBLIC_LINK_IMAGE_GG,
    NEXT_PUBLIC_SECRET_KEY_ACCESS : process.env.NEXT_PUBLIC_SECRET_KEY_ACCESS,
    NEXT_PUBLIC_SECRET_KEY_REFRESH : process.env.NEXT_PUBLIC_SECRET_KEY_REFRESH,
};

export default configEnv;