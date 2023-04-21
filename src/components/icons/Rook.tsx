const RookPieceIcon = ({ color = "black" }) => {
  return (
    <svg
      width="90%"
      height="90%"
      viewBox="0 0 48 76"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        d="M7 1C7 0.447716 7.44772 0 8 0H13.7778C14.3301 0 14.7778 0.447715 14.7778 1V5.83333H18.0185H20.6111V1C20.6111 0.447716 21.0588 0 21.6111 0H24.5H27.3889C27.9412 0 28.3889 0.447715 28.3889 1V5.83333H30.9815H34.2222V1C34.2222 0.447716 34.6699 0 35.2222 0H41C41.5523 0 42 0.447715 42 1V13C42 13.5523 41.5523 14 41 14H8C7.44772 14 7 13.5523 7 13V1Z"
        fill={color === "black" ? "#393939" : "white"}
      />
      <path
        d="M14 27H35V32.5981C35 35.8502 35.4532 39.0864 36.3467 42.2133L38 48H11L12.6533 42.2133C13.5468 39.0864 14 35.8502 14 32.5981V27Z"
        fill={color === "black" ? "#393939" : "white"}
      />
      <g filter="url(#filter0_d_2_56)">
        <rect
          x="4"
          y="61"
          width="40"
          height="7"
          rx="2"
          fill={color === "black" ? "#393939" : "white"}
        />
      </g>
      <rect
        x="7"
        y="51"
        width="35"
        height="7"
        rx="2"
        fill={color === "black" ? "#393939" : "white"}
      />
      <path
        d="M12 17H37V22C37 23.1046 36.1046 24 35 24H14C12.8954 24 12 23.1046 12 22V17Z"
        fill={color === "black" ? "#393939" : "white"}
      />
      <defs>
        <filter
          id="filter0_d_2_56"
          x="0"
          y="61"
          width="48"
          height="15"
          filterUnits="userSpaceOnUse"
          colorInterpolationFilters="sRGB"
        >
          <feFlood floodOpacity="0" result="BackgroundImageFix" />
          <feColorMatrix
            in="SourceAlpha"
            type="matrix"
            values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0"
            result="hardAlpha"
          />
          <feOffset dy="4" />
          <feGaussianBlur stdDeviation="2" />
          <feComposite in2="hardAlpha" operator="out" />
          <feColorMatrix
            type="matrix"
            values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0.25 0"
          />
          <feBlend
            mode="normal"
            in2="BackgroundImageFix"
            result="effect1_dropShadow_2_56"
          />
          <feBlend
            mode="normal"
            in="SourceGraphic"
            in2="effect1_dropShadow_2_56"
            result="shape"
          />
        </filter>
      </defs>
    </svg>
  );
};

export default RookPieceIcon;
