module.exports = {
  devServer: {
    // 自动打开默认浏览器
    open: false,
    //本地
    host: "0.0.0.0",
    port: 8081,
    https: false,
    hotOnly: false,
    /* 使用代理 */
    proxy: {
      "/api": {
        /* 目标代理服务器地址 */
        target: "http://xxx/",
        /* 允许跨域 */
        changeOrigin: true,
      },
    },
  },
  pluginOptions: {
    electronBuilder: {
      mainProcessFile: "electron/main.js",
      preload: "electron/preload.js",
      outputDir: "dist",
      nodeIntegration: true,
      // 打包配置
      builderOptions: {
        appId: "cn.xx.xx",
        productName: "electron-hello",
        copyright: "Copyright © 2021 xx",
        compression: "store", // "store" | "normal"| "maximum" 打包压缩情况(store 相对较快)，store 39749kb, maximum 39186kb
        directories: {
          output: "./dist_electron",
        },
        // files: ["dist/**/*", "electron/**/*"],
        win: {
          icon: './public/256x256.png', // 图标至少256X256
          target: ['nsis', 'zip']
        },
        nsis: {
          // 详情参考https://www.jianshu.com/p/1701baa240fd
          oneClick: false, // 一键安装
          // guid: 'xxxx', // 注册表名字，不推荐修改
          perMachine: true, // 是否开启安装时权限限制（此电脑或当前用户）
          allowElevation: true, // 允许请求提升。 如果为false，则用户必须使用提升的权限重新启动安装程序。
          allowToChangeInstallationDirectory: true, // 允许修改安装目录
          // installerIcon: '.', // 安装图标
          // uninstallerIcon: '', // 卸载图标
          // installerHeaderIcon: '', // 安装时头部图标
          createDesktopShortcut: true, // 创建桌面图标
          createStartMenuShortcut: true, // 创建开始菜单图标
          shortcutName: "tiger-electron-demo", // 用于所有快捷方式的名称。默认为应用程序名称。
        },
      },
    },
  },
};
