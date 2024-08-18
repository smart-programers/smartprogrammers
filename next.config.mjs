/** @type {import('next').NextConfig} */
const nextConfig = {
    images: {
        domains: ['t3.ftcdn.net'], // Add your external domains here
      }, 
};


// const nextConfig = { images: {
//   remotePatterns: [
//     {
//       protocol: 'https',
//       hostname: 'mtonnsxvkvxzdhnzfxwb.supabase.co',
//       port: '',
//       pathname: '/storage/v1/object/public/files/**',
//     },
//   ],
// },}

export default nextConfig;
