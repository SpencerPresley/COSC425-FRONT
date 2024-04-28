/** @type {import('next').NextConfig} */
const nextConfig = {
    pageExtensions: ['js', 'jsx', 'ts', 'tsx']
};

module.exports = {
    nextConfig,
    logging: {
        fetches: {
            fullUrl: true,
        }
    }
}

