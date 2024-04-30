/** @type {import('next').NextConfig} */
const nextConfig = {
    pageExtensions: ['js', 'jsx', 'ts', 'tsx'],
    logging: {
        fetches: {
            fullUrl: true,
        }
    }
};

module.exports = nextConfig;
