/*
 * @Author: jfzhang.Jeffry
 * @LastEditors: jfzhang.Jeffry
 * @Date: 2020-09-04 15:18:24
 * @Descripttion:
 */
import React, { useState, useEffect } from 'react';
// import PropTypes from 'prop-types';
import shanghai from './jsondata/shanghai.json';
import companyNameVs from './jsondata/companyName.json';
import { getSessionId } from '../../../common/jsBirdge';
import { getQueryString } from '../../../utils/util';
import { useRequest } from 'ahooks';
import moment from 'miment';
import star from '../images/star.svg';
import { Carousel } from 'antd';
import WindLOGO from '../images/WindLOGO.svg';
import close from '../images/close.svg';

const sessionId = getSessionId();
const host = getQueryString('host') || '';
const url = `${host}/govwebapi/gov/web/api/bs-citycenter/news/get`;
const url2 = `${host}/govwebapi/gov/web/api/bs-citycenter/news/getlist`;
const business1 = {
    business: {
        dataType: '0',
        mediatype: '0',
    },
};

const business2 = {
    business: {
        dataType: '0',
        mediatype: '1',
    },
};

// 可以接收pageno，pagesize，windcode
const business3 = {
    business: {
        pagesize: 40,
    },
};

const getNews = (business, urlK = url) => {
    return fetch(urlK, {
        method: 'post',
        headers: {
            'Content-Type': 'application/json',
            'wind.sessionid': sessionId,
        },
        body: JSON.stringify(business),
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

/* ------------------------------------------------------------------------------------- */

const timeRender = (text) => text.replace('T', ' ').replace('Z', '');

/* ------------------------------------------------------------------------------------- */

const getStars = (data) => {
    const EventDetailTypeName = [];
    let resultGao = 0;
    let resultZhong = 0;
    let resultDi = 0;
    data.forEach((value) => {
        shanghai.shanghai.some((item) => {
            // ==
            if (item.EventDetailTypeCode == value) {
                EventDetailTypeName.push(`${item.EventDetailTypeName}`);
                if (item.ImportantLevel < 3) {
                    return true;
                } else if (item.ImportantLevel === 3) {
                    resultDi++;
                } else if (item.ImportantLevel === 4) {
                    resultZhong++;
                } else if (item.ImportantLevel === 5) {
                    resultGao++;
                }
                return true;
            }
            return false;
        });
    });
    if (resultGao === 1) {
        return {
            star: [1, 1, 1, 1],
            EventDetailTypeName,
        };
    } else if (resultGao >= 2) {
        return {
            star: [1, 1, 1, 1, 1],
            EventDetailTypeName,
        };
    } else if (resultZhong === 1) {
        return {
            star: [1, 1],
            EventDetailTypeName,
        };
    } else if (resultZhong === 2) {
        return {
            star: [1, 1, 1],
            EventDetailTypeName,
        };
    } else if (resultDi > 0) {
        return {
            star: [1],
            EventDetailTypeName,
        };
    }
    return {
        star: [],
        EventDetailTypeName,
    };
};

/* ------------------------------------------------------------------------------------- */

const shanghaiNewsCarouselTime = 10000;
const shanghaiNewsRequestTime = shanghaiNewsCarouselTime * 8;

export default function RightLayout({ showNew }) {
    const [tabDisplay, setTabDisplay] = useState(3);
    const [hotNews, setHotNews] = useState();
    const [recommend, setRecommend] = useState();
    const [shanghaiNews, setShanghaiNews] = useState();
    const { data: data1 } = useRequest(
        () => {
            return getNews(business1);
        },
        {
            pollingInterval: 1000 * 60 * 10,
            pollingWhenHidden: false,
        }
    );
    const { data: data2 } = useRequest(
        () => {
            return getNews(business2);
        },
        {
            pollingInterval: 1000 * 60 * 10,
            pollingWhenHidden: false,
        }
    );
    const { data: data3 } = useRequest(
        () => {
            return getNews(business3, url2);
        },
        {
            pollingInterval: shanghaiNewsRequestTime,
            pollingWhenHidden: false,
        }
    );

    /*   useEffect(() => {
    if (getQueryString('ka') == 2) {
      console.log('zjf---要关闭:', window.opener);
      //   window.close();
    }
  }, []); */

    /* ------------------------------------------------------------------------------------- */

    useEffect(() => {
        if (data1) {
            const tempHotNews = [];
            data1?.dataListObj?.dataList.map((item) => {
                const t = [];
                t.push(item.title[0]);
                t.push(item.date[0].slice(0, 10));
                t.push(item.id[0]);
                tempHotNews.push(t);
            });
            // console.log("zjf---tempHotNews:", tempHotNews);
            setHotNews(tempHotNews);
        }

        if (data2) {
            const tempRecommend = [];
            data2?.dataListObj?.dataList.map((item) => {
                const t = [];
                t.push(item.title[0]);
                t.push(item.date[0].slice(0, 10));
                t.push(item.id[0]);
                tempRecommend.push(t);
            });
            // console.log("zjf---tempRecommend:", tempRecommend);
            setRecommend(tempRecommend);
        }

        if (data3) {
            const shanghaiNew = [];
            data3.dataListObj.dataList.forEach((item) => {
                const detail = {};
                detail.date = moment(timeRender(item.date[0])).format('YYYY-MM-DD hh:mm:ss');
                const a = getStars(item.section);
                detail.companyName = companyNameVs[item.windcode[0]];
                detail.newsScore = a.star;

                detail.category = a.EventDetailTypeName.slice(0, 3);
                detail.sentences = item.title[0];
                detail.id = item.id[0];

                shanghaiNew.push(detail);
            });
            const shn = [];
            for (let i = 0; i < shanghaiNew.length / 5; i++) {
                shn.push(shanghaiNew.slice(i * 5, (i + 1) * 5));
            }
            //   console.log('zjf---shn:', shn);
            setShanghaiNews(shn);
        }
    }, [data1, data2, data3, setHotNews, setRecommend, setShanghaiNews]);

    const newShow = (id) => {
        showNew(id);
    };

    return (
        <div className='right'>
            <div className='boxContainer'>
                <div className='box '>
                    <h1 className='domestic-stock-title right-title'>新闻与风险监测</h1>
                    <div className='right-tab-title'>
                        <div
                            className={
                                tabDisplay === 1
                                    ? 'frist frist-select right-tab-title-select'
                                    : 'frist frist-unselect'
                            }
                            onClick={() => {
                                setTabDisplay(1);
                            }}
                        >
                            <div className='right-title-tab-all'>热门</div>
                        </div>
                        <div
                            className={
                                tabDisplay === 2
                                    ? 'second second-select right-tab-title-select'
                                    : 'second second-unselect'
                            }
                            onClick={() => {
                                setTabDisplay(2);
                            }}
                        >
                            <div className='right-title-tab-all'>推荐</div>
                        </div>
                        <div
                            className={
                                tabDisplay === 3
                                    ? 'thrid thrid-select right-tab-title-select'
                                    : 'thrid thrid-unselect'
                            }
                            onClick={() => {
                                setTabDisplay(3);
                            }}
                        >
                            <div className='right-title-tab-all'>
                                风险<span className='span-shiyunxing'>(试运行)</span>
                            </div>
                        </div>
                    </div>

                    <div
                        className='right-tab-div'
                        style={{ display: tabDisplay === 1 ? 'flex' : 'none' }}
                    >
                        <div></div>

                        {/* 组件化一下 */}
                        {hotNews?.length > 0 ? (
                            hotNews.map((item, index) => {
                                return (
                                    // 暂用index
                                    <div key={index} className='news'>
                                        <div
                                            className='mouse'
                                            onClick={() => newShow(item[2].trim())}
                                            title={item[0].trim()}
                                        >
                                            <div className='news-title'>{item[0].trim()}</div>
                                        </div>
                                        <div>{item[1].trim()}</div>
                                    </div>
                                );
                            })
                        ) : (
                            <div>
                                <div>暂无数据</div>
                            </div>
                        )}
                        <div></div>
                    </div>

                    <div
                        className='right-tab-div'
                        style={{ display: tabDisplay === 2 ? 'flex' : 'none' }}
                    >
                        <div></div>
                        {recommend?.length > 0 ? (
                            recommend.map((item, index) => {
                                return (
                                    <div key={index} className='news'>
                                        <div
                                            className='mouse'
                                            onClick={() => newShow(item[2])}
                                            title={item[0].trim()}
                                        >
                                            <div className='news-title'>{item[0].trim()}</div>
                                        </div>
                                        <div>{item[1].trim()}</div>
                                    </div>
                                );
                            })
                        ) : (
                            <div>
                                <div>暂无数据</div>
                            </div>
                        )}
                        <div></div>
                    </div>

                    <div
                        className='right-tab-div'
                        style={{ display: tabDisplay === 3 ? 'flex' : 'none' }}
                    >
                        <div></div>
                        {tabDisplay === 3 ? (
                            shanghaiNews && shanghaiNews.length > 0 ? (
                                <Carousel
                                    autoplay
                                    dots={false}
                                    autoplaySpeed={shanghaiNewsCarouselTime}
                                    slidesToShow={1}
                                >
                                    {shanghaiNews?.map((value, index) => {
                                        return (
                                            <div className='shanghaiNews-group' key={index}>
                                                {value.map((item, index) => {
                                                    return (
                                                        <div
                                                            className='shanghai mouse2'
                                                            onClick={() => newShow(item.id.trim())}
                                                            key={index}
                                                        >
                                                            <div className='companyName'>
                                                                <div className='companyName-name'>
                                                                    {item.companyName}
                                                                </div>
                                                                <div>
                                                                    {item.newsScore.map(
                                                                        (item, index) => {
                                                                            return (
                                                                                <img
                                                                                    src={star}
                                                                                    alt='星级'
                                                                                    key={index}
                                                                                />
                                                                            );
                                                                        }
                                                                    )}
                                                                </div>
                                                            </div>

                                                            <div
                                                                className='sentences'
                                                                title={item.sentences}
                                                            >
                                                                {item.sentences}
                                                            </div>

                                                            <div className='category'>
                                                                <div>{item.date}</div>

                                                                <div>
                                                                    {item.category.map(
                                                                        (val, index) => {
                                                                            return (
                                                                                <div key={index}>
                                                                                    <span>
                                                                                        {val}
                                                                                    </span>
                                                                                </div>
                                                                            );
                                                                        }
                                                                    )}
                                                                </div>
                                                            </div>
                                                        </div>
                                                    );
                                                })}
                                            </div>
                                        );
                                    })}
                                </Carousel>
                            ) : (
                                <div>
                                    <div>暂无数据</div>
                                </div>
                            )
                        ) : (
                            <div>加载中</div>
                        )}

                        <div></div>
                    </div>
                    <div className='box_footer'></div>
                    <div className='WindLOGOclassname'>
                        <img src={WindLOGO} alt='WindLOGO' />
                    </div>
                    <div className='close-page-img'>
                        <img
                            src={close}
                            alt='close'
                            title='关闭'
                            onClick={() => {
                                // window.opener = window;
                                // console.log('zjf---关闭:', window.opener);
                                // window.close();

                                /* window.location.href = 'about:blank';
                window.opener = null;
                window.close(); */

                                // window.opener = window;
                                // var win = window.open('', '_self');
                                window.close();

                                // const a = window.open('/#/yyzx', '_self', 'location=no,menubar=no,status=no');
                                // const a = window.open(window.location.href, '_self');
                                /* if (ka == 2) {
                      window.close();
                  } */
                                // const a = window.open(`/?ka=2#/yyzx`, '_blank');
                                // console.log('zjf---a:', a);
                                // a.close();

                                /* setTimeout(() => {
                  console.log('zjf---要关闭:', window.opener);
                  window.close();
                }, 500); */

                                // window.location.href = '/yyzx';

                                // window.close();
                                // window.open('javascript:window.open("","_self","");window.close();', '_self');

                                // const ele = document.documentElement;
                                // ele.requestFullscreen();
                                // document.activeElement();
                                // document.exitFullscreen();
                                // document.msExitFullscreen();
                                // document.mozCancelFullscreen();
                                // document.webkitExitFullscreen();

                                /*  window.focus();
                  window. */
                            }}
                        />
                    </div>
                </div>
            </div>
        </div>
    );
}

RightLayout.propTypes = {};
RightLayout.defaultProps = {};
