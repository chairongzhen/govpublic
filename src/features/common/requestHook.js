/*
 * @Author: hcluo
 * @Date: 2020-07-15 16:04:44
 * @LastEditors: hcluo
 * @LastEditTime: 2020-09-02 12:07:52
 * @Description: 政府项目
 */
import { useCallback, useState, useEffect } from 'react';
import { requestYQData } from '../../utils/request';



export default function useRequest(getParams,deps) {
  
  const [status, setStatus] = useState(typeof getParams === 'function' ? 1 : 0); // 0-已完成，1-发送中，2-返回出错
  const [data, setData] = useState({});
  const [errorMsg, setErrorMsg] = useState();
  const boundAction = useCallback(
    (...argus) => {
      setStatus(1);
      let doRequest = requestYQData;
      doRequest(...argus)
        .then(res => {
          setData(res);
          setStatus(0);
        })
        .catch(err => {
          console.error('%c 🥒 err: ', 'font-size:20px;background-color: #FCA650;color:#fff;', err);
        });
    },
    [],
  );
  useEffect(() => {
    if (typeof getParams === 'function') {
      let params = getParams();
      params && boundAction(getParams());
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, deps);

  return [data, status, boundAction, errorMsg];
}


export { requestYQData };
