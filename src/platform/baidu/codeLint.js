const fs = require('fs');
const readline = require('readline');
const gulp = require('gulp');
const replace = require('gulp-replace');
const through2 = require('through2');

function codeLint(opt = {}) {
    const src = opt.source || './src';

    // /**/*.wxss image样式异常修复方式待确认 反馈9

    var errInWxml = [];
    var isErrInWxml = false;
    var warnInWxml = {
        'warningInfo':[
            "bind*={{str}} str不能包含函数调用（如：bindtap='flag ? 'fn1' : 'fn2''）",
            "wx:for={{arr}}  `arr`不能包含函数调用（如：`wx:for='{{flag ? arr1 : arr2}}'`）",
            "在同一个标签上，`wx:for`和`wx:if`不能同时使用  可使用block包裹一层"
        ],
        currentWaring: 0
    };
    gulp.src(src + "/**/*.wxml")
    //bind*={{str}}   str不能包含函数调用（如：bindtap="flag ? 'fn1' : 'fn2'"） bindtap='{{search ? "tosearch" : ""}}'
        .pipe(replace(/bind.*["'].*\?.*}}["']/ig, function(match, p1){
            if(match.split(' ')[0].includes('?')){
                errInWxml.push(match);
                warnInWxml.currentWaring = 0;
                isErrInWxml = true;
            }
        }))
    //wx:for={{arr}} arr中不能包括函数调用 三元表达式也不行
        .pipe(replace(/wx:for.*\?.*}}["']/ig, function(match, p1){
            errInWxml.push(match);
            warnInWxml.currentWaring = 1;
            isErrInWxml = true;
        }))
    //在同一个标签上，wx:for和wx:if不能同时使用
        .pipe(replace(/<.+wx[:-]for.*\s*>/ig, function(match, p1){
            if(match.includes('wx:if') || match.includes('wx-if')){
                errInWxml.push(match);
                warnInWxml.currentWaring = 2;
                isErrInWxml = true;
            }
        }))
    //自定义属性 data-infoId 驼峰形式应该修正为data-info-id 同时建议在js中使用驼峰形式获取e.currentTarget.dataset.infoId

        .pipe(through2.obj(function(file, enc, callback){
            if(isErrInWxml){
                lintContainer(file.path, errInWxml, warnInWxml.warningInfo[warnInWxml.currentWaring]);
            }
            isErrInWxml = false;
            errInWxml = [];
            callback();
        }))
}
function lintContainer(filePath, errCodes, warning){
    var realPath = './demo'+filePath.split('/demo')[1]; //获取当前文件路径
    console.log('文件 '+realPath+' 存在 '+errCodes.length+' 处异常语法需要修复，具体异常如下：');
    var fRead = fs.createReadStream(realPath);
    var objReadline = readline.createInterface({input: fRead});
    var index = 1;
    objReadline.on('line', (line)=>{
        errCodes.forEach(errCode => {
            if(line.includes(errCode)){
                console.log('第 '+index+' 行有异常代码\n建议修改此段代码 '+errCode+'\n修复提示：'+warning+'\n');
            } 
        });
        index++;
    });
    objReadline.on('close', ()=>{
        // console.log('readline close...');
    })
}

module.exports = codeLint;
