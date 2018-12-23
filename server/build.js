var marked = require('marked');
var fs = require('fs');
var path = require('path');

// 源文件路径
var srcPath = path.join(__dirname, './md');
// 打包的html路径
var distPath = path.join(__dirname, '../articles');
var files = fs.readdirSync(srcPath);
files.forEach(file => {
    console.log('its turn to', file);
    fs.readFile(path.join(srcPath, file), 'utf8', function(err, data){
        fs.writeFile(path.join(distPath, Date.now() + '.html'), marked(data), function(err){
            if(err) console.log(file, 'writed failed');
            else console.log(file, 'writed success');
        });
    });
});
