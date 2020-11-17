/*
 * @Author: jfzhang.Jeffry
 * @LastEditors: jfzhang.Jeffry
 * @Date: 2020-09-04 15:18:12
 * @Descripttion:
 */
import React, { useEffect, useState } from 'react';
// import PropTypes from 'prop-types';

import SvgCom from './svg';
import CenterTime from './CenterTime';
import { getSessionId } from '../../../common/jsBirdge';
import { getQueryString } from '../../../utils/util';
import { useRequest } from 'ahooks';
import moment from 'miment';
import { isEqual } from 'lodash';

const d1 = moment().format('YYYYMMDD');
const d2 = moment()
  .add(-1, 'YYYY')
  .format('YYYYMMDD');
const d3 = moment()
  .add(-1, 'MM')
  .format('YYYYMMDD');

const sessionId = getSessionId();
const host = getQueryString('host') || '';
const newUrl = `${host}/govwebapi/gov/web/api/bs-citycenter/wbo/temperature/get`;
const business0 = {
  business: {
    date: d1,
  },
};
const business1 = {
  business: {
    date: d2,
  },
};
const business2 = {
  business: {
    date: d3,
  },
};

const newUrl4 = `${host}/govwebapi/gov/web/api/bs-citycenter/index/wss/quotation/get`;
const business4 = {
  business: {
    codes: '000001.SH,000011.SH,SHIBORON.IR,INCI.SHF,000012.SH,IF.CFE,AU.SHF,CNYX.IB',
    date: d1,
  },
};
const business5 = {
  business: {
    codes: '000001.SH,000011.SH,SHIBORON.IR,INCI.SHF,000012.SH,IF.CFE,AU.SHF,CNYX.IB',
    date: d2,
  },
};
const business6 = {
  business: {
    codes: '000001.SH,000011.SH,SHIBORON.IR,INCI.SHF,000012.SH,IF.CFE,AU.SHF,CNYX.IB',
    date: d3,
  },
};

/* ------------------------------------------------------------------------------------- */

const getCenterData1 = (url, business) => {
  return fetch(url, {
    method: 'post',
    headers: {
      'Content-Type': 'application/json',
      'wind.sessionid': sessionId,
    },
    body: JSON.stringify(business),
  })
    .then(response => {
      if (!response.ok) {
        return Promise.reject(response.status);
      }
      return response.json();
    })
    .then(res => {
      if (res.resultCode === '200') {
        return Promise.resolve(res.resultData);
      } else {
        return Promise.reject(res);
      }
    })
    .catch(err => {
      console.error('网络错误：', err);
      return Promise.reject(err);
    });
};

/* ------------------------------------------------------------------------------------- */

const temp = {
  p1_1_1: '',
  p1_1_3: '',
  p1_1_6: '',
  p2_1_1: '',
  p2_1_3: '',
  p2_1_6: '',
  p2_2_1: '',
  p2_2_3: '',
  p2_2_6: '',
  p3_1: '',
  p3_2: '',
  p3_3: '',
  p3_4: '',
  p3_5: '',
  p3_6: '',
  p3_7: '',
  p4_1: '',
  p4_2: '',
  p4_3: '',
  p4_4: '',
  p4_5: '',
  p4_6: '',
};

/* ------------------------------------------------------------------------------------- */

const centerLeftrefect = data => {
  if (data.nowPrice && data.nowPrice.toString().length > 0 && parseFloat(data.nowPrice) !== 0) {
    return data.nowPrice;
  }
  return data.last_close;
};

/* ------------------------------------------------------------------------------------- */

const rightLimit = data => {
  return parseInt(data) > 98 ? 98 : data;
};

/* ------------------------------------------------------------------------------------- */

const leftResult = data => {
  return Math.round(
    parseFloat(data['000001.SH']) * 0.3 +
      parseFloat(data['000011.SH']) * 0.1 +
      parseFloat(data['SHIBORON.IR']) * 0.2 +
      parseFloat(data['INCI.SHF']) * 0.1 +
      parseFloat(data['000012.SH']) * 0.1 +
      parseFloat(data['IF.CFE']) * 0.1 +
      parseFloat(data['AU.SHF']) * 0.05 +
      parseFloat(data['CNYX.IB']) * 0.05,
  );
};

/* ------------------------------------------------------------------------------------- */

const leftResultQuNianTongQi = data => {
  const t = {
    '000001.SH': '',
    '000011.SH': '',
    'SHIBORON.IR': '',
    'INCI.SHF': '',
    '000012.SH': '',
    'IF.CFE': '',
    'AU.SHF': '',
    'CNYX.IB': '',
  };

  for (const item in data) {
    const now = parseFloat(data[item].nowPrice);
    const min = parseFloat(data[item].yearMin);
    const max = parseFloat(data[item].yearMax);
    if (now >= max) {
      t[item] = 98;
    } else if (now <= min) {
      t[item] = 30;
    } else {
      t[item] = (((now - min) / (max - min)) * 68 + 30).toFixed(2);
    }
  }
  return t;
};

/* ------------------------------------------------------------------------------------- */

const requestBus = (pollingInterval, pollingWhenHidden = false) => {
  return {
    pollingInterval,
    pollingWhenHidden,
  };
};

/* ------------------------------------------------------------------------------------- */

export default function CenterLayout() {
  // 右边的数据   现在 去年 同期
  const { data } = useRequest(() => {
    return getCenterData1(newUrl, business0);
  }, requestBus(1000 * 60 * 30));
  const { data: data1 } = useRequest(() => {
    return getCenterData1(newUrl, business1);
  }, requestBus(1000 * 60 * 30));
  const { data: data2 } = useRequest(() => {
    return getCenterData1(newUrl, business2);
  }, requestBus(1000 * 60 * 30));

  // 左边的数据   现在 去年 同期
  const { data: data3 } = useRequest(() => {
    return getCenterData1(newUrl4, business4);
  }, requestBus(1000));
  const { data: data4 } = useRequest(() => {
    return getCenterData1(newUrl4, business5);
  }, requestBus(1000 * 60 * 60 * 12));
  const { data: data5, loading: loading5, run: run5, cancel: cancel5 } = useRequest(() => {
    return getCenterData1(newUrl4, business6);
  }, requestBus(1000 * 60 * 60 * 12));

  const [centerData, setCenterData] = useState(null);

  useEffect(() => {
    // console.log("zjf---data:", data, data1, data2, data3, data4, data5);
    if (!data || !data1 || !data2 || !data3 || !data4 || !data5) {
      return;
    }

    const tem1 = leftResultQuNianTongQi(data4);
    const tem2 = leftResultQuNianTongQi(data5);
    const tem = leftResultQuNianTongQi(data3);

    //todo 相同则不刷新页面
    temp.p3_1 = centerLeftrefect(data3['000001.SH']);
    temp.p3_2 = centerLeftrefect(data3['000011.SH']);
    temp.p3_3 = centerLeftrefect(data3['SHIBORON.IR']);
    temp.p3_4 = centerLeftrefect(data3['INCI.SHF']);
    temp.p4_1 = centerLeftrefect(data3['000012.SH']);
    temp.p4_2 = centerLeftrefect(data3['IF.CFE']);
    temp.p4_3 = centerLeftrefect(data3['AU.SHF']);
    temp.p4_4 = centerLeftrefect(data3['CNYX.IB']);

    temp.p3_5 = rightLimit(data['机构']);
    temp.p3_6 = rightLimit(data['银行']);
    temp.p3_7 = rightLimit(data['保险']);
    temp.p4_5 = rightLimit(data['证券']);
    temp.p4_6 = rightLimit(data['其他']);

    temp.p2_1_1 = leftResult(tem);
    temp.p2_1_3 = leftResult(tem1);
    temp.p2_1_6 = leftResult(tem2);

    temp.p2_2_1 = rightLimit(
      Math.round(
        temp.p3_5 * 0.3 + temp.p3_6 * 0.2 + temp.p3_7 * 0.15 + temp.p4_5 * 0.2 + temp.p4_6 * 0.15,
      ),
    );
    temp.p2_2_3 = rightLimit(
      Math.round(
        data1['机构'] * 0.3 +
          data1['银行'] * 0.2 +
          data1['保险'] * 0.15 +
          data1['证券'] * 0.2 +
          data1['其他'] * 0.15,
      ),
    );
    temp.p2_2_6 = rightLimit(
      Math.round(
        data2['机构'] * 0.3 +
          data2['银行'] * 0.2 +
          data2['保险'] * 0.15 +
          data2['证券'] * 0.2 +
          data2['其他'] * 0.15,
      ),
    );

    temp.p1_1_1 = (temp.p2_1_1 * 0.8 + temp.p2_2_1 * 0.2).toFixed();
    temp.p1_1_3 = (temp.p2_1_3 * 0.8 + temp.p2_2_3 * 0.2).toFixed();
    temp.p1_1_6 = (temp.p2_1_6 * 0.8 + temp.p2_2_6 * 0.2).toFixed();

    if (!isEqual(temp, centerData)) {
      setCenterData({ ...temp });
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [data, data1, data2, data4, data3, data5, setCenterData]);

  return (
    <div className="center ">
      <CenterTime />
      <div>
        <div>
          <SvgCom width={'100%'} height={'100%'} centerData={centerData} />
          {/* <object id="mySvg" data={centerImg} type="image/svg+xml">
            加载失败
          </object>  */}
        </div>
      </div>
    </div>
  );
}

CenterLayout.propTypes = {};
CenterLayout.defaultProps = {};
