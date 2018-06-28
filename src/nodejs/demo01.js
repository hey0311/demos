var express = require('express');
var app = express();
var utility=require('utility');
var superagent=require('superagent');//发送http请求的，爬虫
var cheerio=require('cheerio');//分析网页
var eventproxy = require('eventproxy');
var url = require('url');

var cnodeUrl = 'https://cnodejs.org/';

app.get('/', function (req, response) {
/*    var q=req.query.q;//获取get的q参数的值
    var md5Value=utility.md5(q);
    res.send(md5Value);*/
    superagent.get(cnodeUrl)
        .end(function (err, res) {
            if (err) {
                return console.error(err);
            }
            var topicUrls = [];
            var $ = cheerio.load(res.text);
            // 获取首页所有的链接
            $('#topic_list .topic_title').each(function (idx, element) {
                var $element = $(element);
                // $element.attr('href') 本来的样子是 /topic/542acd7d5d28233425538b04
                // 我们用 url.resolve 来自动推断出完整 url，变成
                // https://cnodejs.org/topic/542acd7d5d28233425538b04 的形式
                // 具体请看 http://nodejs.org/api/url.html#url_url_resolve_from_to 的示例
                var href = url.resolve(cnodeUrl, $element.attr('href'));
                topicUrls.push(href);
            });

            console.log(topicUrls);
            var ep = new eventproxy();

            ep.after('topic_html', topicUrls.length, function (topics) {
                topics = topics.map(function (topicPair) {
                    var topicUrl = topicPair[0];
                    var topicHtml = topicPair[1];
                    var $ = cheerio.load(topicHtml);
                    return ({
                        title: $('.topic_full_title').text().trim(),
                        href: topicUrl,
                        comment1: $('.reply_content').eq(0).text().trim(),
                    });
                });

                console.log('final:');
                console.log(topics);
                response.send(topics)
            });

            topicUrls.forEach(function (topicUrl) {
                superagent.get(topicUrl)
                    .end(function (err, res) {
                        console.log('fetch ' + topicUrl + ' successful');
                        ep.emit('topic_html', [topicUrl, res.text]);
                    });
            });
        });
});
app.listen(3005, function () {
    console.log('app is listening at port 3005');
});
