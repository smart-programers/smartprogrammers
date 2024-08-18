/** @type {import('next').NextConfig} */
const nextConfig = {
    images: {
        remotePatterns: [
          {
            protocol: 'https',
            hostname: 't3.ftcdn.net',
            pathname: '/**', // Match any path
          },
          {
                  protocol: 'https',
                  hostname: 'mtonnsxvkvxzdhnzfxwb.supabase.co',
                  port: '',
                  pathname: '/storage/v1/object/public/files/**',
                },
        ],
      },
};

export default nextConfig;
