import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  output: "export",
  images: {
    unoptimized: true,
  },
  basePath: "/mango-db",// github repo name, 告訴 Next 所有的路由預設加這一層
  assetPrefix: "/mango-db/",// github repo name, 告訴 Next 所有的靜態檔案抓取路徑加這一層
  trailingSlash: true, // 強制產生 /index.html 資料夾結構，解決 GitHub Pages 找不到檔案的問題
  /* config options here */
};

export default nextConfig;
