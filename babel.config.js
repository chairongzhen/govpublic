/*
 * @Author: hcluo
 * @Date: 2020-07-08 16:41:52
 * @LastEditors: jfzhang.Jeffry
 * @LastEditTime: 2020-10-11 14:32:38
 * @Description: 政府项目
 */

module.exports = function (api) {
    const presets = ['react-app'];
    const plugins = [
        '@babel/plugin-proposal-nullish-coalescing-operator',
        '@babel/plugin-proposal-optional-chaining',
        ['import', { libraryName: 'antd', style: 'css' }],
    ];
    if (api.env('development')) {
        plugins.push('react-hot-loader/babel');
    }
    return { presets, plugins };
};
