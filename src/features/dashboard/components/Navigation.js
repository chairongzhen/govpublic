/*
 * @overview:
 * @Author: jfzhang.Jeffry
 * @LastEditors: jfzhang.Jeffry
 * @Date: 2020-11-13 14:55:07
 */
import React, { useEffect, useMemo, useState } from 'react';
import { Menu, Dropdown, Button, Radio, Checkbox, Icon } from '@wind/wind-ui';
import city from './default/city';
// import { req as request } from '../../common/request';
import request from '../comment/request';
import pageConfig from './default/pageConfig';
import * as pageComponents from '../index';
import { getSessionFunc, sessionOK } from '../comment/request';
import select from '../images/select.svg';
import unselect from '../images/unselect.svg';

const tes = new RegExp(/^\-/);
const isZero = (nowPrice, last_close) => {
  if (!last_close) {
    return nowPrice;
  }
  if (parseFloat(nowPrice) === 0) {
    return last_close;
  }
  return nowPrice;
};

export default function Navigation({ children, location }) {
  const [outData, setOutData] = useState(false);
  const [currentCity, setCurrentCity] = useState({});
  const [currentPage, setCurrentPage] = useState({});
  //   const [selectTitle, setSelectTitle] = useState(0);
  const [page, setPage] = useState(0);
  const [pageCover, setPageCover] = useState('');
  const [contrastPattern, setContrastPattern] = useState(false);
  const [sessionOKMy, setSessionOKMy] = useState(false);

  useEffect(() => {
    // todo 有问题
    console.log('zjf---页面初始化1:');
    getSessionFunc();
    setTimeout(() => {
      if (sessionOK) {
        setSessionOKMy(true);
      }
    }, 500);

    const id = setInterval(() => {
      getSessionFunc();
      if (sessionOK) {
        setSessionOKMy(true);
      }
    }, 1000 * 60 * 60);
    return () => {
      clearInterval(id);
    };
  }, []);

  /*   useEffect(() => {
    console.log('zjf---page-currentPage-pageCover:', page, '---', currentPage, '---', pageCover);
    console.log('zjf---pageComponents:', pageComponents);
  }, [currentPage, pageCover, page]); */

  const getDownDataWhenListedCompanies = () => {
    request('/govwebapi/gov/web/api/bs-citycenter/index/wss/quotation/get', {
      params: {
        codes: '000011.SH,000012.SH,INCI.SHF,AU.SHF,IF.CFE,SHIBORON.IR,CNYX.IB',
        date: '20201116',
      },
    }).then(res => {
      //   console.log('zjf--------------------res:', res);
      if (res) {
        const temptab4 = [
          {
            key: '000011.SH',
            name: '上证基金指数',
          },
          {
            key: '000012.SH',
            name: '上证国债',
          },
          {
            key: 'INCI.SHF',
            name: '上期工业金属期货价格指数',
          },
          {
            key: 'AU.SHF',
            name: 'SHFE黄金',
          },
          {
            key: 'IF.CFE',
            name: '沪深300期货',
          },
          {
            key: 'SHIBORON.IR',
            name: '上海银行间同业拆放利率',
          },
          {
            key: 'CNYX.IB',
            name: '人民币汇率指数',
          },
        ];
        temptab4.forEach(item => {
          const t = res[item.key];
          const newData = [];
          newData.push(isZero(t?.nowPrice, t?.last_close));
          newData.push(t?.upAndDown);
          newData.push(t?.upAndDownRate);
          newData.push(t?.yearToDateRate);
          item.data = newData;
        });
        // console.log('zjf---temptab4:', temptab4);
        setOutData(temptab4);
      }
    });
  };

  const menu = useMemo(() => {
    return (
      <Menu>
        <Menu.Item
          onClick={() => {
            setCurrentCity({
              chn: '上海',
              parentCode: '0300000000',
              treeLevel: 1,
              code: '0301010000',
            });
          }}
        >
          {city.chn + '市'}
        </Menu.Item>
        {city.children.map((item, index) => {
          return (
            <Menu.Item
              key={index}
              onClick={() => {
                setCurrentCity({
                  chn: item.chn,
                  parentCode: item.parentCode,
                  treeLevel: item.treeLevel,
                  code: item.code,
                });
              }}
            >
              {item.chn}
            </Menu.Item>
          );
        })}
      </Menu>
    );
  }, []);

  useEffect(() => {
    console.log('zjf---page:', page);
  }, [page]);

  const generatePageButton = () => {
    if (!pageCover) {
      return;
    }
    console.log('zjf----------------header:', pageCover);

    if (page === -1) {
      console.log('zjf----------------这:');

      if (Object.keys(currentPage).length) {
        const fristPageConfig = Object.keys(pageConfig)[0];
        const returnTemp = pageConfig[fristPageConfig].map((item, index) => {
          return (
            <div
              className="group mouse"
              key={index}
              onClick={() => {
                setPage(index);
                setCurrentPage(pageConfig[fristPageConfig][index]);
              }}
            >
              <img
                className={page === index ? '' : 'display-none'}
                src={select}
                alt={item.name}
                title={item.name}
              />
              <img src={unselect} alt={item.name} title={item.name} />
              <span className={page === index ? 'span-select' : ''}>{item.name}</span>
            </div>
          );
        });
        return <div className="w-radio-group">{returnTemp}</div>;
        // return (
        //   <Radio.Group>
        //     {pageConfig[fristPageConfig].map((item, index) => {
        //       return (
        //         <Radio.Button
        //           key={index}
        //           value={item.name}
        //           onClick={() => {
        //             setPage(index);
        //             setCurrentPage(pageConfig[fristPageConfig][index]);
        //           }}
        //         >
        //           {item.name}
        //         </Radio.Button>
        //       );
        //     })}
        //   </Radio.Group>
        // );
      }
    }
    const returnTemp = pageConfig[pageCover].map((item, index) => {
      return (
        <div
          className="group mouse"
          key={index}
          onClick={() => {
            setPage(index);
            setCurrentPage(pageConfig[pageCover][index]);
          }}
        >
          <img
            className={page === index ? '' : 'display-none'}
            src={select}
            alt={item.name}
            title={item.name}
          />
          <img src={unselect} alt={item.name} title={item.name} />
          <span className={page === index ? 'span-select' : ''}>{item.name}</span>
        </div>
      );
    });
    return <div className="w-radio-group">{returnTemp}</div>;
    //   (

    //   <Radio.Group defaultValue={currentPage.name}>
    //     {pageConfig[pageCover].map((item, index) => {
    //       return (
    //         <Radio.Button
    //           key={index}
    //           value={item.name}
    //           onClick={() => {
    //             setPage(index);
    //             setCurrentPage(pageConfig[pageCover][index]);
    //           }}
    //         >
    //           {item.name}
    //         </Radio.Button>
    //       );
    //     })}
    //   </Radio.Group>
    // );
  };

  useEffect(() => {
    if (location) {
      let pageCoverTemp = location.pathname.replace(/.+\/(\w+)\/?/, '$1');
      // 非正常访问
      if (!pageConfig[pageCoverTemp]) {
        const temppage = [];
        const temppageIndex = [-1];
        const tempPageKey = Object.keys(pageConfig);
        for (let i = 0; i < tempPageKey.length; i++) {
          pageConfig[tempPageKey[i]].every((item, index) => {
            if (item.url === location.pathname && item.url !== currentPage.url) {
              temppageIndex[0] = index;
              temppage.push(item);
              temppage.push(tempPageKey[i]);
              return false;
            }
            return true;
          });
          // 有记录
          if (temppage.length) {
            setCurrentPage(temppage[0]);
            setPage(temppageIndex[0]);
            pageCoverTemp = temppage[1];
            break;
            //无记录
          } else {
            pageCoverTemp = '1';
          }
        }
      } else {
        // 正常访问
        setPage(0);
        setCurrentPage(pageConfig[pageCoverTemp][0]);
      }
      setPageCover(pageCoverTemp);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [location]);

  const generatePageCom = () => {
    // console.log('zjf---content渲染:');
    if (!pageCover) {
      //   console.log('zjf---chileren:');
      return children;
    }
    // console.log('zjf---返回正式页面:');
    if (currentPage.components === 'ListedCompanies') {
      console.log('zjf--------------------------:');
      if (!outData.length) {
        getDownDataWhenListedCompanies();
      }
    }
    const PageCom = pageComponents[currentPage.components] || pageComponents['EnterpriseOverview'];

    return (
      <PageCom
        cityCode={currentCity.code ? currentCity.code : '0301010000'}
        contrastPattern={contrastPattern}
        setCurrentCity={setCurrentCity}
        setCurrentPage={setCurrentPage}
      />
    );
  };

  return (
    <div className="dashboard-components-navigation">
      <div className="overview-content">
        <div className="content-navigation">
          <div className="navigation-left">
            <div
              className="left-one"
              style={
                currentPage.contrastPattern ? (contrastPattern ? { display: 'none' } : {}) : {}
              }
            >
              {pageCover ? (
                <Dropdown
                  overlay={menu}
                  placement="bottomCenter"
                  overlayClassName="overlayClassName"
                >
                  <Button
                    style={{
                      width: '100%',
                      height: '100%',
                      backgroundColor: '#0F3C62',
                      borderColor: '#0e4677',
                      color: '#22EAF6',
                      fontSize: '0.09375rem',
                      whiteSpace: 'pre',
                      borderRadius: '4px',
                      //   backgroundImage: 'linear-gradient(178deg, #4172F6 48%, #15B6E2 100%)',
                      //   boxShadow: 'inset 0 1px 51px 24px rgba(9,65,108,0.49)',
                    }}
                  >
                    {currentCity.chn
                      ? currentCity.chn === '上海'
                        ? '上海市             '
                        : currentCity.chn?.length === 3
                        ? `上海      ${currentCity.chn}`
                        : `上海   ${currentCity.chn}`
                      : '上海市             '}
                    <Icon type="down" />
                  </Button>
                </Dropdown>
              ) : null}
            </div>
          </div>
          <div className="navigation-center">{generatePageButton()}</div>
          <div className="navigation-right">
            <div
              className="right-one"
              style={currentPage?.contrastPattern ? {} : { display: 'none' }}
            >
              <Checkbox
                checked={contrastPattern}
                onClick={() => {
                  setContrastPattern(old => {
                    return !old;
                  });
                }}
              ></Checkbox>
              <span
                className="mouse"
                onClick={() => {
                  setContrastPattern(old => {
                    return !old;
                  });
                }}
                style={{ color: '#2BF9FF' }}
              >
                对比模式
              </span>
            </div>
          </div>
        </div>
        <div className="content-content">{sessionOKMy ? generatePageCom() : ''}</div>
        <div className="content-foot">
          <div className="foot-data">
            <div style={currentPage?.components === 'ListedCompanies' ? {} : { display: 'none' }}>
              {outData && outData.length > 0
                ? outData.map((item, index) => {
                    return (
                      <div>
                        <span style={{ color: '#2BF9FF' }}>{item.name + '：'}</span>
                        <span className={tes.test(item.data) ? 'value-green' : 'value-red'}>
                          {item.data && item.data[0] ? item.data[0] : '暂无'}
                        </span>
                      </div>
                    );
                  })
                : ''}
            </div>
          </div>
          <div className="foot-logo">
            <span style={{ color: '#22EAF6' }}>数据来源：</span>
            <span style={{ color: '#DC3023' }}>Wind</span>
          </div>
        </div>
      </div>
    </div>
  );
}

Navigation.propTypes = {};
Navigation.defaultProps = {};
