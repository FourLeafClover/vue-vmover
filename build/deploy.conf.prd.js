module.exports = {
    version: '1.0.0',
    ssh: [{
        host: 'xx.xx.xx.xx', //可以配置多台服务器
        port: 22,
        username: 'root',
        password: 'xxxxx'
    }],
    remoteDir: `/usr/local/nginx/html`, //项目存放路径
    commands: [
        `rm -rf /usr/local/nginx/html` //拷贝之前执行命令,譬如我的发版之前先删掉原因页面包
    ]
};