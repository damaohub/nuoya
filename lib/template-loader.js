/*
 * @Author: mao 
 * @Date: 2018-05-10 18:20:09
 * @Description: 模板加载器，nunjucks模板引擎
 * 该加载器会将模板的视图渲染方法注入到koa的上下文中，比如nunjucks是将render方法注入ctx上
 * @Last Modified by: 
 * @Last Modified time: 
 */
const showdown = require('showdown')
var nunjucks = require("nunjucks");

/**
 * 初始化nunjucks配置环境
 * @param {string} view_path 视图存放路径
 * @param {object} options 配置参数，参考nunjucks官方文档
 */
function nunjucksEnvInitial(view_path, options) {
    let autoescape = options.autoescape == undefined ? true : options.autoescape,
        throwOnUndefined = options.autoescape || false,
        watch = options.watch || false,
        noCache = options.noCache || false,
        environment = new nunjucks.Environment(
            new nunjucks.FileSystemLoader(view_path, { watch: watch, noCache: noCache }),
            {
                autoescape: autoescape,
                throwOnUndefined: throwOnUndefined
            }
        );
    //加载传入的过滤器
    if (undefined != options.filters) {
        for (const filter_name in options.filters) {
            environment.addFilter(filter_name, options.filters[filter_name]);
        }
    }
    return environment;
}

/**
 * 绑定视图渲染函数到koa上下文ctx上
 * @param {string} view_path 
 * @param {object} options 
 */
function nunjucksTemplateLoader(view_path, options) {
    var env = nunjucksEnvInitial(view_path, {filters: {
        date: function (time,cFormat) {
            if (arguments.length === 0) {
                return null
            }
            const format = cFormat || '{y}-{m}-{d} {h}:{i}:{s}'
            let date
            if (typeof time === 'object') {
                date = time
            } else {
                if (('' + time).length === 10) time = parseInt(time) * 1000
                date = new Date(time)
            }
            const formatObj = {
                y: date.getFullYear(),
                m: date.getMonth() + 1,
                d: date.getDate(),
                h: date.getHours(),
                i: date.getMinutes(),
                s: date.getSeconds(),
                a: date.getDay()
            }
            const time_str = format.replace(/{(y|m|d|h|i|s|a)+}/g, (result, key) => {
                let value = formatObj[key]
                if (key === 'a') return ['一', '二', '三', '四', '五', '六', '日'][value - 1]
                if (result.length > 0 && value < 10) {
                    value = '0' + value
                }
                return value || 0
            })
            return time_str
        },
        m2h: function(content) {
            converter = new showdown.Converter()
            return converter.makeHtml(content)
        }
        }
    });
    return async (ctx, next) => {
        ctx.render = function (view, model) {
            ctx.response.body = env.render(view, Object.assign({}, ctx.state || {}, model || {}));
            ctx.response.type = "text/html";
        }
        await next();
    }
}


module.exports = nunjucksTemplateLoader


