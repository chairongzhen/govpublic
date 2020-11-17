import * as React from 'react';

const Arrows = ({ lastYear, thisYear, point }) => {
  if (lastYear >= thisYear) {
    return (
      <path
        d={`M${point}m0 28.6l8.212-13.244a.4.4 0 00-.34-.61h-6.416v-14.222a.4.4 0 00-.4-.4h-2.671a.4.4 0 00-.4.4l-.001 14.222h-5.857a.4.4 0 00-.34.61l8.212 13.244z`}
        fill="#5FF678"
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

function SvgA(props) {
  const { center3, center2, center1 } = props;

  const position = (value, oliPosition) => {
    const len = String(value).length;
    if (len > 6) {
      oliPosition -= 7 * (len - 6);
    } else if (len < 6) {
      oliPosition += 8 * (6 - len);
    }
    return oliPosition;
  };
  return (
    <svg
      width={'100%'}
      height={'100%'}
      xmlns="http://www.w3.org/2000/svg"
      xmlnsXlink="http://www.w3.org/1999/xlink"
      {...props}
    >
      <defs>
        <linearGradient x1="50%" y1="0%" x2="50%" y2="100%" id="a_svg__a">
          <stop stopColor="#28AAF0" stopOpacity={0} offset="0%" />
          <stop stopColor="#0FA8F7" offset="100%" />
        </linearGradient>
        <linearGradient x1="19.361%" y1="51.687%" x2="100%" y2="56.546%" id="a_svg__c">
          <stop stopColor="#47C2F4" offset="0%" />
          <stop stopColor="#0B71C1" offset="100%" />
        </linearGradient>
        <linearGradient x1="87.261%" y1="47.612%" x2="25.291%" y2="53.031%" id="a_svg__e">
          <stop stopColor="#0649A9" offset="0%" />
          <stop stopColor="#30D6F2" offset="100%" />
        </linearGradient>
        <linearGradient x1="11.501%" y1="53.059%" x2="78.47%" y2="45.079%" id="a_svg__f">
          <stop stopColor="#1BE2FB" offset="0%" />
          <stop stopColor="#0050B7" offset="100%" />
        </linearGradient>
        <linearGradient x1="0%" y1="45.504%" x2="100%" y2="50%" id="a_svg__g">
          <stop stopColor="#F8FAFB" offset="0%" />
          <stop stopColor="#4AC3F8" offset="100%" />
        </linearGradient>
        <linearGradient x1="50%" y1="0%" x2="50%" y2="100%" id="a_svg__h">
          <stop stopColor="#45D0FF" offset="0%" />
          <stop stopColor="#4768E7" offset="100%" />
        </linearGradient>
        <linearGradient x1="50%" y1="0%" x2="50%" y2="100%" id="a_svg__i">
          <stop stopColor="#2180BE" offset="0%" />
          <stop stopColor="#46C9FE" offset="100%" />
        </linearGradient>
        <linearGradient x1="50%" y1="0%" x2="50%" y2="100%" id="a_svg__j">
          <stop stopColor="#264C89" offset="0%" />
          <stop stopColor="#46BFFB" offset="100%" />
        </linearGradient>
        <linearGradient x1="50%" y1="0%" x2="50%" y2="100%" id="a_svg__k">
          <stop stopColor="#B3E9FB" stopOpacity={0.153} offset="0%" />
          <stop stopColor="#4EAEFB" offset="100%" />
        </linearGradient>
        <linearGradient x1="50%" y1="0%" x2="50%" y2="100%" id="a_svg__l">
          <stop stopColor="#9CE0FC" stopOpacity={0.022} offset="0%" />
          <stop stopColor="#78C0EF" stopOpacity={0.712} offset="100%" />
        </linearGradient>
        <linearGradient x1="50%" y1="0%" x2="50%" y2="100%" id="a_svg__m">
          <stop stopColor="#264C89" offset="0%" />
          <stop stopColor="#46BFFB" stopOpacity={0.068} offset="100%" />
        </linearGradient>
        <linearGradient x1="50%" y1="0%" x2="50%" y2="100%" id="a_svg__n">
          <stop stopColor="#45D0FF" offset="0%" />
          <stop stopColor="#4768E7" offset="100%" />
        </linearGradient>
        <linearGradient x1="50%" y1="0%" x2="50%" y2="100%" id="a_svg__o">
          <stop stopColor="#2180BE" offset="0%" />
          <stop stopColor="#46C9FE" offset="100%" />
        </linearGradient>
        <linearGradient x1="50%" y1="0%" x2="50%" y2="100%" id="a_svg__p">
          <stop stopColor="#264C89" offset="0%" />
          <stop stopColor="#46BFFB" offset="100%" />
        </linearGradient>
        <linearGradient x1="50%" y1="0%" x2="50%" y2="100%" id="a_svg__q">
          <stop stopColor="#B3E9FB" stopOpacity={0.153} offset="0%" />
          <stop stopColor="#4EAEFB" offset="100%" />
        </linearGradient>
        <linearGradient x1="50%" y1="0%" x2="50%" y2="100%" id="a_svg__r">
          <stop stopColor="#9CE0FC" stopOpacity={0.022} offset="0%" />
          <stop stopColor="#78C0EF" stopOpacity={0.712} offset="100%" />
        </linearGradient>
        <linearGradient x1="50%" y1="0%" x2="50%" y2="100%" id="a_svg__s">
          <stop stopColor="#264C89" offset="0%" />
          <stop stopColor="#46BFFB" stopOpacity={0.068} offset="100%" />
        </linearGradient>
        <linearGradient x1="50%" y1="0%" x2="50%" y2="100%" id="a_svg__t">
          <stop stopColor="#28AAF0" stopOpacity={0} offset="0%" />
          <stop stopColor="#331BCA" offset="100%" />
        </linearGradient>
        <linearGradient x1="50%" y1="0%" x2="50%" y2="100%" id="a_svg__u">
          <stop stopColor="#EC6969" stopOpacity={0} offset="0%" />
          <stop stopColor="#0FF7D0" stopOpacity={0.607} offset="100%" />
        </linearGradient>
        <linearGradient x1="50%" y1="0%" x2="50%" y2="100%" id="a_svg__v">
          <stop stopColor="#28AAF0" stopOpacity={0} offset="0%" />
          <stop stopColor="#7124E4" stopOpacity={0.607} offset="100%" />
        </linearGradient>
        <linearGradient x1="50%" y1="0%" x2="50%" y2="100%" id="a_svg__w">
          <stop stopColor="#28AAF0" stopOpacity={0} offset="0%" />
          <stop stopColor="#7BE424" stopOpacity={0.607} offset="100%" />
        </linearGradient>
        <linearGradient x1="50%" y1="0%" x2="50%" y2="100%" id="a_svg__x">
          <stop stopColor="#28AAF0" stopOpacity={0} offset="0%" />
          <stop stopColor="#7124E4" stopOpacity={0.607} offset="100%" />
        </linearGradient>
        <path id="a_svg__b" d="M0 0h72.69v34.82H0z" />
        <path id="a_svg__y" d="M0 0h72.69v34.82H0z" />
        <path id="a_svg__A" d="M0 0h72.69v34.82H0z" />
      </defs>
      <g fill="none" fillRule="evenodd">
        <path
          d="M0 99h178c-33.157 66.667-62.392 100-87.704 100C64.983 199 34.885 165.667 0 99z"
          fill="url(#a_svg__a)"
          opacity={0.27}
        />
        <g transform="translate(55 160)">
          <mask id="a_svg__d" fill="#fff">
            <use xlinkHref="#a_svg__b" />
          </mask>
          <path
            d="M36.345.87C17.009.87 1.298 5.93 1.298 12.166v10.488c0 6.237 15.71 11.295 35.047 11.295 19.336 0 35.046-5.058 35.046-11.295V12.166C71.391 5.929 55.681.87 36.345.87z"
            fill="url(#a_svg__c)"
            mask="url(#a_svg__d)"
          />
        </g>
        <path
          d="M0 13.296c0 6.57 15.803 11.896 35.296 11.896 19.494 0 35.297-5.326 35.297-11.896C70.593 6.726 54.79 1.4 35.296 1.4 15.803 1.4 0 6.726 0 13.296z"
          fill="url(#a_svg__e)"
          transform="translate(55 160)"
        />
        <path
          d="M36.345 25.192C16.3 25.192 0 19.546 0 12.596S16.3 0 36.345 0C56.39 0 72.689 5.646 72.689 12.596s-16.3 12.596-36.344 12.596zm0-24.292C17.026.9 1.298 6.15 1.298 12.596s15.728 11.696 35.047 11.696c19.318 0 35.046-5.25 35.046-11.696S55.663.9 36.345.9z"
          fill="url(#a_svg__f)"
          transform="translate(55 160)"
        />
        <path
          d="M26.715 10.364l-2.977 1.285c-.655.284-.193.772.731.772h8.869c.564 0 1.026-.203 1.026-.455V8.12c0-.399-1.104-.602-1.758-.317l-2.978 1.284L23.79 6.56a4.182 4.182 0 00-2.913 0c-.373.123-.607.368-.607.634s.234.51.607.634l5.84 2.536zm23.688 8.4l-5.814-2.537 2.965-1.292c.654-.285.192-.764-.732-.764h-8.855c-.578 0-1.04.195-1.04.447v3.853c0 .398 1.117.593 1.771.317l2.965-1.292 5.84 2.536a4.221 4.221 0 002.926 0c.37-.126.598-.373.593-.64-.005-.266-.244-.508-.62-.628zm-9.956-6.61l5.84-2.538 2.977 1.293c.654.285 1.758.081 1.758-.317V6.745c0-.252-.462-.447-1.027-.447h-8.868c-.911 0-1.373.48-.732.764l2.978 1.285-5.84 2.538c-.372.123-.606.367-.606.634 0 .266.234.51.606.634.89.357 2.025.357 2.914 0zm-9.612 2.278l-5.834 2.537-2.975-1.293c-.641-.285-1.757-.081-1.757.317v3.853c0 .244.462.448 1.026.448h8.86c.924 0 1.385-.488.731-.765l-2.962-1.292L33.76 15.7c.372-.123.605-.367.605-.634 0-.266-.233-.51-.605-.634a4.214 4.214 0 00-2.924 0z"
          fill="url(#a_svg__g)"
          transform="translate(55 160)"
        />
        <path
          fill="url(#a_svg__h)"
          d="M15.4 10.267l8.4-3.191v24.55l-8.4 2.337z"
          transform="translate(76.3 134)"
        />
        <path
          d="M94.499 147.444l4.9-1.416M94.499 148.859l4.9-1.415M94.499 150.274l4.9-1.415M94.499 153.104l4.9-1.415M94.499 154.52c1.633-.473 3.267-.944 4.9-1.416M94.499 155.934l4.9-1.415"
          stroke="#5BF7FF"
          strokeWidth={0.9}
          strokeLinecap="round"
        />
        <path
          fill="url(#a_svg__i)"
          d="M15.504 5.66L24.5 8.044l-8.995 3.277L6.3 8.41z"
          transform="translate(76.3 134)"
        />
        <path
          fill="url(#a_svg__j)"
          transform="matrix(1 0 0 -1 76.3 175.746)"
          d="M7 11.283l8.4-3.5v23.331L7 33.963z"
        />
        <path
          fill="url(#a_svg__k)"
          opacity={0.694}
          d="M13.36 6.784L27.3 2.83v30.743l-14 3.927z"
          transform="translate(76.3 134)"
        />
        <path
          fill="url(#a_svg__l)"
          opacity={0.694}
          d="M13.708 0l13.591 2.398-13.591 3.97L0 3.483z"
          transform="translate(76.3 134)"
        />
        <path
          fill="url(#a_svg__m)"
          opacity={0.694}
          transform="matrix(1 0 0 -1 76.3 174.33)"
          d="M0 8.34l13.94-5.51L14 34.42 0 37.5z"
        />
        <g>
          <path
            fill="url(#a_svg__n)"
            d="M11.2 8.012l7-2.352v18.09l-7 1.722z"
            transform="translate(63 143.906)"
          />
          <path
            d="M76.3 153.812l3.5-.708M76.3 154.52c1.166-.237 2.333-.473 3.5-.708M76.3 155.934l3.5-.707M76.3 157.35c1.166-.237 2.333-.472 3.5-.708M76.3 158.764l3.5-.707M76.3 160.18l3.5-.708"
            stroke="#5BF7FF"
            strokeWidth={0.54}
            strokeLinecap="round"
          />
          <path
            fill="url(#a_svg__o)"
            d="M11.626 4.245L18.2 6.033 11.626 8.49 4.9 6.308z"
            transform="translate(63 143.906)"
          />
          <path
            fill="url(#a_svg__p)"
            transform="matrix(1 0 0 -1 63 175.746)"
            d="M4.9 8.922l7-2.554v17.025l-7 2.079z"
          />
          <path
            fill="url(#a_svg__q)"
            opacity={0.694}
            d="M10.545 5.028l10.454-2.905v22.586l-10.5 2.886z"
            transform="translate(63 143.906)"
          />
          <path
            fill="url(#a_svg__r)"
            opacity={0.694}
            d="M10.545 0l10.454 1.865-10.454 3.088L0 2.709z"
            transform="translate(63 143.906)"
          />
          <path
            fill="url(#a_svg__s)"
            opacity={0.694}
            transform="matrix(1 0 0 -1 63 173.623)"
            d="M0 6.17l10.455-4.047.045 23.207L0 27.595z"
          />
        </g>
        <g>
          <path
            fill="url(#a_svg__n)"
            d="M11.2 8.012l7-2.352v18.09l-7 1.722z"
            transform="translate(99.399 143.906)"
          />
          <path
            d="M112.698 153.812l3.5-.708M112.698 154.52l3.5-.708M112.698 155.934l3.5-.707M112.698 157.35l3.5-.708M112.698 158.764l3.5-.707M112.698 160.18l3.5-.708"
            stroke="#5BF7FF"
            strokeWidth={0.54}
            strokeLinecap="round"
          />
          <path
            fill="url(#a_svg__o)"
            d="M11.626 4.245L18.2 6.033 11.626 8.49 4.9 6.308z"
            transform="translate(99.399 143.906)"
          />
          <path
            fill="url(#a_svg__p)"
            transform="matrix(1 0 0 -1 99.399 175.746)"
            d="M4.9 8.922l7-2.554v17.025l-7 2.079z"
          />
          <path
            fill="url(#a_svg__q)"
            opacity={0.694}
            d="M10.545 5.028l10.454-2.905v22.586l-10.5 2.886z"
            transform="translate(99.399 143.906)"
          />
          <path
            fill="url(#a_svg__r)"
            opacity={0.694}
            d="M10.545 0l10.454 1.865-10.454 3.088L0 2.709z"
            transform="translate(99.399 143.906)"
          />
          <path
            fill="url(#a_svg__s)"
            opacity={0.694}
            transform="matrix(1 0 0 -1 99.399 173.623)"
            d="M0 6.17l10.455-4.047.045 23.207L0 27.595z"
          />
        </g>
        <path
          d="M0 2.648L178 0c-33.157 132.667-62.392 199-87.704 199C64.983 199 34.885 133.55 0 2.648z"
          fill="url(#a_svg__t)"
          opacity={0.27}
        />
        <path fill="url(#a_svg__u)" opacity={0.148} d="M67 62h52L93.757 194z" />
        <path
          d="M109.572 55.519l18.372.082.56 126.402c-.052 5.333-2.905 9.372-8.558 12.116-5.653 2.745-8.904 3.266-9.753 1.563l-.621-140.163z"
          fill="url(#a_svg__v)"
          opacity={0.123}
          transform="rotate(22 119.038 126.09)"
        />
        <path
          d="M46.352 52.492l18.362.07.474 126.474c-.056 5.336-2.91 9.379-8.562 12.129-5.651 2.75-8.9 3.274-9.749 1.57l-.525-140.243z"
          fill="url(#a_svg__w)"
          opacity={0.128}
          transform="scale(-1 1) rotate(18 0 -229.015)"
        />
        <path
          d="M52.847 57.292l18.365.073.496 126.457c-.055 5.335-2.909 9.377-8.56 12.126-5.652 2.749-8.902 3.272-9.75 1.569l-.55-140.225z"
          fill="url(#a_svg__x)"
          opacity={0.075}
          transform="scale(-1 1) rotate(19 0 -244.264)"
        />
        <g fill={center1.sequential >= 0 ? '#FA2832' : '#16BC50'}>
          {center1.sequential ? (
            center1.sequential >= 0 ? (
              <g fill="#FA2832" fillRule="nonzero" stroke="#FA2832" strokeWidth={0.2}>
                <path d="M120.702 130.86l3.593-3.999-.598.003 3.588 3.932a.404.404 0 00.568.029.396.396 0 00.028-.563l-3.588-3.933-.3-.329-.298.331-3.593 4a.396.396 0 00.033.562c.165.146.42.132.567-.033h0z" />
                <path d="M123.62 127.203l-.007 12.597a.4.4 0 00.402.398.4.4 0 00.402-.398l.008-12.596a.4.4 0 00-.402-.4.4.4 0 00-.402.4h0z" />
              </g>
            ) : (
              <g fill="#16BC50" fillRule="nonzero" stroke="#16BC50" strokeWidth={0.2}>
                <path d="M127.298 136.14l-3.593 3.999.598-.003-3.588-3.932a.404.404 0 00-.568-.029.396.396 0 00-.028.563l3.588 3.933.3.329.298-.331 3.593-4a.396.396 0 00-.033-.562.404.404 0 00-.567.033h0z" />
                <path d="M124.38 138.797l.007-12.597a.4.4 0 00-.402-.398.4.4 0 00-.402.398l-.008 12.596a.4.4 0 00.402.4.4.4 0 00.402-.4h0z" />
              </g>
            )
          ) : null}

          <text
            fontFamily="PingFangSC-Regular, PingFang SC"
            fontSize={22}
            transform="translate(50 116)"
          >
            <tspan x={0} y={23}>
              {center1.sequential ? center1.sequential + '%' : '暂无'}
            </tspan>
          </text>
        </g>
        <text fontFamily="PingFangSC-Regular, PingFang SC" fontSize={18} fill="#2BF9FF">
          <tspan x={0} y={24}>
            {'房地产开发投资完成额'}
          </tspan>
        </text>
        <text fontFamily="PingFangSC-Semibold, PingFang SC" fontSize={24} fontWeight={500}>
          <tspan x={position(center1.currentValue, 50)} y={82} fill="#F68717">
            {center1.currentValue}
          </tspan>
          <tspan
            x={65.312}
            y={105.848}
            fontFamily="PingFangSC-Regular, PingFang SC"
            fontSize={16}
            fontWeight="normal"
            fill="#09D7FF"
          >
            {'\u4E07\u4EBF\u5143'}
          </tspan>
        </text>
        <g>
          <path
            d="M0 99h178c-33.157 66.667-62.392 100-87.704 100C64.983 199 34.885 165.667 0 99z"
            fill="url(#a_svg__a)"
            opacity={0.27}
            transform="translate(205)"
          />
          <g transform="translate(260 160)">
            <mask id="a_svg__z" fill="#fff">
              <use xlinkHref="#a_svg__y" />
            </mask>
            <path
              d="M36.345.87C17.009.87 1.298 5.93 1.298 12.166v10.488c0 6.237 15.71 11.295 35.047 11.295 19.336 0 35.046-5.058 35.046-11.295V12.166C71.391 5.929 55.681.87 36.345.87z"
              fill="url(#a_svg__c)"
              mask="url(#a_svg__z)"
            />
          </g>
          <path
            d="M0 13.296c0 6.57 15.803 11.896 35.296 11.896 19.494 0 35.297-5.326 35.297-11.896C70.593 6.726 54.79 1.4 35.296 1.4 15.803 1.4 0 6.726 0 13.296z"
            fill="url(#a_svg__e)"
            transform="translate(260 160)"
          />
          <path
            d="M36.345 25.192C16.3 25.192 0 19.546 0 12.596S16.3 0 36.345 0C56.39 0 72.689 5.646 72.689 12.596s-16.3 12.596-36.344 12.596zm0-24.292C17.026.9 1.298 6.15 1.298 12.596s15.728 11.696 35.047 11.696c19.318 0 35.046-5.25 35.046-11.696S55.663.9 36.345.9z"
            fill="url(#a_svg__f)"
            transform="translate(260 160)"
          />
          <path
            d="M26.715 10.364l-2.977 1.285c-.655.284-.193.772.731.772h8.869c.564 0 1.026-.203 1.026-.455V8.12c0-.399-1.104-.602-1.758-.317l-2.978 1.284L23.79 6.56a4.182 4.182 0 00-2.913 0c-.373.123-.607.368-.607.634s.234.51.607.634l5.84 2.536zm23.688 8.4l-5.814-2.537 2.965-1.292c.654-.285.192-.764-.732-.764h-8.855c-.578 0-1.04.195-1.04.447v3.853c0 .398 1.117.593 1.771.317l2.965-1.292 5.84 2.536a4.221 4.221 0 002.926 0c.37-.126.598-.373.593-.64-.005-.266-.244-.508-.62-.628zm-9.956-6.61l5.84-2.538 2.977 1.293c.654.285 1.758.081 1.758-.317V6.745c0-.252-.462-.447-1.027-.447h-8.868c-.911 0-1.373.48-.732.764l2.978 1.285-5.84 2.538c-.372.123-.606.367-.606.634 0 .266.234.51.606.634.89.357 2.025.357 2.914 0zm-9.612 2.278l-5.834 2.537-2.975-1.293c-.641-.285-1.757-.081-1.757.317v3.853c0 .244.462.448 1.026.448h8.86c.924 0 1.385-.488.731-.765l-2.962-1.292L33.76 15.7c.372-.123.605-.367.605-.634 0-.266-.233-.51-.605-.634a4.214 4.214 0 00-2.924 0z"
            fill="url(#a_svg__g)"
            transform="translate(260 160)"
          />
          <path
            fill="url(#a_svg__h)"
            d="M15.4 10.267l8.4-3.191v24.55l-8.4 2.337z"
            transform="translate(281.3 134)"
          />
          <path
            d="M299.499 147.444l4.9-1.416M299.499 148.859l4.9-1.415M299.499 150.274l4.9-1.415M299.499 153.104l4.9-1.415M299.499 154.52c1.633-.473 3.267-.944 4.9-1.416M299.499 155.934l4.9-1.415"
            stroke="#5BF7FF"
            strokeWidth={0.9}
            strokeLinecap="round"
          />
          <path
            fill="url(#a_svg__i)"
            d="M15.504 5.66L24.5 8.044l-8.995 3.277L6.3 8.41z"
            transform="translate(281.3 134)"
          />
          <path
            fill="url(#a_svg__j)"
            transform="matrix(1 0 0 -1 281.3 175.746)"
            d="M7 11.283l8.4-3.5v23.331L7 33.963z"
          />
          <path
            fill="url(#a_svg__k)"
            opacity={0.694}
            d="M13.36 6.784L27.3 2.83v30.743l-14 3.927z"
            transform="translate(281.3 134)"
          />
          <path
            fill="url(#a_svg__l)"
            opacity={0.694}
            d="M13.708 0l13.591 2.398-13.591 3.97L0 3.483z"
            transform="translate(281.3 134)"
          />
          <path
            fill="url(#a_svg__m)"
            opacity={0.694}
            transform="matrix(1 0 0 -1 281.3 174.33)"
            d="M0 8.34l13.94-5.51L14 34.42 0 37.5z"
          />
          <g>
            <path
              fill="url(#a_svg__n)"
              d="M11.2 8.012l7-2.352v18.09l-7 1.722z"
              transform="translate(268 143.906)"
            />
            <path
              d="M281.3 153.812l3.5-.708M281.3 154.52c1.166-.237 2.333-.473 3.5-.708M281.3 155.934l3.5-.707M281.3 157.35c1.166-.237 2.333-.472 3.5-.708M281.3 158.764l3.5-.707M281.3 160.18l3.5-.708"
              stroke="#5BF7FF"
              strokeWidth={0.54}
              strokeLinecap="round"
            />
            <path
              fill="url(#a_svg__o)"
              d="M11.626 4.245L18.2 6.033 11.626 8.49 4.9 6.308z"
              transform="translate(268 143.906)"
            />
            <path
              fill="url(#a_svg__p)"
              transform="matrix(1 0 0 -1 268 175.746)"
              d="M4.9 8.922l7-2.554v17.025l-7 2.079z"
            />
            <path
              fill="url(#a_svg__q)"
              opacity={0.694}
              d="M10.545 5.028l10.454-2.905v22.586l-10.5 2.886z"
              transform="translate(268 143.906)"
            />
            <path
              fill="url(#a_svg__r)"
              opacity={0.694}
              d="M10.545 0l10.454 1.865-10.454 3.088L0 2.709z"
              transform="translate(268 143.906)"
            />
            <path
              fill="url(#a_svg__s)"
              opacity={0.694}
              transform="matrix(1 0 0 -1 268 173.623)"
              d="M0 6.17l10.455-4.047.045 23.207L0 27.595z"
            />
          </g>
          <g>
            <path
              fill="url(#a_svg__n)"
              d="M11.2 8.012l7-2.352v18.09l-7 1.722z"
              transform="translate(304.399 143.906)"
            />
            <path
              d="M317.698 153.812l3.5-.708M317.698 154.52l3.5-.708M317.698 155.934l3.5-.707M317.698 157.35l3.5-.708M317.698 158.764l3.5-.707M317.698 160.18l3.5-.708"
              stroke="#5BF7FF"
              strokeWidth={0.54}
              strokeLinecap="round"
            />
            <path
              fill="url(#a_svg__o)"
              d="M11.626 4.245L18.2 6.033 11.626 8.49 4.9 6.308z"
              transform="translate(304.399 143.906)"
            />
            <path
              fill="url(#a_svg__p)"
              transform="matrix(1 0 0 -1 304.399 175.746)"
              d="M4.9 8.922l7-2.554v17.025l-7 2.079z"
            />
            <path
              fill="url(#a_svg__q)"
              opacity={0.694}
              d="M10.545 5.028l10.454-2.905v22.586l-10.5 2.886z"
              transform="translate(304.399 143.906)"
            />
            <path
              fill="url(#a_svg__r)"
              opacity={0.694}
              d="M10.545 0l10.454 1.865-10.454 3.088L0 2.709z"
              transform="translate(304.399 143.906)"
            />
            <path
              fill="url(#a_svg__s)"
              opacity={0.694}
              transform="matrix(1 0 0 -1 304.399 173.623)"
              d="M0 6.17l10.455-4.047.045 23.207L0 27.595z"
            />
          </g>
          <path
            d="M0 2.648L178 0c-33.157 132.667-62.392 199-87.704 199C64.983 199 34.885 133.55 0 2.648z"
            fill="url(#a_svg__t)"
            opacity={0.27}
            transform="translate(205)"
          />
          <path
            fill="url(#a_svg__u)"
            opacity={0.148}
            d="M67 62h52L93.757 194z"
            transform="translate(205)"
          />
          <path
            d="M109.572 55.519l18.372.082.56 126.402c-.052 5.333-2.905 9.372-8.558 12.116-5.653 2.745-8.904 3.266-9.753 1.563l-.621-140.163z"
            fill="url(#a_svg__v)"
            opacity={0.123}
            transform="rotate(22 221.538 653.406)"
          />
          <path
            d="M46.352 52.492l18.362.07.474 126.474c-.056 5.336-2.91 9.379-8.562 12.129-5.651 2.75-8.9 3.274-9.749 1.57l-.525-140.243z"
            fill="url(#a_svg__w)"
            opacity={0.128}
            transform="scale(-1 1) rotate(18 -102.5 -876.175)"
          />
          <path
            d="M52.847 57.292l18.365.073.496 126.457c-.055 5.335-2.909 9.377-8.56 12.126-5.652 2.749-8.902 3.272-9.75 1.569l-.55-140.225z"
            fill="url(#a_svg__x)"
            opacity={0.075}
            transform="scale(-1 1) rotate(19 -102.5 -856.78)"
          />
        </g>
        <g fill={center2.sequential >= 0 ? '#FA2832' : '#16BC50'}>
          {center2.sequential ? (
            center2.sequential >= 0 ? (
              <g fill="#FA2832" fillRule="nonzero" stroke="#FA2832" strokeWidth={0.2}>
                <path d="M327.702 128.86l3.593-3.999-.598.003 3.588 3.932a.404.404 0 00.568.029.396.396 0 00.028-.563l-3.588-3.933-.3-.329-.298.331-3.593 4a.396.396 0 00.033.562c.165.146.42.132.567-.033h0z" />
                <path d="M330.62 126.203l-.007 12.597a.4.4 0 00.402.398.4.4 0 00.402-.398l.008-12.596a.4.4 0 00-.402-.4.4.4 0 00-.402.4h0z" />
              </g>
            ) : (
              <g fill="#16BC50" fillRule="nonzero" stroke="#16BC50" strokeWidth={0.2}>
                <path d="M327.702 132.86l3.593 3.999-.598-.003 3.588-3.932a.404.404 0 01.568-.029c.165.148.177.4.028.563l-3.588 3.933-.3.329-.298-.331-3.593-4a.396.396 0 01.033-.562.404.404 0 01.567.033h0z" />
                <path d="M330.62 137.203l-.007-12.597a.4.4 0 01.402-.398.4.4 0 01.402.398l.008 12.596a.4.4 0 01-.402.4.4.4 0 01-.402-.4h0z" />
              </g>
            )
          ) : null}

          <text
            fontFamily="PingFangSC-Regular, PingFang SC"
            fontSize={22}
            transform="translate(255 116)"
          >
            <tspan x={-7} y={23}>
              {center2.sequential ? center2.sequential + '%' : '暂无'}
            </tspan>
          </text>
        </g>
        <text fontFamily="PingFangSC-Regular, PingFang SC" fontSize={18} fill="#2BF9FF">
          <tspan x={222} y={24}>
            {'实际外商直接投资'}
          </tspan>
        </text>
        <text fontFamily="PingFangSC-Semibold, PingFang SC" fontSize={24} fontWeight={500}>
          <tspan x={position(center2.currentValue, 255)} y={82} fill="#F68717">
            {center2.currentValue}
          </tspan>
          <tspan
            x={270.312}
            y={105.848}
            fontFamily="PingFangSC-Regular, PingFang SC"
            fontSize={16}
            fontWeight="normal"
            fill="#09D7FF"
          >
            {'\u4E07\u4EBF\u5143'}
          </tspan>
        </text>
        <g>
          <path
            d="M0 99h178c-33.157 66.667-62.392 100-87.704 100C64.983 199 34.885 165.667 0 99z"
            fill="url(#a_svg__a)"
            opacity={0.27}
            transform="translate(410)"
          />
          <g transform="translate(465 160)">
            <mask id="a_svg__B" fill="#fff">
              <use xlinkHref="#a_svg__A" />
            </mask>
            <path
              d="M36.345.87C17.009.87 1.298 5.93 1.298 12.166v10.488c0 6.237 15.71 11.295 35.047 11.295 19.336 0 35.046-5.058 35.046-11.295V12.166C71.391 5.929 55.681.87 36.345.87z"
              fill="url(#a_svg__c)"
              mask="url(#a_svg__B)"
            />
          </g>
          <path
            d="M0 13.296c0 6.57 15.803 11.896 35.296 11.896 19.494 0 35.297-5.326 35.297-11.896C70.593 6.726 54.79 1.4 35.296 1.4 15.803 1.4 0 6.726 0 13.296z"
            fill="url(#a_svg__e)"
            transform="translate(465 160)"
          />
          <path
            d="M36.345 25.192C16.3 25.192 0 19.546 0 12.596S16.3 0 36.345 0C56.39 0 72.689 5.646 72.689 12.596s-16.3 12.596-36.344 12.596zm0-24.292C17.026.9 1.298 6.15 1.298 12.596s15.728 11.696 35.047 11.696c19.318 0 35.046-5.25 35.046-11.696S55.663.9 36.345.9z"
            fill="url(#a_svg__f)"
            transform="translate(465 160)"
          />
          <path
            d="M26.715 10.364l-2.977 1.285c-.655.284-.193.772.731.772h8.869c.564 0 1.026-.203 1.026-.455V8.12c0-.399-1.104-.602-1.758-.317l-2.978 1.284L23.79 6.56a4.182 4.182 0 00-2.913 0c-.373.123-.607.368-.607.634s.234.51.607.634l5.84 2.536zm23.688 8.4l-5.814-2.537 2.965-1.292c.654-.285.192-.764-.732-.764h-8.855c-.578 0-1.04.195-1.04.447v3.853c0 .398 1.117.593 1.771.317l2.965-1.292 5.84 2.536a4.221 4.221 0 002.926 0c.37-.126.598-.373.593-.64-.005-.266-.244-.508-.62-.628zm-9.956-6.61l5.84-2.538 2.977 1.293c.654.285 1.758.081 1.758-.317V6.745c0-.252-.462-.447-1.027-.447h-8.868c-.911 0-1.373.48-.732.764l2.978 1.285-5.84 2.538c-.372.123-.606.367-.606.634 0 .266.234.51.606.634.89.357 2.025.357 2.914 0zm-9.612 2.278l-5.834 2.537-2.975-1.293c-.641-.285-1.757-.081-1.757.317v3.853c0 .244.462.448 1.026.448h8.86c.924 0 1.385-.488.731-.765l-2.962-1.292L33.76 15.7c.372-.123.605-.367.605-.634 0-.266-.233-.51-.605-.634a4.214 4.214 0 00-2.924 0z"
            fill="url(#a_svg__g)"
            transform="translate(465 160)"
          />
          <path
            fill="url(#a_svg__h)"
            d="M15.4 10.267l8.4-3.191v24.55l-8.4 2.337z"
            transform="translate(486.3 134)"
          />
          <path
            d="M504.499 147.444l4.9-1.416M504.499 148.859l4.9-1.415M504.499 150.274l4.9-1.415M504.499 153.104l4.9-1.415M504.499 154.52c1.633-.473 3.267-.944 4.9-1.416M504.499 155.934l4.9-1.415"
            stroke="#5BF7FF"
            strokeWidth={0.9}
            strokeLinecap="round"
          />
          <path
            fill="url(#a_svg__i)"
            d="M15.504 5.66L24.5 8.044l-8.995 3.277L6.3 8.41z"
            transform="translate(486.3 134)"
          />
          <path
            fill="url(#a_svg__j)"
            transform="matrix(1 0 0 -1 486.3 175.746)"
            d="M7 11.283l8.4-3.5v23.331L7 33.963z"
          />
          <path
            fill="url(#a_svg__k)"
            opacity={0.694}
            d="M13.36 6.784L27.3 2.83v30.743l-14 3.927z"
            transform="translate(486.3 134)"
          />
          <path
            fill="url(#a_svg__l)"
            opacity={0.694}
            d="M13.708 0l13.591 2.398-13.591 3.97L0 3.483z"
            transform="translate(486.3 134)"
          />
          <path
            fill="url(#a_svg__m)"
            opacity={0.694}
            transform="matrix(1 0 0 -1 486.3 174.33)"
            d="M0 8.34l13.94-5.51L14 34.42 0 37.5z"
          />
          <g>
            <path
              fill="url(#a_svg__n)"
              d="M11.2 8.012l7-2.352v18.09l-7 1.722z"
              transform="translate(473 143.906)"
            />
            <path
              d="M486.3 153.812l3.5-.708M486.3 154.52c1.166-.237 2.333-.473 3.5-.708M486.3 155.934l3.5-.707M486.3 157.35c1.166-.237 2.333-.472 3.5-.708M486.3 158.764l3.5-.707M486.3 160.18l3.5-.708"
              stroke="#5BF7FF"
              strokeWidth={0.54}
              strokeLinecap="round"
            />
            <path
              fill="url(#a_svg__o)"
              d="M11.626 4.245L18.2 6.033 11.626 8.49 4.9 6.308z"
              transform="translate(473 143.906)"
            />
            <path
              fill="url(#a_svg__p)"
              transform="matrix(1 0 0 -1 473 175.746)"
              d="M4.9 8.922l7-2.554v17.025l-7 2.079z"
            />
            <path
              fill="url(#a_svg__q)"
              opacity={0.694}
              d="M10.545 5.028l10.454-2.905v22.586l-10.5 2.886z"
              transform="translate(473 143.906)"
            />
            <path
              fill="url(#a_svg__r)"
              opacity={0.694}
              d="M10.545 0l10.454 1.865-10.454 3.088L0 2.709z"
              transform="translate(473 143.906)"
            />
            <path
              fill="url(#a_svg__s)"
              opacity={0.694}
              transform="matrix(1 0 0 -1 473 173.623)"
              d="M0 6.17l10.455-4.047.045 23.207L0 27.595z"
            />
          </g>
          <g>
            <path
              fill="url(#a_svg__n)"
              d="M11.2 8.012l7-2.352v18.09l-7 1.722z"
              transform="translate(509.399 143.906)"
            />
            <path
              d="M522.698 153.812l3.5-.708M522.698 154.52l3.5-.708M522.698 155.934l3.5-.707M522.698 157.35l3.5-.708M522.698 158.764l3.5-.707M522.698 160.18l3.5-.708"
              stroke="#5BF7FF"
              strokeWidth={0.54}
              strokeLinecap="round"
            />
            <path
              fill="url(#a_svg__o)"
              d="M11.626 4.245L18.2 6.033 11.626 8.49 4.9 6.308z"
              transform="translate(509.399 143.906)"
            />
            <path
              fill="url(#a_svg__p)"
              transform="matrix(1 0 0 -1 509.399 175.746)"
              d="M4.9 8.922l7-2.554v17.025l-7 2.079z"
            />
            <path
              fill="url(#a_svg__q)"
              opacity={0.694}
              d="M10.545 5.028l10.454-2.905v22.586l-10.5 2.886z"
              transform="translate(509.399 143.906)"
            />
            <path
              fill="url(#a_svg__r)"
              opacity={0.694}
              d="M10.545 0l10.454 1.865-10.454 3.088L0 2.709z"
              transform="translate(509.399 143.906)"
            />
            <path
              fill="url(#a_svg__s)"
              opacity={0.694}
              transform="matrix(1 0 0 -1 509.399 173.623)"
              d="M0 6.17l10.455-4.047.045 23.207L0 27.595z"
            />
          </g>
          <path
            d="M0 2.648L178 0c-33.157 132.667-62.392 199-87.704 199C64.983 199 34.885 133.55 0 2.648z"
            fill="url(#a_svg__t)"
            opacity={0.27}
            transform="translate(410)"
          />
          <path
            fill="url(#a_svg__u)"
            opacity={0.148}
            d="M67 62h52L93.757 194z"
            transform="translate(410)"
          />
          <path
            d="M109.572 55.519l18.372.082.56 126.402c-.052 5.333-2.905 9.372-8.558 12.116-5.653 2.745-8.904 3.266-9.753 1.563l-.621-140.163z"
            fill="url(#a_svg__v)"
            opacity={0.123}
            transform="rotate(22 324.038 1180.723)"
          />
          <path
            d="M46.352 52.492l18.362.07.474 126.474c-.056 5.336-2.91 9.379-8.562 12.129-5.651 2.75-8.9 3.274-9.749 1.57l-.525-140.243z"
            fill="url(#a_svg__w)"
            opacity={0.128}
            transform="scale(-1 1) rotate(18 -205 -1523.334)"
          />
          <path
            d="M52.847 57.292l18.365.073.496 126.457c-.055 5.335-2.909 9.377-8.56 12.126-5.652 2.749-8.902 3.272-9.75 1.569l-.55-140.225z"
            fill="url(#a_svg__x)"
            opacity={0.075}
            transform="scale(-1 1) rotate(19 -205 -1469.295)"
          />
        </g>
        <g fill={center3.sequential >= 0 ? '#FA2832' : '#16BC50'} fill="#FA2832">
          {center2.sequential ? (
            center2.sequential >= 0 ? (
              <g fillRule="nonzero" stroke="#FA2832" strokeWidth={0.2}>
                <path d="M530.702 128.86l3.593-3.999-.598.003 3.588 3.932a.404.404 0 00.568.029.396.396 0 00.028-.563l-3.588-3.933-.3-.329-.298.331-3.593 4a.396.396 0 00.033.562c.165.146.42.132.567-.033h0z" />
                <path d="M533.62 125.203l-.007 12.597a.4.4 0 00.402.398.4.4 0 00.402-.398l.008-12.596a.4.4 0 00-.402-.4.4.4 0 00-.402.4h0z" />
              </g>
            ) : (
              <g fill="#20D250" fillRule="nonzero" stroke="#16BC50" strokeWidth={0.2}>
                <path d="M529.702 133.14l3.593 3.999-.598-.003 3.588-3.932a.404.404 0 01.568-.029c.165.148.177.4.028.563l-3.588 3.933-.3.329-.298-.331-3.593-4a.396.396 0 01.033-.562.404.404 0 01.567.033h0z" />
                <path d="M532.62 136.797l-.007-12.597a.4.4 0 01.402-.398.4.4 0 01.402.398l.008 12.596a.4.4 0 01-.402.4.4.4 0 01-.402-.4h0z" />
              </g>
            )
          ) : null}

          <text
            fontFamily="PingFangSC-Regular, PingFang SC"
            fontSize={22}
            transform="translate(460 116)"
          >
            <tspan x={0} y={23}>
              {center3.sequential ? center3.sequential + '%' : '暂无'}
            </tspan>
          </text>
        </g>
        <text fontFamily="PingFangSC-Regular, PingFang SC" fontSize={18} fill="#2BF9FF">
          <tspan x={427} y={24}>
            {'社会消费零售总额'}
          </tspan>
        </text>
        <text fontFamily="PingFangSC-Semibold, PingFang SC" fontSize={24} fontWeight={500}>
          <tspan x={position(center3.currentValue, 460)} y={82} fill="#F68717">
            {center3.currentValue}
          </tspan>
          <tspan
            x={475.312}
            y={105.848}
            fontFamily="PingFangSC-Regular, PingFang SC"
            fontSize={16}
            fontWeight="normal"
            fill="#09D7FF"
          >
            {'\u4E07\u4EBF\u5143'}
          </tspan>
        </text>
      </g>
    </svg>
  );
}

export default SvgA;
