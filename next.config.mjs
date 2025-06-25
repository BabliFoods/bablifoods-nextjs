/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'cpgifjznjlvwpncsebef.supabase.co', // Replace with your Supabase project domain if different
        pathname: '/storage/v1/object/public/**',
      },
    ],
  },
};

export default nextConfig;
