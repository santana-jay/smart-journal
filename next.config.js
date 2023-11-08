/** @type {import('next').NextConfig} */
const nextConfig = {
    typescript: {
        ignoreBuildErrors: true,
    },
    eslint: {
        ignoreDuringBuilds: true,
        ignoreDuringBuilds: true,
    },
    // experimental: {
    //     urlImports: ['/journal'],
    // },
}

module.exports = nextConfig
