import type { NextConfig } from 'next';

const nextConfig: NextConfig = {
    images: {
        remotePatterns: [
            {
                protocol: 'https',
                hostname: 'ivory-rare-wildebeest-562.mypinata.cloud',
                port: '',
                pathname: '/**',
            },
        ],
    },
};

export default nextConfig;
