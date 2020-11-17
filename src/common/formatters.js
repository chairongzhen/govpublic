/*
 * @Descripttion: 
 * @version: 
 * @Author: sueRimn
 * @Date: 2020-06-18 19:16:05
 * @LastEditors: sueRimn
 * @LastEditTime: 2020-07-20 10:38:19
 */
import cloneDeep from 'lodash/cloneDeep';

/**
 * @name: 将数字转换成千分位
 * @param val 需要转换的数字
 * @return: 千分位字符串
 */
export function toThousandSeparator(val) {
    if (val) {
        return (val + '').replace(/(\d{1,3})(?=(\d{3})+(?:$|\.))/g, '$1,');
    } else {
        return val;
    }
}

/**
 * @name: 将字符串转换成数字
 * @param str 需要转换的字符串
 * @param defaultResult 抛错输出
 * @return: 对应数字
 */
export function getNumber(str, defaultResult = 0) {
    let num = Number(str);
    if (num.toString() !== 'NaN') {
        return num;
    }
    return defaultResult;
}

/**
 * @name: 数字控制小数位
 * @param num 需要转换的数字
 * @param float 小数位数
 * @param defaultResult 抛错输出
 * @return: 对应格式的数字
 */
export function numToFixed(num, float, defaultResult = null) {
    num = getNumber(num, defaultResult);
    if (num === defaultResult) {
        return num;
    }
    return num.toFixed(float);
}

/**
 * 排序
 * @name: 对象的数组进行排序,index为比较的主key
 * @param {*} data 
 * @param {递增} isIncrease true为递增,false为递减
 * @param {比较数值key} index 
 */
export function sortData(data, isIncrease, index) {
    if (!data.length) {
        return data;
    }
    let change = true;
    for (let i = 0; i < data.length - 1; i++) {
        for (let j = i + 1; j < data.length; j++) {
            if (isIncrease && Number(data[i][index]) > Number(data[j][index])) {
                change = true;
            } else if (!isIncrease && Number(data[i][index]) < Number(data[j][index])) {
                change = true;
            } else if (!Number(data[i][index])) {
                change = true;
            } else {
                change = false;
            }
            if (change) {
                let temp = cloneDeep(data[i]);
                data[i] = cloneDeep(data[j]);
                data[j] = temp;
            }
        }
    }
    return data;
}