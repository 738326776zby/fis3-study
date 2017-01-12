fis.set('project.fileType.text', 'html');
// 设置某些文件不发布
fis.set('project.ignore', ['**/fis-conf.js']);
// 所有文件携带 md5 戳

// 发布时进行模块化 ，并使用md5 时间戳
fis
// 必须指明 用commonJS
    .hook('commonjs')
    .match('{**.js,**.css,**.png}', {
        isMod: true,
        useHash: true
    })
    .match('*.html', {
        useMap: true
    })

    // mod.js 不进行模块化
    .match('mod.js', {
        isMod: false,
        wrap: false
    })
    .match('::package', {
        //packager: fis.plugin('map'),
        // npm install [-g] fis3-postpackager-loader
        // 分析 __RESOURCE_MAP__ 结构，来解决资源加载问题
        postpackager: fis.plugin('loader'
            //{
            //resourceType: 'commonJs',
            //useInlineMap: true // 资源映射表内嵌
            //}
        )
    });
// 在生产环境中执行
fis.media('prod')
    .match('**.js', {
        // 启用优化处理插件
        optimizer: fis.plugin('uglify-js'),
        release: '/static/js/$0'
    });


