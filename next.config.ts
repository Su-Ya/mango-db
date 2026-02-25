import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  output: "export",
  images: {
    unoptimized: true,
  },
  basePath: "/mango-db",// github repo name, 告訴 Next 所有的路由預設加這一層
  assetPrefix: "/mango-db/",// github repo name, 告訴 Next 所有的靜態檔案抓取路徑加這一層
  /* config options here */
};

export default nextConfig;
