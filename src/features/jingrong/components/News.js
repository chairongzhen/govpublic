/*
 * @overview:
 * @Author: jfzhang.Jeffry
 * @LastEditors: jfzhang.Jeffry
 * @Date: 2020-09-25 09:59:27
 */
import React, { useState, useEffect } from 'react';
import centerImg from '../images/tanchuang.svg';
import close from '../images/close.svg';
import { getSessionId } from '../../../common/jsBirdge';
import { getQueryString } from '../../../utils/util';
import moment from 'miment';
import tableCss from 'antd/lib/table/style/css';

const sessionId = getSessionId();
const host = getQueryString('host') || '';
const newUrl = `${host}/govwebapi/gov/web/api/bs-citycenter/news/get`;
const business = (id) => {
    return {
        business: {
            dataType: '1',
            id: id,
        },
    };
};

const getNew = (id) => {
    return fetch(newUrl, {
        method: 'post',
        headers: {
            'Content-Type': 'application/json',
            'wind.sessionid': sessionId,
        },
        body: JSON.stringify(business(id)),
    })
        .then((response) => {
            if (!response.ok) {
                return Promise.reject(response.status);
            }
            return response.json();
        })
        .then((res) => {
            if (res.resultCode === '200') {
                return Promise.resolve(res.resultData);
            } else {
                return Promise.reject(res);
            }
        })
        .catch((err) => {
            console.error('网络错误：', err);
            return Promise.reject(err);
        });
};

const dateChange = (oldDate) => {
    return moment(oldDate).format('YYYY-MM-DD hh:mm');
};

const News = (props) => {
    const { setDisplayNew, id } = props;
    const [news, setNews] = useState({});

    const onClose = () => {
        setDisplayNew(0);
    };

    useEffect(() => {
        console.log('zjf---id:', id);
        if (id) {
            getNew(id).then((res) => {
                const n = {};
                n.title = res?.dataListObj.dataList[0].title;
                console.log(
                    'zjf---res?.dataListObj.dataList[0].content[0]:',
                    res?.dataListObj.dataList[0].content[0]
                );

                n.content = res?.dataListObj.dataList[0].content[0].replace(
                    /(<IMG){1}[\s\S]*(>){1}/gi,
                    '<br/><div>内容包含图片，查看请访问Wind金融终端财经新闻栏目</div><br/>'
                );

                n.date = dateChange(res?.dataListObj.dataList[0].date);
                n.sitename = res?.dataListObj.dataList[0].sitename;
                setNews(n);
                // console.log("zjf---nnnnnnn:", n);
            });
        }
    }, [id, setNews]);

    return (
        <div className='tanchuang' style={props.display ? {} : { display: 'none' }}>
            <div className='background'>
                <object id='mySvg' data={centerImg} type='image/svg+xml'>
                    加载失败
                </object>
            </div>
            <div className='close-close' onClick={onClose}>
                <img src={close} alt='close' title='关闭' />
            </div>
            <div className='news-contemt'>
                <div className='news-center'>
                    <div className='news-title'>{news?.title}</div>
                    <div className='news-date'>
                        <div className='news-frist'>{news?.sitename}</div>
                        <div className='news-second'>{news?.date}</div>
                    </div>
                    <hr />
                    <div
                        dangerouslySetInnerHTML={{ __html: news?.content }}
                        className='news-content'
                    ></div>
                </div>
            </div>
        </div>
    );
};

export default News;
