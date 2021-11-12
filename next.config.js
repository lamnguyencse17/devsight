/** @type {import('next').NextConfig} */
module.exports = {
  reactStrictMode: true,
  env: {
    GOOGLE_CLIENT_ID: process.env.GOOGLE_CLIENT_ID,
    FB_APP_ID: process.env.FB_APP_ID,
    FB_API_VERSION: process.env.FB_API_VERSION
  }
}
