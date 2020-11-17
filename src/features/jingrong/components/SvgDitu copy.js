import React, { useState, useEffect} from "react"

function SvgComponent(props) {
  const [result, setResult] = useState({});
  const data = {
    "yingguofushi100": [
      "2846.55", "+28.58", "1.01%",
    ],
    "shangzhengshishu": [
      "2846.55", "+28.58", "1.01%",
    ],
    "shenzhenzhishu": [
      "2846.55", "+28.58", "1.01%",
    ],
    "fushixinjiapohaixiazhishu": [
      "2846.55", "+28.58", "1.01%",
    ],
    "rijing225": [
      "2846.55", "+28.58", "1.01%",
    ],
    "daoqionggongyezhishu": [
      "2846.55", "+28.58", "1.01%",
    ],
    "nasidakezhishu": [
      "2846.55", "+28.58", "1.01%",
    ],
    "biaopu500": [
      "2846.55", "+28.58", "1.01%",
    ]
  }

  const dataResult = (data) => {
    let result = {};
    for (const key in data) {
      console.log(data[key]);
      const r=[...data[key]]
      const color = /^\+/.test(data[key][1]) ? "#FA2832" : "#5FF678";
      r.push(color);
      result[key] = r;
    }
    return result;
  }

  // useEffect(() => {
  //   setResult(dataResult(data));
  // },[setResult,data])

  return (
    <svg width={1917} height={721} viewBox="0 0 1917 721" {...props}>
      {/* <title>{"ditu"}</title> */}
      <g fill="none" fillRule="evenodd">
        <g transform="translate(403 495)">
          <circle fill="#FF9C38" cx={288} cy={52} r={12} />
          <rect
            stroke="#52689F"
            fillOpacity={0.761}
            fill="#041235"
            y={85}
            width={300}
            height={180}
            rx={2}
          />
          <text
            fontFamily="PingFangSC-Regular, PingFang SC"
            fontSize={24}
            letterSpacing={1.966}
            fill="#41FDFF"
          >
            <tspan x={33} y={122}>
              {"\u5BCC\u65F6\u65B0\u52A0\u5761\u6D77\u5CE1\u6307\u6570"}
            </tspan>
          </text>
          <path stroke="#FF9C38" d="M288 59v25.892" />
        </g>
        <g transform="translate(1292 131)">
          <rect
            stroke="#52689F"
            fillOpacity={0.761}
            fill="#041235"
            width={300}
            height={180}
            rx={2}
          />
          <text
            fontFamily="PingFangSC-Regular, PingFang SC"
            fontSize={24}
            letterSpacing={1.966}
            fill="#41FDFF"
          >
            <tspan x={59} y={37}>
              {"\u9053\u743C\u65AF\u5DE5\u4E1A\u6307\u6570"}
            </tspan>
          </text>
        </g>
        <g transform="translate(1340 287)">
          <circle fill="#FF9C38" cx={278} cy={2} r={12} />
          <rect
            stroke="#52689F"
            fillOpacity={0.761}
            fill="#041235"
            y={45}
            width={300}
            height={180}
            rx={2}
          />
          <text
            fontFamily="PingFangSC-Regular, PingFang SC"
            fontSize={24}
            letterSpacing={1.966}
            fill="#41FDFF"
          >
            <tspan x={72} y={82}>
              {"\u7EB3\u65AF\u8FBE\u514B\u6307\u6570"}
            </tspan>
          </text>
        </g>
        <g transform="translate(1616 81)">
          <rect
            stroke="#52689F"
            fillOpacity={0.761}
            fill="#041235"
            width={300}
            height={180}
            rx={2}
          />
          <text
            fontFamily="PingFangSC-Regular, PingFang SC"
            fontSize={24}
            letterSpacing={1.966}
            fill="#41FDFF"
          >
            <tspan x={99} y={37}>
              {"\u6807\u666E500"}
            </tspan>
          </text>
        </g>
        <circle fill="#FF9C38" cx={169} cy={218} r={12} />
        <g transform="translate(157 -1)">
          <rect
            stroke="#52689F"
            fillOpacity={0.761}
            fill="#041235"
            width={300}
            height={180}
            rx={2}
          />
          <text
            fontFamily="PingFangSC-Regular, PingFang SC"
            fontSize={24}
            letterSpacing={1.966}
            fill="#41FDFF"
          >
            <tspan x={76} y={37}>
              {"\u82F1\u56FD\u5BCC\u65F6100"}
            </tspan>
          </text>
        </g>
        <circle fill="#FF9C38" cx={783} cy={356} r={12} />
        <g transform="translate(495 127)">
          <rect
            stroke="#52689F"
            fillOpacity={0.761}
            fill="#041235"
            width={300}
            height={180}
            rx={2}
          />
          <text
            fontFamily="PingFangSC-Regular, PingFang SC"
            fontSize={24}
            letterSpacing={1.966}
            fill="#41FDFF"
          >
            <tspan x={98} y={37}>
              {"\u4E0A\u8BC1\u6307\u6570"}
            </tspan>
          </text>
        </g>
        <circle fill="#FF9C38" cx={742} cy={409} r={12} />
        <g transform="translate(414 311)">
          <rect
            stroke="#52689F"
            fillOpacity={0.761}
            fill="#041235"
            width={300}
            height={180}
            rx={2}
          />
          <text
            fontFamily="PingFangSC-Regular, PingFang SC"
            fontSize={24}
            letterSpacing={1.966}
            fill="#41FDFF"
          >
            <tspan x={98} y={37}>
              {"\u6DF1\u5733\u6307\u6570"}
            </tspan>
          </text>
        </g>
        <circle fill="#FF9C38" cx={877} cy={330} r={12} />
        <g transform="translate(863 368)">
          <rect
            stroke="#52689F"
            fillOpacity={0.761}
            fill="#041235"
            width={300}
            height={180}
            rx={2}
          />
          <text
            fontFamily="PingFangSC-Regular, PingFang SC"
            fontSize={24}
            letterSpacing={1.966}
            fill="#41FDFF"
          >
            <tspan x={99} y={37}>
              {"\u65E5\u7ECF225"}
            </tspan>
          </text>
        </g>
        <path
          stroke="#FF9C38"
          d="M714.054 398.946h25.892M782.5 306.5l.5 37.392M877 342v25.892M169 180v25.892"
        />
        <g
          fill={result.fushixinjiapohaixiazhishu&&result.fushixinjiapohaixiazhishu[3]}
          fontFamily="PingFangSC-Regular, PingFang SC"
          fontSize={28}
          letterSpacing={2.294}
        >
          <text transform="translate(443 665)">
            <tspan x={0} y={70.5}>
              {result.fushixinjiapohaixiazhishu &&result.fushixinjiapohaixiazhishu[1]}
            </tspan>
          </text>
          <text transform="translate(443 665)">
            <tspan x={134} y={70.5}>
              {result.fushixinjiapohaixiazhishu &&result.fushixinjiapohaixiazhishu[2]}
            </tspan>
          </text>
        </g>
        <g
          fill={result.shenzhenzhishu&&result.shenzhenzhishu[3]}
          fontFamily="PingFangSC-Regular, PingFang SC"
          fontSize={28}
          letterSpacing={2.294}
        >
          <text transform="translate(454 436)">
            <tspan x={0} y={30.5}>
              {result.shenzhenzhishu &&result.shenzhenzhishu[1]}
            </tspan>
          </text>
          <text transform="translate(454 436)">
            <tspan x={134} y={30.5}>
              { result.shenzhenzhishu &&result.shenzhenzhishu[2]}
            </tspan>
          </text>
        </g>
        <g
          fill={result.rijing225&&result.rijing225[3]}
          fontFamily="PingFangSC-Regular, PingFang SC"
          fontSize={28}
          letterSpacing={2.294}
        >
          <text transform="translate(923 493)">
            <tspan x={-15} y={30.5}>
              {result.rijing225 &&result.rijing225[1]}
            </tspan>
          </text>
          <text transform="translate(923 493)">
            <tspan x={119} y={30.5}>
              {result.rijing225 &&result.rijing225[2]}
            </tspan>
          </text>
        </g>
        <g
          fill="#FA2832"
          fontFamily="PingFangSC-Regular, PingFang SC"
          fontSize={28}
          letterSpacing={2.294}
        >
          <text transform="translate(1332 256)">
            <tspan x={0} y={30.5}>
              {"+28.58"}
            </tspan>
          </text>
          <text transform="translate(1332 256)">
            <tspan x={134} y={30.5}>
              {"1.01%"}
            </tspan>
          </text>
        </g>
        <g
          fill="#FA2832"
          fontFamily="PingFangSC-Regular, PingFang SC"
          fontSize={28}
          letterSpacing={2.294}
        >
          <text transform="translate(1380 457)">
            <tspan x={0} y={30.5}>
              {"+28.58"}
            </tspan>
          </text>
          <text transform="translate(1380 457)">
            <tspan x={134} y={30.5}>
              {"1.01%"}
            </tspan>
          </text>
        </g>
        <g
          fill="#FA2832"
          fontFamily="PingFangSC-Regular, PingFang SC"
          fontSize={28}
          letterSpacing={2.294}
        >
          <text transform="translate(1656 206)">
            <tspan x={0} y={30.5}>
              {"+28.58"}
            </tspan>
          </text>
          <text transform="translate(1656 206)">
            <tspan x={134} y={30.5}>
              {"1.01%"}
            </tspan>
          </text>
        </g>
        <g
          fill={result.shangzhengshishu&&result.shangzhengshishu[3]}
          fontFamily="PingFangSC-Regular, PingFang SC"
          fontSize={28}
          letterSpacing={2.294}
        >
          <text transform="translate(535 252)">
            <tspan x={0} y={30.5}>
              {result.shangzhengshishu &&result.shangzhengshishu[1]}
            </tspan>
          </text>
          <text transform="translate(535 252)">
            <tspan x={134} y={30.5}>
              {result.shangzhengshishu &&result.shangzhengshishu[2]}
            </tspan>
          </text>
        </g>
        <g
          fill={result.yingguofushi100&&result.yingguofushi100[3]}
          fontFamily="PingFangSC-Regular, PingFang SC"
          fontSize={28}
          letterSpacing={2.294}
        >
          <text transform="translate(207 159)">
            <tspan x={-10} y={-5.5}>
              {result.yingguofushi100 &&result.yingguofushi100[1]}
            </tspan>
          </text>
          <text transform="translate(207 159)">
            <tspan x={124} y={-5.5}>
              {result.yingguofushi100 &&result.yingguofushi100[2]}
            </tspan>
          </text>
        </g>
        <text
          fontFamily="PingFangSC-Medium, PingFang SC"
          fontSize={48}
          fontWeight={400}
          letterSpacing={3.933}
          fill={result.fushixinjiapohaixiazhishu&&result.fushixinjiapohaixiazhishu[3]}
        >
          <tspan x={446} y={684}>
            {result.fushixinjiapohaixiazhishu&&result.fushixinjiapohaixiazhishu[0]}
          </tspan>
        </text>
        <text
          fontFamily="PingFangSC-Medium, PingFang SC"
          fontSize={48}
          fontWeight={400}
          letterSpacing={3.933}
          fill="#FA2832"
        >
          <tspan x={457} y={415}>
            {result.shenzhenzhishu&&result.shenzhenzhishu[0]}
          </tspan>
        </text>
        <text
          fontFamily="PingFangSC-Medium, PingFang SC"
          fontSize={48}
          fontWeight={400}
          letterSpacing={3.933}
          fill={result.rijing225&&result.rijing225[3]}
        >
          <tspan x={906} y={472}>
            {result.rijing225&&result.rijing225[0]}
          </tspan>
        </text>
        <text
          fontFamily="PingFangSC-Medium, PingFang SC"
          fontSize={48}
          fontWeight={400}
          letterSpacing={3.933}
          fill="#FA2832"
        >
          <tspan x={1335} y={235}>
            {"2846.55"}
          </tspan>
        </text>
        <text
          fontFamily="PingFangSC-Medium, PingFang SC"
          fontSize={48}
          fontWeight={400}
          letterSpacing={3.933}
          fill="#FA2832"
        >
          <tspan x={1383} y={436}>
            {"2846.55"}
          </tspan>
        </text>
        <text
          fontFamily="PingFangSC-Medium, PingFang SC"
          fontSize={48}
          fontWeight={400}
          letterSpacing={3.933}
          fill="#FA2832"
        >
          <tspan x={1659} y={185}>
            {"2846.55"}
          </tspan>
        </text>
        <text
          fontFamily="PingFangSC-Medium, PingFang SC"
          fontSize={48}
          fontWeight={400}
          letterSpacing={3.933}
          fill={result.shangzhengshishu&&result.shangzhengshishu[3]}
        >
          <tspan x={538} y={231}>
            {result.shangzhengshishu&&result.shangzhengshishu[0]}
          </tspan>
        </text>
        <text
          fontFamily="PingFangSC-Medium, PingFang SC"
          fontSize={48}
          fontWeight={400}
          letterSpacing={3.933}
          fill={result.yingguofushi100&&result.yingguofushi100[3]}
        >
          <tspan x={200} y={103}>
            {result.yingguofushi100&&result.yingguofushi100[0]}
          </tspan>
        </text>
      </g>
    </svg>
  )
}

export default SvgComponent
