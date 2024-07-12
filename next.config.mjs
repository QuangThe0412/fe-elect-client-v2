/** @type {import('next').NextConfig} */
const nextConfig = {
	reactStrictMode: false,
	images: {
		remotePatterns: [
			{
				protocol: 'https',
				hostname: 'lh3.google.com',
				port: '',
				pathname: '/u/0/d/',
			},
		],
	},
};

export default nextConfig;
