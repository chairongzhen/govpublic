import React, { useState, useEffect } from "react"

function SvgComponent(props) {
  const [result, setResult] = useState({});


  const dataResult = (data) => {
    let result = {};
    for (const key in data) {
      const r = [];
      r[0] = data[key][0];
      r[1] = /^\-/.test(data[key][1]) ? data[key][1] : `+${data[key][1]}`;
      r[2] = /^\-/.test(data[key][2]) ? `${data[key][2]}%` : `+${data[key][2]}%`;
      const color = /^\-/.test(data[key][1]) ? "#5FF678" : "#FA2832";
      r.push(color);
      result[key] = r;
    }
    return result;
  }

  const nowLocation = (data,preLocaltion) => {
    return data && data[0] && (data[0].length === 7 ? preLocaltion : (7 - data[0].length) * 12 + preLocaltion)
  }

  useEffect(() => {
    const data = {
      "FTSE.GI": [
        "2846.55", "-28.58", "11.01",
      ],
      "000001.SH": [
        "2846.55", "28.58", "-1.01",
      ],
      "399001.SZ": [
        "2846.55", "28.58", "1.01",
      ],
      "STI.GI": [
        "2846.55", "-28.58", "-1.01",
      ],
      "N225.GI": [
        "2846.55", "-28.58", "1.01",
      ],
      "DJI.GI": [
        "2846.55", "-28.58", "-1.01",
      ],
      "IXIC.GI": [
        "2846.55", "-28.58", "1.01",
      ],
      "SPX.GI": [
        "2846.55", "-28.58", "1.01",
      ]
    }
    setResult(dataResult(props.mapIndex));
  },[setResult,props.mapIndex])

  return (
    <svg viewBox="0 0 1917 721" width={props.width} height={props.height}>
      {/* width={1917} height={721} */}
      {/* <title>{"ditu"}</title> */}
      <g fill="none" fillRule="evenodd">
        <g transform="translate(403 495)">
          <circle fill="#FF9C38" cx={288} cy={42} r={12} />
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
          <path stroke="#FF9C38" d="M288 49v35.892" />
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
          <circle fill="#FF9C38" cx={355} cy={20} r={12} />
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
        <circle fill="#FF9C38" cx={129} cy={238} r={12} />
        <g transform="translate(117 35)">
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
        <circle fill="#FF9C38" cx={793} cy={366} r={12} />
        <g transform="translate(505 137)">
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
        <g transform="translate(404 321)">
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
              {"深证成指"}
            </tspan>
          </text>
        </g>
        <circle fill="#FF9C38" cx={887} cy={340} r={12} />
        <g transform="translate(863 378)">
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
          d="M704.054 408.946h25.892M792.5 316.5l.5 37.392M887 352v25.892M129 215v15.892"
        />
        <g
          fill={result["STI.GI"] && result["STI.GI"][3]}
          fontFamily="PingFangSC-Regular, PingFang SC"
          fontSize={28}
          letterSpacing={2.294}
        >
          <text transform="translate(443 665)">
            <tspan x={-10} y={70.5}>
              {result["STI.GI"] && result["STI.GI"][1]}
            </tspan>
          </text>
          <text transform="translate(443 665)">
            <tspan x={120} y={70.5}>
              {result["STI.GI"] && result["STI.GI"][2]}
            </tspan>
          </text>
        </g>
        <g
          fill={result["399001.SZ"] && result["399001.SZ"][3]}
          fontFamily="PingFangSC-Regular, PingFang SC"
          fontSize={28}
          letterSpacing={2.294}
        >
          <text transform="translate(454 436)">
            <tspan x={-20} y={40.5}>
              {result["399001.SZ"] && result["399001.SZ"][1]}
            </tspan>
          </text>
          <text transform="translate(454 436)">
            <tspan x={110} y={40.5}>
              {result["399001.SZ"] && result["399001.SZ"][2]}
            </tspan>
          </text>
        </g>
        <g
          fill={result["N225.GI"] && result["N225.GI"][3]}
          fontFamily="PingFangSC-Regular, PingFang SC"
          fontSize={28}
          letterSpacing={2.294}
        >
          <text transform="translate(923 493)">
            <tspan x={-25} y={40.5}>
              {result["N225.GI"] && result["N225.GI"][1]}
            </tspan>
          </text>
          <text transform="translate(923 493)">
            <tspan x={103} y={40.5}>
              {result["N225.GI"] && result["N225.GI"][2]}
            </tspan>
          </text>
        </g>
        <g
          fill={result["DJI.GI"] && result["DJI.GI"][3]}
          fontFamily="PingFangSC-Regular, PingFang SC"
          fontSize={28}
          letterSpacing={2.294}
        >
          <text transform="translate(1332 256)">
            <tspan x={-10} y={30.5}>
              {result["DJI.GI"] && result["DJI.GI"][1]}
            </tspan>
          </text>
          <text transform="translate(1332 256)">
            <tspan x={120} y={30.5}>
              {result["DJI.GI"] && result["DJI.GI"][2]}
            </tspan>
          </text>
        </g>
        <g
          fill={result["IXIC.GI"] && result["IXIC.GI"][3]}
          fontFamily="PingFangSC-Regular, PingFang SC"
          fontSize={28}
          letterSpacing={2.294}
        >
          <text transform="translate(1380 457)">
            <tspan x={-10} y={30.5}>
              {result["IXIC.GI"] && result["IXIC.GI"][1]}
            </tspan>
          </text>
          <text transform="translate(1380 457)">
            <tspan x={120} y={30.5}>
              {result["IXIC.GI"] && result["IXIC.GI"][2]}
            </tspan>
          </text>
        </g>
        <g
          fill={result["SPX.GI"] && result["SPX.GI"][3]}
          fontFamily="PingFangSC-Regular, PingFang SC"
          fontSize={28}
          letterSpacing={2.294}
        >
          <text transform="translate(1656 206)">
            <tspan x={-10} y={30.5}>
              {result["SPX.GI"] && result["SPX.GI"][1]}
            </tspan>
          </text>
          <text transform="translate(1656 206)">
            <tspan x={120} y={30.5}>
              {result["SPX.GI"] && result["SPX.GI"][2]}
            </tspan>
          </text>
        </g>
        <g
          fill={result["000001.SH"] && result["000001.SH"][3]}
          fontFamily="PingFangSC-Regular, PingFang SC"
          fontSize={28}
          letterSpacing={2.294}
        >
          <text transform="translate(535 252)">
            <tspan x={0} y={40.5}>
              {result["000001.SH"] && result["000001.SH"][1]}
            </tspan>
          </text>
          <text transform="translate(535 252)">
            <tspan x={130} y={40.5}>
              {result["000001.SH"] && result["000001.SH"][2]}
            </tspan>
          </text>
        </g>
        <g
          fill={result["FTSE.GI"] && result["FTSE.GI"][3]}
          fontFamily="PingFangSC-Regular, PingFang SC"
          fontSize={28}
          letterSpacing={2.294}
        >
          <text transform="translate(207 159)">
            <tspan x={-55} y={25.5}>
              {result["FTSE.GI"] && result["FTSE.GI"][1]}
            </tspan>
          </text>
          <text transform="translate(207 159)">
            <tspan x={80} y={25.5}>
              {result["FTSE.GI"] && result["FTSE.GI"][2]}
            </tspan>
          </text>
        </g>
        <text
          fontFamily="PingFangSC-Medium, PingFang SC"
          fontSize={48}
          fontWeight={400}
          letterSpacing={3.933}
          fill="#FA2832"
        >
          <tspan x={nowLocation(result["STI.GI"], 446)} y={684}>
            {result["STI.GI"] && result["STI.GI"][0]}
          </tspan>
        </text>
        <text
          fontFamily="PingFangSC-Medium, PingFang SC"
          fontSize={48}
          fontWeight={400}
          letterSpacing={3.933}
          fill="#FA2832"
        >
          <tspan x={nowLocation(result["399001.SZ"], 447)} y={425}>
            {result["399001.SZ"] && result["399001.SZ"][0]}
          </tspan>
        </text>
        <text
          fontFamily="PingFangSC-Medium, PingFang SC"
          fontSize={48}
          fontWeight={400}
          letterSpacing={3.933}
          fill="#FA2832"
        >
          <tspan x={nowLocation(result["N225.GI"], 906)} y={482}>
            {result["N225.GI"] && result["N225.GI"][0]}
          </tspan>
        </text>
        <text
          fontFamily="PingFangSC-Medium, PingFang SC"
          fontSize={48}
          fontWeight={400}
          letterSpacing={3.933}
          fill="#FA2832"
        >
          <tspan x={nowLocation(result["DJI.GI"], 1335)} y={235}>
            {result["DJI.GI"] && result["DJI.GI"][0]}
          </tspan>
        </text>
        <text
          fontFamily="PingFangSC-Medium, PingFang SC"
          fontSize={48}
          fontWeight={400}
          letterSpacing={3.933}
          fill="#FA2832"
        >
          <tspan x={nowLocation(result["IXIC.GI"], 1383)} y={436}>
            {result["IXIC.GI"]&&result["IXIC.GI"][0]}
          </tspan>
        </text>
        <text
          fontFamily="PingFangSC-Medium, PingFang SC"
          fontSize={48}
          fontWeight={400}
          letterSpacing={3.933}
          fill="#FA2832"
        >
          <tspan x={nowLocation(result["SPX.GI"], 1659)} y={185}>
            {result["SPX.GI"]&&result["SPX.GI"][0]}
          </tspan>
        </text>
        <text
          fontFamily="PingFangSC-Medium, PingFang SC"
          fontSize={48}
          fontWeight={400}
          letterSpacing={3.933}
          fill="#FA2832"
        >
          <tspan x={nowLocation(result["000001.SH"],548)} y={241}>
            {result["000001.SH"] && result["000001.SH"][0]}
          </tspan>
        </text>
        <text
          fontFamily="PingFangSC-Medium, PingFang SC"
          fontSize={48}
          fontWeight={400}
          letterSpacing={3.933}
          fill="#FA2832"
        >
          <tspan x={nowLocation(result["FTSE.GI"],160)} y={133}>
            {result["FTSE.GI"] && result["FTSE.GI"][0]}
          </tspan>
        </text>
      </g>
    </svg>
  )
}

export default SvgComponent
