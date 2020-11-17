import * as React from 'react';

const Arrows = ({ lastYear, thisYear, point }) => {
  if (lastYear >= thisYear) {
    return (
      <path
        d={`M${point}m0 28.6l8.212-13.244a.4.4 0 00-.34-.61h-6.416v-14.222a.4.4 0 00-.4-.4h-2.671a.4.4 0 00-.4.4l-.001 14.222h-5.857a.4.4 0 00-.34.61l8.212 13.244z`}
    fill ="#5FF678"
      />
    );
  } else {
    return (
      <path
        d={`M${point}l8.212 13.244a.4.4 0 01-.34.61h-6.416v14.222a.4.4 0 01-.4.4h-2.671a.4.4 0 01-.4-.4l-.001-14.222h-5.857a.4.4 0 01-.34-.61l8.212-13.244z`}
        fill="#C12827"
      />
    );
  }
};

function SvgComponent(props) {
  const { centerData: data } = props;

  const compositeIndex = (value) => {
    return parseInt(value) >= 60 ? (parseInt(value) >= 80 ? '优秀' : '良好') : "一般";
  }

  const compositeIndexNew = (value) => {
    return parseInt(value) >= 50 ? (parseInt(value) >= 80 ? '优秀' : '良好') : "一般";
  }

  const compositeIndexColor = (value) => {
    return parseInt(value) >= 60 ? (parseInt(value) >= 80 ? '#41FDFF' : '#FFF603') : '#FB5E00';
  }

  const compositeIndexColorNew = (value) => {
    return parseInt(value) >= 50 ? (parseInt(value) >= 80 ? '#41FDFF' : '#FFF603') : '#FB5E00';
  }

  const lastValueColor = ( lastYear, thisYear) => {
    return parseInt(lastYear) >= parseInt(thisYear) ? '#5FF678' : '#C12827';
  };

  const compareResult = (lastYear, thisYear) => {
    const result = (parseInt(thisYear) - parseInt(lastYear)).toFixed();
    return result > 0 ? `+${result}` : result;
  };

  const nowLocation = (data, preLocaltion, distance) => {
    return data && (parseFloat(data) > 10 ? preLocaltion : (preLocaltion + distance) )
  }

  const nowLocation2 = (data, preLocaltion) => {
    if (data?.toString().length === 2) {
      return preLocaltion - 21;
    }
    return data && (data.toString().length > 1 ? (preLocaltion - (data.length * 15.3)) : preLocaltion )
  }


  /* const data = {
    p1_1_1: 9,
    // p1_1_2: '稳健',
    // p1_1_1a2_c: highColor,
    p1_1_3: 80,
    // p1_1_4: '+10',
    // p1_1_3a4_c: upColor,
    // p1_1_5: arrows(),
    p1_1_6: 92,
    // p1_1_7: '-2',
    // p1_1_6a7_c: downColor,
    // p1_1_8: arrows(92, 90,"1857.08 200.476"),
    p2_1_1: 30,
    // p2_1_2: "危险",
    // p2_1_1a2_c: lowColor,
    p2_1_3: 8,
    // p2_1_4: '+10',
    // p2_1_3a4_c: upColor,
    // p2_1_5: arrows(80, 30,"973.08 474"),
    p2_1_6: 92,
    // p2_1_7: '-2',
    // p2_1_6a7_c: downColor,
    // p2_1_8: arrows(92, 30, "973.08 520.476"),
    p2_2_1: 7,
    // p2_2_2: '平淡',
    // p2_2_1a2_c: mediumColor,
    p2_2_3: 80,
    // p2_2_4: '+10',
    // p2_2_3a4_c: upColor,
    // p2_2_5: arrows(80, 75, "2740.08 474"),
    p2_2_6: 92,
    // p2_2_7: '-2',
    // p2_2_6a7_c: downColor,
    // p2_2_8: arrows(80, 75, "2740.08 520.476"),
    p3_1: "9",
    p3_2: "99",
    p3_3: "999",
    p3_4: "9999",
    p3_5: "9",
    p3_6: "9",
    p3_7: "9",
    p4_1: "99999",
    p4_2: "9",
    p4_3: "9",
    p4_4: "9",
    p4_5: "9",
    p4_6: "90",
  }; */
  return (
    <svg width={"100%"} height={"100%"} viewBox="0 0 3184 1980">
      {/* <title>{"\u62D3\u6251\u56FE\u8C03\u65741"}</title> */}
      <defs>
        <linearGradient
          x1="72.702%"
          y1="43.613%"
          x2="57.493%"
          y2="58.17%"
          id="prefix__c"
        >
          <stop stopColor="#2867F9" offset="0%" />
          <stop stopColor="#1D82A4" offset="100%" />
        </linearGradient>
        <linearGradient
          x1="54.117%"
          y1="42.118%"
          x2="65.686%"
          y2="59.933%"
          id="prefix__f"
        >
          <stop stopColor="#2867F9" offset="0%" />
          <stop stopColor="#2232A5" offset="100%" />
        </linearGradient>
        <linearGradient
          x1="83.091%"
          y1="46.341%"
          x2="112.538%"
          y2="58.548%"
          id="prefix__i"
        >
          <stop stopColor="#2867F9" offset="0%" />
          <stop stopColor="#931AFF" offset="100%" />
        </linearGradient>
        <linearGradient x1="50%" y1=".288%" x2="50%" y2="100%" id="prefix__k">
          <stop stopColor="#5AB4F7" stopOpacity={0.046} offset="0%" />
          <stop stopColor="#3200A5" offset="100%" />
        </linearGradient>
        <linearGradient x1="50%" y1="0%" x2="50%" y2="100%" id="prefix__l">
          <stop stopColor="#031C62" offset="0%" />
          <stop stopColor="#BFFFF9" offset="100%" />
        </linearGradient>
        <linearGradient
          x1="53.295%"
          y1="57.147%"
          x2="50%"
          y2="39.526%"
          id="prefix__m"
        >
          <stop stopColor="#03B4F0" offset="0%" />
          <stop stopColor="#083DAC" offset="100%" />
        </linearGradient>
        <linearGradient
          x1="79.099%"
          y1="23.71%"
          x2="26.135%"
          y2="75.513%"
          id="prefix__n"
        >
          <stop stopColor="#8DE5F8" offset="0%" />
          <stop stopColor="#0B5ED6" offset="100%" />
        </linearGradient>
        <linearGradient
          x1="78.047%"
          y1="15.075%"
          x2="15.693%"
          y2="89.718%"
          id="prefix__o"
        >
          <stop stopColor="#02B9F1" offset="0%" />
          <stop stopColor="#0976DD" offset="100%" />
        </linearGradient>
        <linearGradient x1="50%" y1="0%" x2="50%" y2="100%" id="prefix__p">
          <stop stopColor="#056382" offset="0%" />
          <stop stopColor="#03B7F1" offset="100%" />
        </linearGradient>
        <linearGradient x1="50%" y1="0%" x2="50%" y2="100%" id="prefix__q">
          <stop stopColor="#740DA4" stopOpacity={0} offset="0%" />
          <stop stopColor="#4978FF" offset="100%" />
        </linearGradient>
        <rect
          id="prefix__a"
          x={0}
          y={0}
          width={670}
          height={239.456}
          rx={119.728}
        />
        <rect
          id="prefix__e"
          x={0}
          y={0}
          width={670}
          height={239.456}
          rx={119.728}
        />
        <rect
          id="prefix__h"
          x={0}
          y={0}
          width={670}
          height={239.456}
          rx={119.728}
        />
        <radialGradient
          cx="85.137%"
          cy="-7.415%"
          fx="85.137%"
          fy="-7.415%"
          r="142.805%"
          gradientTransform="scale(-.3574 -1) rotate(-40.575 -.565 4.374)"
          id="prefix__b"
        >
          <stop stopColor="#86A9FF" offset="0%" />
          <stop stopColor="#2D41C8" stopOpacity={0.699} offset="100%" />
        </radialGradient>
      </defs>
      <g transform="translate(0 1)" fill="none" fillRule="evenodd">
        <g transform="translate(1377 8)">
          <mask id="prefix__d" fill="#fff">
            <use xlinkHref="#prefix__a" />
          </mask>
          <use
            stroke="url(#prefix__b)"
            fill="url(#prefix__c)"
            xlinkHref="#prefix__a"
          />
          <ellipse
            fill="#0FB8FF"
            opacity={0.103}
            mask="url(#prefix__d)"
            cx={68.676}
            cy={109.082}
            rx={171.676}
            ry={184.082}
          />
          <ellipse
            fill="#0F20FF"
            opacity={0.103}
            mask="url(#prefix__d)"
            cx={73.676}
            cy={60.082}
            rx={171.676}
            ry={184.082}
          />
          <ellipse
            fill="#4132FF"
            opacity={0.103}
            mask="url(#prefix__d)"
            cx={37.676}
            cy={31.082}
            rx={171.676}
            ry={184.082}
          />
        </g>
        <text
          fontFamily="PingFangSC-Medium, PingFang SC"
          fontSize={32}
          fontWeight={400}
          letterSpacing={4.242}
          transform="translate(1638 150)"
        >
          <tspan x={0} y={30} fill="#FFF">
            {'去年同期'}
          </tspan>
          <tspan x={128.968} y={30} fill="#5CB8F1" />
          <tspan x={170.534} y={30} fill={lastValueColor(data?.p1_1_3, data?.p1_1_1)}>
            {data?.p1_1_3}
          </tspan>
        </text>
        <text
          fontFamily="PingFangSC-Medium, PingFang SC"
          fontSize={32}
          fontWeight={400}
          letterSpacing={4.242}
          fill={lastValueColor(data?.p1_1_3, data?.p1_1_1)}
          transform="translate(1638 150)"
        >
          <tspan x={237} y={30}>
            {compareResult(data?.p1_1_3, data?.p1_1_1)}
          </tspan>
        </text>
        <Arrows lastYear={data?.p1_1_3} thisYear={data?.p1_1_1} point="1966.08 156"/>
        <text
          fontFamily="PingFangSC-Medium, PingFang SC"
          fontSize={32}
          fontWeight={400}
          letterSpacing={4.242}
          fill={lastValueColor(data?.p1_1_6, data?.p1_1_1)}
          transform="translate(1638 193)"
        >
          <tspan x={237} y={30}>
            {compareResult(data?.p1_1_6, data?.p1_1_1)}
          </tspan>
        </text>
        <text
          fontFamily="PingFangSC-Medium, PingFang SC"
          fontSize={32}
          fontWeight={400}
          letterSpacing={4.242}
          transform="translate(1638 193)"
        >
          <tspan x={0} y={30} fill="#FFF">
            {'上期指数'}
          </tspan>
          <tspan x={128.968} y={30} fill="#5CB8F1" />
          <tspan x={170.534} y={30} fill={lastValueColor(data?.p1_1_6, data?.p1_1_1)}>
            {data?.p1_1_6}
          </tspan>
        </text>
        <Arrows lastYear={data?.p1_1_6} thisYear={data?.p1_1_1} point="1966.08 203.476" />
        <text
          fontFamily="PingFangSC-Semibold, PingFang SC"
          fontSize={52}
          fontWeight={500}
          fill={compositeIndexColor(data?.p1_1_1)}
        >
          <tspan x={1755} y={116}>
            {compositeIndex(data?.p1_1_1)}
          </tspan>
        </text>
        <text
          fontFamily="PingFangSC-Semibold, PingFang SC"
          fontSize={100}
          fontWeight={500}
          letterSpacing={8.193}
          fill={compositeIndexColor(data?.p1_1_1)}
        >
          <tspan x={nowLocation(data?.p1_1_1, 1408, 45)} y={164}>
            {data?.p1_1_1}
          </tspan>
          <tspan
            x={1536.085}
            y={164}
            fontFamily="PingFangSC-Regular, PingFang SC"
            fontSize={50}
            fontWeight="normal"
            letterSpacing={-2.425}
          >
            {"\u5206"}
          </tspan>
        </text>
        <rect stroke="#3475FF" x={1368} width={688} height={256} rx={128} />
        <g transform="translate(2260 326)">
          <mask id="prefix__g" fill="#fff">
            <use xlinkHref="#prefix__e" />
          </mask>
          <use
            stroke="url(#prefix__b)"
            fill="url(#prefix__f)"
            xlinkHref="#prefix__e"
          />
          <ellipse
            fill="#0FFFB1"
            opacity={0.103}
            mask="url(#prefix__g)"
            cx={68.676}
            cy={109.082}
            rx={171.676}
            ry={184.082}
          />
          <ellipse
            fill="#0FFFB1"
            opacity={0.103}
            mask="url(#prefix__g)"
            cx={73.676}
            cy={60.082}
            rx={171.676}
            ry={184.082}
          />
          <ellipse
            fill="#07D6B7"
            opacity={0.103}
            mask="url(#prefix__g)"
            cx={37.676}
            cy={31.082}
            rx={171.676}
            ry={184.082}
          />
        </g>
        <text
          fontFamily="PingFangSC-Regular, PingFang SC"
          fontSize={24}
          letterSpacing={3.636}
          fill="#FFF"
        >
          <tspan x={2634} y={367}>
            {"机构指数"}
          </tspan>
        </text>
        <text
          fontFamily="PingFangSC-Medium, PingFang SC"
          fontSize={32}
          fontWeight={400}
          letterSpacing={4.242}
          transform="translate(2521 468)"
        >
          <tspan x={0} y={30} fill="#FFF">
            {"\u53BB\u5E74\u540C\u671F"}
          </tspan>
          <tspan x={128.968} y={30} fill="#5CB8F1" />
          <tspan x={170.534} y={30} fill={lastValueColor(data?.p2_2_3, data?.p2_2_1)}>
            {data?.p2_2_3}
          </tspan>
        </text>
        <text
          fontFamily="PingFangSC-Medium, PingFang SC"
          fontSize={32}
          fontWeight={400}
          letterSpacing={4.242}
          fill={lastValueColor(data?.p2_2_3, data?.p2_2_1)}
          transform="translate(2521 468)"
        >
          <tspan x={237} y={30}>
            {compareResult(data?.p2_2_3, data?.p2_2_1)}
          </tspan>
        </text>
        <Arrows lastYear={data?.p2_2_3} thisYear={data?.p2_2_1} point="2849.08 474" />
        <text
          fontFamily="PingFangSC-Medium, PingFang SC"
          fontSize={32}
          fontWeight={400}
          letterSpacing={4.242}
          fill={lastValueColor(data?.p2_2_6,data?.p2_2_1)}
          transform="translate(2521 511)"
        >
          <tspan x={237} y={30}>
            {compareResult(data?.p2_2_6, data?.p2_2_1)}
          </tspan>
        </text>
        <text
          fontFamily="PingFangSC-Medium, PingFang SC"
          fontSize={32}
          fontWeight={400}
          letterSpacing={4.242}
          transform="translate(2521 511)"
        >
          <tspan x={0} y={30} fill="#FFF">
            {"\u4E0A\u671F\u6307\u6570"}
          </tspan>
          <tspan x={128.968} y={30} fill="#5CB8F1" />
          <tspan x={170.534} y={30} fill={lastValueColor(data?.p2_2_6, data?.p2_2_1)}>
            {data?.p2_2_6}
          </tspan>
        </text>
        <Arrows lastYear={data?.p2_2_6} thisYear={data?.p2_2_1} point="2849.08 523.476" />
        <text
          fontFamily="PingFangSC-Semibold, PingFang SC"
          fontSize={52}
          fontWeight={500}
          fill={compositeIndexColorNew(data?.p2_2_1)}
        >
          <tspan x={2638} y={434}>
            {compositeIndexNew(data?.p2_2_1)}
          </tspan>
        </text>
        <text
          fontFamily="PingFangSC-Semibold, PingFang SC"
          fontSize={100}
          fontWeight={500}
          letterSpacing={8.193}
          fill={compositeIndexColorNew(data?.p2_2_1)}
        >
          <tspan x={nowLocation(data?.p2_2_1, 2291, 45)} y={482}>
            {data?.p2_2_1}
          </tspan>
          <tspan
            x={2422.687}
            y={482}
            fontFamily="PingFangSC-Regular, PingFang SC"
            fontSize={50}
            fontWeight="normal"
            letterSpacing={-2.425}
          >
            {"\u5206"}
          </tspan>
        </text>
        <rect
          stroke="#3475FF"
          x={2251}
          y={318}
          width={688}
          height={256}
          rx={128}
        />
        <g transform="translate(493 326)">
          <mask id="prefix__j" fill="#fff">
            <use xlinkHref="#prefix__h" />
          </mask>
          <use
            stroke="url(#prefix__b)"
            fill="url(#prefix__i)"
            xlinkHref="#prefix__h"
          />
          <ellipse
            fill="#0FFFB1"
            opacity={0.103}
            mask="url(#prefix__j)"
            cx={68.676}
            cy={109.082}
            rx={171.676}
            ry={184.082}
          />
          <ellipse
            fill="#0FFFB1"
            opacity={0.103}
            mask="url(#prefix__j)"
            cx={73.676}
            cy={60.082}
            rx={171.676}
            ry={184.082}
          />
          <ellipse
            fill="#07D6B7"
            opacity={0.103}
            mask="url(#prefix__j)"
            cx={37.676}
            cy={31.082}
            rx={171.676}
            ry={184.082}
          />
        </g>
        <text
          fontFamily="PingFangSC-Regular, PingFang SC"
          fontSize={24}
          letterSpacing={3.636}
          fill="#FFF"
        >
          <tspan x={867} y={367}>
            {"市场指数"}
          </tspan>
        </text>
        <text
          fontFamily="PingFangSC-Medium, PingFang SC"
          fontSize={32}
          fontWeight={400}
          letterSpacing={4.242}
          transform="translate(754 468)"
        >
          <tspan x={0} y={30} fill="#FFF">
            {'去年同期'}
          </tspan>
          <tspan x={128.968} y={30} fill="#5CB8F1" />
          <tspan x={170.534} y={30} fill={lastValueColor(data?.p2_1_3, data?.p2_1_1)}>
            {data?.p2_1_3}
          </tspan>
        </text>
        <text
          fontFamily="PingFangSC-Medium, PingFang SC"
          fontSize={32}
          fontWeight={400}
          letterSpacing={4.242}
          fill={lastValueColor(data?.p2_1_3, data?.p2_1_1)}
          transform="translate(754 468)"
        >
          <tspan x={237} y={30}>
            {compareResult(data?.p2_1_3, data?.p2_1_1)}
          </tspan>
        </text>
        <Arrows lastYear={data?.p2_1_3} thisYear={data?.p2_1_1} point="1082.08 474" />
        <text
          fontFamily="PingFangSC-Medium, PingFang SC"
          fontSize={32}
          fontWeight={400}
          letterSpacing={4.242}
          fill={lastValueColor(data?.p2_1_6, data?.p2_1_1)}
          transform="translate(754 511)"
        >
          <tspan x={237} y={30}>
            {compareResult(data?.p2_1_6, data?.p2_1_1)}
          </tspan>
        </text>
        <text
          fontFamily="PingFangSC-Medium, PingFang SC"
          fontSize={32}
          fontWeight={400}
          letterSpacing={4.242}
          transform="translate(754 511)"
        >
          <tspan x={0} y={30} fill="#FFF">
            {"\u4E0A\u671F\u6307\u6570"}
          </tspan>
          <tspan x={128.968} y={30} fill="#5CB8F1" />
          <tspan x={170.534} y={30} fill={lastValueColor(data?.p2_1_6, data?.p2_1_1)}>
            {data?.p2_1_6}
          </tspan>
        </text>
        <Arrows lastYear={data?.p2_1_6} thisYear={data?.p1_1_1} point="1082.08 523.476" />
        <text
          fontFamily="PingFangSC-Semibold, PingFang SC"
          fontSize={52}
          fontWeight={500}
          fill={compositeIndexColor(data?.p2_1_1)}
        >
          <tspan x={871} y={434}>
            {compositeIndex(data?.p2_1_1)}
          </tspan>
        </text>
        <text
          fontFamily="PingFangSC-Semibold, PingFang SC"
          fontSize={100}
          fontWeight={500}
          letterSpacing={8.193}
          fill={compositeIndexColor(data?.p2_1_1)}
        >
          <tspan x={nowLocation(data?.p2_1_1, 524, 45)} y={482}>
            {data?.p2_1_1}
          </tspan>
          <tspan
            x={660.387}
            y={482}
            fontFamily="PingFangSC-Regular, PingFang SC"
            fontSize={50}
            fontWeight="normal"
            letterSpacing={-2.425}
          >
            {"\u5206"}
          </tspan>
        </text>
        <rect
          stroke="#3475FF"
          x={484}
          y={318}
          width={688}
          height={256}
          rx={128}
        />
        <g transform="translate(1187 438)">
          <circle
            fill="#0DD3B4"
            transform="matrix(-1 0 0 1 2084 0)"
            cx={1042}
            cy={8}
            r={8}
          />
          <circle
            fill="#0DD3B4"
            transform="matrix(-1 0 0 1 16 0)"
            cx={8}
            cy={8}
            r={8}
          />
          <path stroke="#39B5BC" strokeLinecap="square" d="M1035 7L16 8" />
        </g>
        <circle
          cx={8}
          cy={8}
          r={8}
          transform="matrix(0 -1 -1 0 1720 425)"
          fill="#0DD3B4"
        />
        <path stroke="#0DD3B4" strokeLinecap="square" d="M1713 268v146" />
        <text
          fontFamily="PingFangSC-Regular, PingFang SC"
          fontSize={40}
          letterSpacing={6.06}
          fill="#41FDFF"
        >
          <tspan x={430.82} y={887}>
            {"\u4E0A\u8BC1\u57FA\u91D1\u6307\u6570"}
          </tspan>
        </text>
        <path
          fill="url(#prefix__k)"
          opacity={0.789}
          d="M170 163.71l170-92.023v189.601l-170 88.953z"
          transform="translate(0 1628)"
        />
        <path
          fill="url(#prefix__l)"
          opacity={0.434}
          d="M178.533 0L340 71.996l-170 91.86L0 74.48z"
          transform="translate(0 1628)"
        />
        <g transform="translate(88.072 1792.88)">
          <path
            fill="url(#prefix__m)"
            d="M77.37.775l85.461 31.503-65.25 35.12L82.895 75.3 0 32.278z"
          />
          <path
            fill="url(#prefix__n)"
            transform="matrix(1 0 0 -1 0 156.198)"
            d="M2.171 75.065l80.33-43.354v49.762l-80.33 43.014z"
          />
          <path
            fill="url(#prefix__o)"
            transform="rotate(180 122.666 78.099)"
            d="M82.501 78.099l80.33-46.388v50.056l-80.33 42.72z"
          />
          <ellipse
            fill="url(#prefix__p)"
            cx={80.33}
            cy={31.462}
            rx={34.737}
            ry={15.343}
          />
        </g>
        <path
          fill="url(#prefix__q)"
          opacity={0.434}
          transform="matrix(1 0 0 -1 0 2053)"
          d="M0 162.48l170-87.721v186.718L0 350.24z"
        />
        <text
          fontFamily="PingFangSC-Semibold, PingFang SC"
          fontSize={56}
          fontWeight={500}
          letterSpacing={4.588}
          fill="#41FDFF"
          transform="translate(0 1628)"
        >
          <tspan x={nowLocation2(data?.p4_1, 150)} y={127}>
            {data?.p4_1}
          </tspan>
        </text>
        <path
          fill="url(#prefix__k)"
          opacity={0.789}
          d="M170 163.71l170-92.023v189.601l-170 88.953z"
          transform="translate(400 1628)"
        />
        <path
          fill="url(#prefix__l)"
          opacity={0.434}
          d="M178.533 0L340 71.996l-170 91.86L0 74.48z"
          transform="translate(400 1628)"
        />
        <g transform="translate(488.072 1792.88)">
          <path
            fill="url(#prefix__m)"
            d="M77.37.775l85.461 31.503-65.25 35.12L82.895 75.3 0 32.278z"
          />
          <path
            fill="url(#prefix__n)"
            transform="matrix(1 0 0 -1 0 156.198)"
            d="M2.171 75.065l80.33-43.354v49.762l-80.33 43.014z"
          />
          <path
            fill="url(#prefix__o)"
            transform="rotate(180 122.666 78.099)"
            d="M82.501 78.099l80.33-46.388v50.056l-80.33 42.72z"
          />
          <ellipse
            fill="url(#prefix__p)"
            cx={80.33}
            cy={31.462}
            rx={34.737}
            ry={15.343}
          />
        </g>
        <path
          fill="url(#prefix__q)"
          opacity={0.434}
          transform="matrix(1 0 0 -1 400 2053)"
          d="M0 162.48l170-87.721v186.718L0 350.24z"
        />
        <text
          fontFamily="PingFangSC-Semibold, PingFang SC"
          fontSize={56}
          fontWeight={500}
          letterSpacing={4.588}
          fill="#41FDFF"
          transform="translate(400 1628)"
        >
          <tspan x={nowLocation2(data?.p4_2, 150)} y={127}>
            {data?.p4_2}
          </tspan>
        </text>
        <path
          fill="url(#prefix__k)"
          opacity={0.789}
          d="M170 163.71l170-92.023v189.601l-170 88.953z"
          transform="translate(800 1628)"
        />
        <path
          fill="url(#prefix__l)"
          opacity={0.434}
          d="M178.533 0L340 71.996l-170 91.86L0 74.48z"
          transform="translate(800 1628)"
        />
        <g transform="translate(888.072 1792.88)">
          <path
            fill="url(#prefix__m)"
            d="M77.37.775l85.461 31.503-65.25 35.12L82.895 75.3 0 32.278z"
          />
          <path
            fill="url(#prefix__n)"
            transform="matrix(1 0 0 -1 0 156.198)"
            d="M2.171 75.065l80.33-43.354v49.762l-80.33 43.014z"
          />
          <path
            fill="url(#prefix__o)"
            transform="rotate(180 122.666 78.099)"
            d="M82.501 78.099l80.33-46.388v50.056l-80.33 42.72z"
          />
          <ellipse
            fill="url(#prefix__p)"
            cx={80.33}
            cy={31.462}
            rx={34.737}
            ry={15.343}
          />
        </g>
        <path
          fill="url(#prefix__q)"
          opacity={0.434}
          transform="matrix(1 0 0 -1 800 2053)"
          d="M0 162.48l170-87.721v186.718L0 350.24z"
        />
        <text
          fontFamily="PingFangSC-Semibold, PingFang SC"
          fontSize={56}
          fontWeight={500}
          letterSpacing={4.588}
          fill="#41FDFF"
          transform="translate(800 1628)"
        >
          <tspan x={nowLocation2(data?.p4_3, 150)} y={127}>
            {data?.p4_3}
          </tspan>
        </text>
        <path
          fill="url(#prefix__k)"
          opacity={0.789}
          d="M170 163.71l170-92.023v189.601l-170 88.953z"
          transform="translate(1200 1628)"
        />
        <path
          fill="url(#prefix__l)"
          opacity={0.434}
          d="M178.533 0L340 71.996l-170 91.86L0 74.48z"
          transform="translate(1200 1628)"
        />
        <g transform="translate(1288.072 1792.88)">
          <path
            fill="url(#prefix__m)"
            d="M77.37.775l85.461 31.503-65.25 35.12L82.895 75.3 0 32.278z"
          />
          <path
            fill="url(#prefix__n)"
            transform="matrix(1 0 0 -1 0 156.198)"
            d="M2.171 75.065l80.33-43.354v49.762l-80.33 43.014z"
          />
          <path
            fill="url(#prefix__o)"
            transform="rotate(180 122.666 78.099)"
            d="M82.501 78.099l80.33-46.388v50.056l-80.33 42.72z"
          />
          <ellipse
            fill="url(#prefix__p)"
            cx={80.33}
            cy={31.462}
            rx={34.737}
            ry={15.343}
          />
        </g>
        <path
          fill="url(#prefix__q)"
          opacity={0.434}
          transform="matrix(1 0 0 -1 1200 2053)"
          d="M0 162.48l170-87.721v186.718L0 350.24z"
        />
        <text
          fontFamily="PingFangSC-Semibold, PingFang SC"
          fontSize={56}
          fontWeight={500}
          letterSpacing={4.588}
          fill="#41FDFF"
          transform="translate(1200 1628)"
        >
          <tspan x={nowLocation2(data?.p4_4, 150)} y={127}>
            {data?.p4_4}
          </tspan>
        </text>
        <text
          fontFamily="PingFangSC-Regular, PingFang SC"
          fontSize={40}
          letterSpacing={6.06}
          fill="#41FDFF"
        >
          <tspan x={78.38} y={887}>
            {"\u4E0A\u8BC1\u6307\u6570"}
          </tspan>
        </text>
        <text
          fontFamily="PingFangSC-Regular, PingFang SC"
          fontSize={40}
          letterSpacing={6.06}
          fill="#41FDFF"
        >
          <tspan x={830.32} y={887}>
            {"\u4E0A\u6D77\u94F6\u884C\u95F4\u540C"}
          </tspan>
          <tspan x={853.35} y={943}>
            {"\u4E1A\u62C6\u653E\u5229\u7387"}
          </tspan>
        </text>
        <text
          fontFamily="PingFangSC-Regular, PingFang SC"
          fontSize={40}
          letterSpacing={6.06}
          fill="#41FDFF"
        >
          <tspan x={1228.82} y={887}>
            {"\u4E0A\u671F\u5DE5\u4E1A\u91D1\u5C5E"}
          </tspan>
          <tspan x={1228.82} y={943}>
            {"\u671F\u8D27\u4EF7\u683C\u6307\u6570"}
          </tspan>
        </text>
        <text
          fontFamily="PingFangSC-Regular, PingFang SC"
          fontSize={40}
          letterSpacing={6.06}
          fill="#41FDFF"
        >
          <tspan x={78} y={1594}>
            {"\u4E0A\u8BC1\u56FD\u503A"}
          </tspan>
        </text>
        <text
          fontFamily="PingFangSC-Regular, PingFang SC"
          fontSize={40}
          letterSpacing={6.06}
          fill="#41FDFF"
        >
          <tspan x={433} y={1594}>
            {"\u6CAA\u6DF1300\u671F\u8D27"}
          </tspan>
        </text>
        <text
          fontFamily="PingFangSC-Regular, PingFang SC"
          fontSize={40}
          letterSpacing={6.06}
          fill="#41FDFF"
        >
          <tspan x={861} y={1594}>
            {"SHFE\u9EC4\u91D1"}
          </tspan>
        </text>
        <text
          fontFamily="PingFangSC-Regular, PingFang SC"
          fontSize={40}
          letterSpacing={6.06}
          fill="#41FDFF"
        >
          <tspan x={1209} y={1594}>
            {"\u4EBA\u6C11\u5E01\u6C47\u7387\u6307\u6570"}
          </tspan>
        </text>
        <circle
          fill="#0DD3B4"
          transform="matrix(-1 0 0 1 2732 0)"
          cx={1366}
          cy={750}
          r={8}
        />
        <circle
          fill="#0DD3B4"
          transform="matrix(-1 0 0 1 344 0)"
          cx={172}
          cy={750}
          r={8}
        />
        <path stroke="#39B5BC" strokeLinecap="square" d="M1366.5 749.5h-1195" />
        <circle
          cx={8}
          cy={8}
          r={8}
          transform="matrix(0 -1 -1 0 577 846)"
          fill="#0DD3B4"
        />
        <path stroke="#0DD3B4" strokeLinecap="square" d="M570 753v82" />
        <circle
          cx={8}
          cy={8}
          r={8}
          transform="matrix(0 -1 -1 0 179 846)"
          fill="#0DD3B4"
        />
        <path stroke="#0DD3B4" strokeLinecap="square" d="M172 753v82" />
        <circle
          cx={8}
          cy={8}
          r={8}
          transform="matrix(0 -1 -1 0 977 846)"
          fill="#0DD3B4"
        />
        <path stroke="#0DD3B4" strokeLinecap="square" d="M969 753v82" />
        <circle
          cx={8}
          cy={8}
          r={8}
          transform="matrix(0 -1 -1 0 1375 846)"
          fill="#0DD3B4"
        />
        <path stroke="#0DD3B4" strokeLinecap="square" d="M1367 753v82" />
        <circle
          fill="#0DD3B4"
          transform="matrix(-1 0 0 1 2744 0)"
          cx={1372}
          cy={1427}
          r={8}
        />
        <circle
          fill="#0DD3B4"
          transform="matrix(-1 0 0 1 346 0)"
          cx={173}
          cy={1427}
          r={8}
        />
        <path
          stroke="#39B5BC"
          strokeLinecap="square"
          d="M1371.5 1426.5h-1199"
        />
        <g>
          <circle
            cx={8}
            cy={8}
            r={8}
            transform="matrix(0 -1 -1 0 579 1523)"
            fill="#0DD3B4"
          />
          <path stroke="#0DD3B4" strokeLinecap="square" d="M572 1430v82" />
        </g>
        <g>
          <circle
            cx={8}
            cy={8}
            r={8}
            transform="matrix(0 -1 -1 0 179 1523)"
            fill="#0DD3B4"
          />
          <path stroke="#0DD3B4" strokeLinecap="square" d="M172 1430v82" />
        </g>
        <g>
          <circle
            cx={8}
            cy={8}
            r={8}
            transform="matrix(0 -1 -1 0 979 1523)"
            fill="#0DD3B4"
          />
          <path stroke="#0DD3B4" strokeLinecap="square" d="M972 1430v82" />
        </g>
        <g>
          <circle
            cx={8}
            cy={8}
            r={8}
            transform="matrix(0 -1 -1 0 1379 1523)"
            fill="#0DD3B4"
          />
          <path stroke="#0DD3B4" strokeLinecap="square" d="M1372 1430v82" />
        </g>
        <g transform="matrix(0 -1 -1 0 839 684)" fill="#0DD3B4">
          <circle cx={8} cy={8} r={8} />
        </g>
        <path
          stroke="#0DD3B4"
          strokeLinecap="square"
          d="M831.5 573.5l.5 99.5"
        />
        <g transform="matrix(0 -1 -1 0 829 1410)" fill="#0DD3B4">
          <circle cx={8} cy={8} r={8} />
        </g>
        <path
          stroke="#0DD3B4"
          strokeLinecap="square"
          d="M833.985 632H1600l-2 714H819v44.401"
        />
        <text
          fontFamily="PingFangSC-Regular, PingFang SC"
          fontSize={40}
          letterSpacing={6.06}
          fill="#41FDFF"
        >
          <tspan x={2076} y={906}>
            {"\u673A\u6784\u8206\u60C5\u6307\u6570"}
          </tspan>
        </text>
        <text
          fontFamily="PingFangSC-Regular, PingFang SC"
          fontSize={40}
          letterSpacing={6.06}
          fill="#41FDFF"
        >
          <tspan x={2476} y={910}>
            {"\u94F6\u884C\u673A\u6784\u6307\u6570"}
          </tspan>
        </text>
        <text
          fontFamily="PingFangSC-Regular, PingFang SC"
          fontSize={40}
          letterSpacing={6.06}
          fill="#41FDFF"
        >
          <tspan x={2876} y={910}>
            {"\u4FDD\u9669\u673A\u6784\u6307\u6570"}
          </tspan>
        </text>
        <g transform="translate(2207 724)">
          <circle
            fill="#0DD3B4"
            transform="matrix(-1 0 0 1 1616 0)"
            cx={808}
            cy={8}
            r={8}
          />
          <circle
            fill="#0DD3B4"
            transform="matrix(-1 0 0 1 16 0)"
            cx={8}
            cy={8}
            r={8}
          />
          <path stroke="#39B5BC" strokeLinecap="square" d="M807.5 8.5H7.5" />
        </g>
        <g>
          <circle
            cx={8}
            cy={8}
            r={8}
            transform="matrix(0 -1 -1 0 2622 828)"
            fill="#0DD3B4"
          />
          <path stroke="#0DD3B4" strokeLinecap="square" d="M2615 735v82" />
        </g>
        <g>
          <circle
            cx={8}
            cy={8}
            r={8}
            transform="matrix(0 -1 -1 0 2222 828)"
            fill="#0DD3B4"
          />
          <path stroke="#0DD3B4" strokeLinecap="square" d="M2215 735v82" />
        </g>
        <g>
          <circle
            cx={8}
            cy={8}
            r={8}
            transform="matrix(0 -1 -1 0 3022 828)"
            fill="#0DD3B4"
          />
          <path stroke="#0DD3B4" strokeLinecap="square" d="M3015 735v82" />
        </g>
        <text
          fontFamily="PingFangSC-Regular, PingFang SC"
          fontSize={40}
          letterSpacing={6.06}
          fill="#41FDFF"
        >
          <tspan x={2275} y={1594}>
            {"\u8BC1\u5238\u673A\u6784\u6307\u6570"}
          </tspan>
        </text>
        <text
          fontFamily="PingFangSC-Regular, PingFang SC"
          fontSize={40}
          letterSpacing={6.06}
          fill="#41FDFF"
        >
          <tspan x={2675} y={1594}>
            {"\u5176\u4ED6\u673A\u6784\u6307\u6570"}
          </tspan>
        </text>
        <g transform="translate(2407 1418)">
          <circle
            fill="#0DD3B4"
            transform="matrix(-1 0 0 1 812 0)"
            cx={406}
            cy={8}
            r={8}
          />
          <circle
            fill="#0DD3B4"
            transform="matrix(-1 0 0 1 16 0)"
            cx={8}
            cy={8}
            r={8}
          />
          <path stroke="#39B5BC" strokeLinecap="square" d="M402.5 9.5L5 9" />
        </g>
        <g>
          <circle
            cx={8}
            cy={8}
            r={8}
            transform="matrix(0 -1 -1 0 2421 1521)"
            fill="#0DD3B4"
          />
          <path stroke="#0DD3B4" strokeLinecap="square" d="M2414 1428v82" />
        </g>
        <g>
          <circle
            cx={8}
            cy={8}
            r={8}
            transform="matrix(0 -1 -1 0 2821 1521)"
            fill="#0DD3B4"
          />
          <path stroke="#0DD3B4" strokeLinecap="square" d="M2814 1428v82" />
        </g>
        <g transform="rotate(-90 2005.5 -593.5)" fill="#0DD3B4">
          <circle cx={8} cy={8} r={8} />
        </g>
        <path
          stroke="#0DD3B4"
          strokeLinecap="square"
          d="M2594.369 631H1984v716.725h623V1391"
        />
        <g>
          <circle
            cx={8}
            cy={8}
            r={8}
            transform="matrix(0 -1 -1 0 2604 706)"
            fill="#0DD3B4"
          />
          <path stroke="#0DD3B4" strokeLinecap="square" d="M2597 613v82" />
        </g>
        <text
          fontFamily="PingFangSC-Regular, PingFang SC"
          fontSize={24}
          letterSpacing={3.636}
          fill="#FFF"
        >
          <tspan x={1751} y={49}>
            {"\u7EFC\u5408\u6307\u6570"}
          </tspan>
        </text>
        <g>
          <path
            fill="url(#prefix__k)"
            opacity={0.789}
            d="M170 163.71l170-92.023v189.601l-170 88.953z"
            transform="translate(1200 977)"
          />
          <path
            fill="url(#prefix__l)"
            opacity={0.434}
            d="M178.533 0L340 71.996l-170 91.86L0 74.48z"
            transform="translate(1200 977)"
          />
          <g transform="translate(1288.072 1141.88)">
            <path
              fill="url(#prefix__m)"
              d="M77.37.775l85.461 31.503-65.25 35.12L82.895 75.3 0 32.278z"
            />
            <path
              fill="url(#prefix__n)"
              transform="matrix(1 0 0 -1 0 156.198)"
              d="M2.171 75.065l80.33-43.354v49.762l-80.33 43.014z"
            />
            <path
              fill="url(#prefix__o)"
              transform="rotate(180 122.666 78.099)"
              d="M82.501 78.099l80.33-46.388v50.056l-80.33 42.72z"
            />
            <ellipse
              fill="url(#prefix__p)"
              cx={80.33}
              cy={31.462}
              rx={34.737}
              ry={15.343}
            />
          </g>
          <path
            fill="url(#prefix__q)"
            opacity={0.434}
            transform="matrix(1 0 0 -1 1200 1402)"
            d="M0 162.48l170-87.721v186.718L0 350.24z"
          />
          <text
            fontFamily="PingFangSC-Semibold, PingFang SC"
            fontSize={56}
            fontWeight={500}
            letterSpacing={4.588}
            fill="#41FDFF"
            transform="translate(1200 977)"
          >
            <tspan x={nowLocation2(data?.p3_4, 150)} y={127}>
              {data?.p3_4}
            </tspan>
          </text>
        </g>
        <g>
          <path
            fill="url(#prefix__k)"
            opacity={0.789}
            d="M170 163.71l170-92.023v189.601l-170 88.953z"
            transform="translate(2044 944)"
          />
          <path
            fill="url(#prefix__l)"
            opacity={0.434}
            d="M178.533 0L340 71.996l-170 91.86L0 74.48z"
            transform="translate(2044 944)"
          />
          <g transform="translate(2132.072 1108.88)">
            <path
              fill="url(#prefix__m)"
              d="M77.37.775l85.461 31.503-65.25 35.12L82.895 75.3 0 32.278z"
            />
            <path
              fill="url(#prefix__n)"
              transform="matrix(1 0 0 -1 0 156.198)"
              d="M2.171 75.065l80.33-43.354v49.762l-80.33 43.014z"
            />
            <path
              fill="url(#prefix__o)"
              transform="rotate(180 122.666 78.099)"
              d="M82.501 78.099l80.33-46.388v50.056l-80.33 42.72z"
            />
            <ellipse
              fill="url(#prefix__p)"
              cx={80.33}
              cy={31.462}
              rx={34.737}
              ry={15.343}
            />
          </g>
          <path
            fill="url(#prefix__q)"
            opacity={0.434}
            transform="matrix(1 0 0 -1 2044 1369)"
            d="M0 162.48l170-87.721v186.718L0 350.24z"
          />
          <text
            fontFamily="PingFangSC-Semibold, PingFang SC"
            fontSize={56}
            fontWeight={500}
            letterSpacing={4.588}
            fill="#41FDFF"
            transform="translate(2044 944)"
          >
            <tspan x={nowLocation(data?.p3_5, 132, 20)} y={127}>
              {data?.p3_5}
            </tspan>
            <tspan
              x={208.377}
              y={127}
              fontFamily="PingFangSC-Regular, PingFang SC"
              fontSize={24}
              fontWeight="normal"
              letterSpacing={1.966}
            >
              {"\u5206"}
            </tspan>
          </text>
        </g>
        <g>
          <path
            fill="url(#prefix__k)"
            opacity={0.789}
            d="M170 163.71l170-92.023v189.601l-170 88.953z"
            transform="translate(2444 944)"
          />
          <path
            fill="url(#prefix__l)"
            opacity={0.434}
            d="M178.533 0L340 71.996l-170 91.86L0 74.48z"
            transform="translate(2444 944)"
          />
          <g transform="translate(2532.072 1108.88)">
            <path
              fill="url(#prefix__m)"
              d="M77.37.775l85.461 31.503-65.25 35.12L82.895 75.3 0 32.278z"
            />
            <path
              fill="url(#prefix__n)"
              transform="matrix(1 0 0 -1 0 156.198)"
              d="M2.171 75.065l80.33-43.354v49.762l-80.33 43.014z"
            />
            <path
              fill="url(#prefix__o)"
              transform="rotate(180 122.666 78.099)"
              d="M82.501 78.099l80.33-46.388v50.056l-80.33 42.72z"
            />
            <ellipse
              fill="url(#prefix__p)"
              cx={80.33}
              cy={31.462}
              rx={34.737}
              ry={15.343}
            />
          </g>
          <path
            fill="url(#prefix__q)"
            opacity={0.434}
            transform="matrix(1 0 0 -1 2444 1369)"
            d="M0 162.48l170-87.721v186.718L0 350.24z"
          />
          <text
            fontFamily="PingFangSC-Semibold, PingFang SC"
            fontSize={56}
            fontWeight={500}
            letterSpacing={4.588}
            fill="#41FDFF"
            transform="translate(2444 944)"
          >
            <tspan x={nowLocation(data?.p3_6, 132, 20)} y={127}>
              {data?.p3_6}
            </tspan>
            <tspan
              x={208.377}
              y={127}
              fontFamily="PingFangSC-Regular, PingFang SC"
              fontSize={24}
              fontWeight="normal"
              letterSpacing={1.966}
            >
              {"\u5206"}
            </tspan>
          </text>
        </g>
        <g>
          <path
            fill="url(#prefix__k)"
            opacity={0.789}
            d="M170 163.71l170-92.023v189.601l-170 88.953z"
            transform="translate(2844 944)"
          />
          <path
            fill="url(#prefix__l)"
            opacity={0.434}
            d="M178.533 0L340 71.996l-170 91.86L0 74.48z"
            transform="translate(2844 944)"
          />
          <g transform="translate(2932.072 1108.88)">
            <path
              fill="url(#prefix__m)"
              d="M77.37.775l85.461 31.503-65.25 35.12L82.895 75.3 0 32.278z"
            />
            <path
              fill="url(#prefix__n)"
              transform="matrix(1 0 0 -1 0 156.198)"
              d="M2.171 75.065l80.33-43.354v49.762l-80.33 43.014z"
            />
            <path
              fill="url(#prefix__o)"
              transform="rotate(180 122.666 78.099)"
              d="M82.501 78.099l80.33-46.388v50.056l-80.33 42.72z"
            />
            <ellipse
              fill="url(#prefix__p)"
              cx={80.33}
              cy={31.462}
              rx={34.737}
              ry={15.343}
            />
          </g>
          <path
            fill="url(#prefix__q)"
            opacity={0.434}
            transform="matrix(1 0 0 -1 2844 1369)"
            d="M0 162.48l170-87.721v186.718L0 350.24z"
          />
          <text
            fontFamily="PingFangSC-Semibold, PingFang SC"
            fontSize={56}
            fontWeight={500}
            letterSpacing={4.588}
            fill="#41FDFF"
            transform="translate(2844 944)"
          >
            <tspan x={nowLocation(data?.p3_7, 132, 20)} y={127}>
              {data?.p3_7}
            </tspan>
            <tspan
              x={208.377}
              y={127}
              fontFamily="PingFangSC-Regular, PingFang SC"
              fontSize={24}
              fontWeight="normal"
              letterSpacing={1.966}
            >
              {"\u5206"}
            </tspan>
          </text>
        </g>
        <g>
          <path
            fill="url(#prefix__k)"
            opacity={0.789}
            d="M170 163.71l170-92.023v189.601l-170 88.953z"
            transform="translate(2243 1628)"
          />
          <path
            fill="url(#prefix__l)"
            opacity={0.434}
            d="M178.533 0L340 71.996l-170 91.86L0 74.48z"
            transform="translate(2243 1628)"
          />
          <g transform="translate(2331.072 1792.88)">
            <path
              fill="url(#prefix__m)"
              d="M77.37.775l85.461 31.503-65.25 35.12L82.895 75.3 0 32.278z"
            />
            <path
              fill="url(#prefix__n)"
              transform="matrix(1 0 0 -1 0 156.198)"
              d="M2.171 75.065l80.33-43.354v49.762l-80.33 43.014z"
            />
            <path
              fill="url(#prefix__o)"
              transform="rotate(180 122.666 78.099)"
              d="M82.501 78.099l80.33-46.388v50.056l-80.33 42.72z"
            />
            <ellipse
              fill="url(#prefix__p)"
              cx={80.33}
              cy={31.462}
              rx={34.737}
              ry={15.343}
            />
          </g>
          <path
            fill="url(#prefix__q)"
            opacity={0.434}
            transform="matrix(1 0 0 -1 2243 2053)"
            d="M0 162.48l170-87.721v186.718L0 350.24z"
          />
          <text
            fontFamily="PingFangSC-Semibold, PingFang SC"
            fontSize={56}
            fontWeight={500}
            letterSpacing={4.588}
            fill="#41FDFF"
            transform="translate(2243 1628)"
          >
            <tspan x={nowLocation(data?.p4_6, 132, 20)} y={127}>
              {data?.p4_5}
            </tspan>
            <tspan
              x={208.377}
              y={127}
              fontFamily="PingFangSC-Regular, PingFang SC"
              fontSize={24}
              fontWeight="normal"
              letterSpacing={1.966}
            >
              {"\u5206"}
            </tspan>
          </text>
        </g>
        <g>
          <path
            fill="url(#prefix__k)"
            opacity={0.789}
            d="M170 163.71l170-92.023v189.601l-170 88.953z"
            transform="translate(2643 1628)"
          />
          <path
            fill="url(#prefix__l)"
            opacity={0.434}
            d="M178.533 0L340 71.996l-170 91.86L0 74.48z"
            transform="translate(2643 1628)"
          />
          <g transform="translate(2731.072 1792.88)">
            <path
              fill="url(#prefix__m)"
              d="M77.37.775l85.461 31.503-65.25 35.12L82.895 75.3 0 32.278z"
            />
            <path
              fill="url(#prefix__n)"
              transform="matrix(1 0 0 -1 0 156.198)"
              d="M2.171 75.065l80.33-43.354v49.762l-80.33 43.014z"
            />
            <path
              fill="url(#prefix__o)"
              transform="rotate(180 122.666 78.099)"
              d="M82.501 78.099l80.33-46.388v50.056l-80.33 42.72z"
            />
            <ellipse
              fill="url(#prefix__p)"
              cx={80.33}
              cy={31.462}
              rx={34.737}
              ry={15.343}
            />
          </g>
          <path
            fill="url(#prefix__q)"
            opacity={0.434}
            transform="matrix(1 0 0 -1 2643 2053)"
            d="M0 162.48l170-87.721v186.718L0 350.24z"
          />
          <text
            fontFamily="PingFangSC-Semibold, PingFang SC"
            fontSize={56}
            fontWeight={500}
            letterSpacing={4.588}
            fill="#41FDFF"
            transform="translate(2643 1628)"
          >
            <tspan x={nowLocation(data?.p4_6, 132, 20)} y={127}>
              {data?.p4_6}
            </tspan>
            <tspan
              x={208.377}
              y={127}
              fontFamily="PingFangSC-Regular, PingFang SC"
              fontSize={24}
              fontWeight="normal"
              letterSpacing={1.966}
            >
              {"\u5206"}
            </tspan>
          </text>
        </g>
        <g>
          <path
            fill="url(#prefix__k)"
            opacity={0.789}
            d="M170 163.71l170-92.023v189.601l-170 88.953z"
            transform="translate(800 977)"
          />
          <path
            fill="url(#prefix__l)"
            opacity={0.434}
            d="M178.533 0L340 71.996l-170 91.86L0 74.48z"
            transform="translate(800 977)"
          />
          <g transform="translate(888.072 1141.88)">
            <path
              fill="url(#prefix__m)"
              d="M77.37.775l85.461 31.503-65.25 35.12L82.895 75.3 0 32.278z"
            />
            <path
              fill="url(#prefix__n)"
              transform="matrix(1 0 0 -1 0 156.198)"
              d="M2.171 75.065l80.33-43.354v49.762l-80.33 43.014z"
            />
            <path
              fill="url(#prefix__o)"
              transform="rotate(180 122.666 78.099)"
              d="M82.501 78.099l80.33-46.388v50.056l-80.33 42.72z"
            />
            <ellipse
              fill="url(#prefix__p)"
              cx={80.33}
              cy={31.462}
              rx={34.737}
              ry={15.343}
            />
          </g>
          <path
            fill="url(#prefix__q)"
            opacity={0.434}
            transform="matrix(1 0 0 -1 800 1402)"
            d="M0 162.48l170-87.721v186.718L0 350.24z"
          />
          <text
            fontFamily="PingFangSC-Semibold, PingFang SC"
            fontSize={56}
            fontWeight={500}
            letterSpacing={4.588}
            fill="#41FDFF"
            transform="translate(800 977)"
          >
            <tspan x={nowLocation2(data?.p3_3, 160)} y={127}>
              {data?.p3_3}
            </tspan>
          </text>
        </g>
        <g>
          <path
            fill="url(#prefix__k)"
            opacity={0.789}
            d="M170 163.71l170-92.023v189.601l-170 88.953z"
            transform="translate(400 977)"
          />
          <path
            fill="url(#prefix__l)"
            opacity={0.434}
            d="M178.533 0L340 71.996l-170 91.86L0 74.48z"
            transform="translate(400 977)"
          />
          <g transform="translate(488.072 1141.88)">
            <path
              fill="url(#prefix__m)"
              d="M77.37.775l85.461 31.503-65.25 35.12L82.895 75.3 0 32.278z"
            />
            <path
              fill="url(#prefix__n)"
              transform="matrix(1 0 0 -1 0 156.198)"
              d="M2.171 75.065l80.33-43.354v49.762l-80.33 43.014z"
            />
            <path
              fill="url(#prefix__o)"
              transform="rotate(180 122.666 78.099)"
              d="M82.501 78.099l80.33-46.388v50.056l-80.33 42.72z"
            />
            <ellipse
              fill="url(#prefix__p)"
              cx={80.33}
              cy={31.462}
              rx={34.737}
              ry={15.343}
            />
          </g>
          <path
            fill="url(#prefix__q)"
            opacity={0.434}
            transform="matrix(1 0 0 -1 400 1402)"
            d="M0 162.48l170-87.721v186.718L0 350.24z"
          />
          <text
            fontFamily="PingFangSC-Semibold, PingFang SC"
            fontSize={56}
            fontWeight={500}
            letterSpacing={4.588}
            fill="#41FDFF"
            transform="translate(400 977)"
          >
            <tspan x={nowLocation2(data?.p3_2, 150)} y={127}>
              {data?.p3_2}
            </tspan>
          </text>
        </g>
        <g>
          <path
            fill="url(#prefix__k)"
            opacity={0.789}
            d="M170 163.71l170-92.023v189.601l-170 88.953z"
            transform="translate(0 977)"
          />
          <path
            fill="url(#prefix__l)"
            opacity={0.434}
            d="M178.533 0L340 71.996l-170 91.86L0 74.48z"
            transform="translate(0 977)"
          />
          <g transform="translate(88.072 1141.88)">
            <path
              fill="url(#prefix__m)"
              d="M77.37.775l85.461 31.503-65.25 35.12L82.895 75.3 0 32.278z"
            />
            <path
              fill="url(#prefix__n)"
              transform="matrix(1 0 0 -1 0 156.198)"
              d="M2.171 75.065l80.33-43.354v49.762l-80.33 43.014z"
            />
            <path
              fill="url(#prefix__o)"
              transform="rotate(180 122.666 78.099)"
              d="M82.501 78.099l80.33-46.388v50.056l-80.33 42.72z"
            />
            <ellipse
              fill="url(#prefix__p)"
              cx={80.33}
              cy={31.462}
              rx={34.737}
              ry={15.343}
            />
          </g>
          <path
            fill="url(#prefix__q)"
            opacity={0.434}
            transform="matrix(1 0 0 -1 0 1402)"
            d="M0 162.48l170-87.721v186.718L0 350.24z"
          />
          <text
            fontFamily="PingFangSC-Semibold, PingFang SC"
            fontSize={56}
            fontWeight={500}
            letterSpacing={4.588}
            fill="#41FDFF"
            transform="translate(0 977)"
          >
            <tspan x={nowLocation2(data?.p3_1, 150)} y={127}>
              {data?.p3_1}
            </tspan>
          </text>
        </g>
      </g>
    </svg>
  );
}

/* SvgComponent.defaultProps = {
  data: [{
    p1_1_1: 111,
    p1_1_2: 112,
    p1_1_3: 113,
    p1_1_4: 114,
    p1_1_5: 115,
    p1_1_6: 116,
    p1_1_7: 117,
    p1_1_8: 118,
    p2_1_1: 211,
    p2_1_2: 212,
    p2_1_3: 213,
    p2_1_4: 214,
    p2_1_5: 215,
    p2_1_6: 216,
    p2_1_7: 217,
    p2_1_8: 218,
    p2_2_1: 221,
    p2_2_2: 222,
    p2_2_3: 223,
    p2_2_4: 224,
    p2_2_5: 225,
    p2_2_6: 226,
    p2_2_7: 227,
    p2_2_8: 228,
    p3_1: 31,
    p3_2: 32,
    p3_3: 33,
    p3_4: 34,
    p3_5: 35,
    p3_6: 36,
    p3_7: 37,
    p4_1: 41,
    p4_2: 42,
    p4_3: 43,
    p4_4: 44,
    p4_5: 45,
    p4_6: 46,
  }]
}; */

export default SvgComponent;
