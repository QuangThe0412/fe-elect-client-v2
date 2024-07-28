/** @type {import('next').NextConfig} */
const nextConfig = {
	reactStrictMode: false,
	images: {
		unoptimized: true,
		remotePatterns: [
			{
				protocol: 'https',
				hostname: 'lh3.google.com',
				port: '',
				pathname: '/u/0/d/',
			},
			{
				protocol: 'https',
				hostname: 'shopping-web-app.vercel.app',
				port: '',
				pathname: '/',
			},
		],
	},
};

export default nextConfig;
