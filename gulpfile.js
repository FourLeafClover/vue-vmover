var gulp = require('gulp');
var GulpSSH = require('gulp-ssh');
var minimist = require('minimist');

//载入配置文件
var knownOptions = {
    string: 'env',
    default: {
        env: ""
    }
};
var options = minimist(process.argv.slice(2), knownOptions);
var config = require(`./build/deploy.conf.${options.env}.js`);

var ssConfighList = config.ssh;
var deployTasks = [];
ssConfighList.forEach(ssh => {
    deployTasks.push("deployFileTask" + ssh.host);
});
gulp.task('default', deployTasks);
ssConfighList.forEach(sshConfig => {
    var gulpSSH = new GulpSSH({
        ignoreErrors: false,
        sshConfig: sshConfig
    });
    let deployFileTaskID = "deployFileTask" + sshConfig.host;
    let execSSHTaskID = 'execSSHTask' + sshConfig.host;
    gulp.task(deployFileTaskID, [execSSHTaskID], () => {
        console.log(`正在上传文件到${sshConfig.host}服务器`);
        return gulp
            .src(['./dist/**'])
            .pipe(gulpSSH.dest(config.remoteDir));
    });
    gulp.task(execSSHTaskID, () => {
        console.log(`正在删除${sshConfig.host}服务器文件`);
        return gulpSSH.shell(config.commands, {
                filePath: `commands.${sshConfig.serverID}.log`
            })
            .pipe(gulp.dest('logs'));
    });
});