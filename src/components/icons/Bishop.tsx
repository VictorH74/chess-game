// #393939

const BishopPieceIcon = ({ color = "black" }) => {
  return (
    <svg
      width="38"
      height="76"
      viewBox="0 0 38 76"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <g filter="url(#filter0_d_2_51)">
        <path
          d="M11 31.2923C11 30.1877 11.8954 29.2923 13 29.2923H24C25.1046 29.2923 26 30.1877 26 31.2923V31.4769C26 32.5815 25.1046 33.4769 24 33.4769H13C11.8954 33.4769 11 32.5815 11 31.4769V31.2923Z"
          fill={color === "black" ? "#515151" : "white"}
        />
      </g>
      <g filter="url(#filter1_d_2_51)">
        <path
          d="M5 61.7231H33V68H5V61.7231Z"
          fill={color === "black" ? "#515151" : "white"}
        />
      </g>
      <g filter="url(#filter2_d_2_51)">
        <rect
          x="4"
          y="56.4923"
          width="30"
          height="6.27692"
          rx="2"
          fill={color === "black" ? "#515151" : "white"}
        />
      </g>
      <path
        d="M12.3396 23.5125C10.8555 20.3639 10.8305 16.7222 12.271 13.5536L12.5 13.05L15 8.30452L17.2419 3.65011C17.9611 2.15681 20.0804 2.13629 20.8285 3.61538L23.1439 8.19358C23.3527 8.60647 23.251 9.10869 22.898 9.40781L20.6168 11.3409C20.2587 11.6444 20.1661 12.1592 20.3961 12.5684C20.7049 13.118 21.4449 13.2371 21.9106 12.8121L23.2943 11.5494C23.7778 11.1081 24.5479 11.2428 24.8531 11.822L24.875 11.8636L25.5 13.05L25.8027 13.7157C27.182 16.7497 27.0149 20.2624 25.3539 23.1517L24.5795 24.4987C24.1996 25.1595 23.6556 25.7111 23 26.0999L23.6818 29.7605C23.2352 33.3241 23.7372 36.9424 25.137 40.2498L27.1454 44.9947C27.5316 45.9073 28.0363 46.7651 28.6465 47.546L29.1019 48.1287C29.6372 48.8138 30.0698 49.5732 30.3862 50.383C30.7918 51.4212 31 52.5261 31 53.6407V53.7988C31 54.429 30.9392 55.0576 30.8184 55.6761L30.4545 57.5385H7.54545L7.18164 55.6761C7.06083 55.0576 7 54.429 7 53.7988V53.6407C7 52.5261 7.20817 51.4212 7.61381 50.383C7.93019 49.5732 8.36284 48.8138 8.89814 48.1287L9.21057 47.7289C9.9135 46.8293 10.4574 45.8161 10.8188 44.7332L12.2386 40.4787C13.4003 36.9977 13.8298 33.314 13.5 29.659L14 26.0999C13.3373 25.3137 12.778 24.4426 12.3396 23.5125Z"
        fill={color === "black" ? "#515151" : "white"}
      />
      <defs>
        <filter
          id="filter0_d_2_51"
          x="7"
          y="29.2923"
          width="23"
          height="12.1846"
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
            result="effect1_dropShadow_2_51"
          />
          <feBlend
            mode="normal"
            in="SourceGraphic"
            in2="effect1_dropShadow_2_51"
            result="shape"
          />
        </filter>
        <filter
          id="filter1_d_2_51"
          x="1"
          y="61.7231"
          width="36"
          height="14.2769"
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
            result="effect1_dropShadow_2_51"
          />
          <feBlend
            mode="normal"
            in="SourceGraphic"
            in2="effect1_dropShadow_2_51"
            result="shape"
          />
        </filter>
        <filter
          id="filter2_d_2_51"
          x="0"
          y="56.4923"
          width="38"
          height="14.2769"
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
            result="effect1_dropShadow_2_51"
          />
          <feBlend
            mode="normal"
            in="SourceGraphic"
            in2="effect1_dropShadow_2_51"
            result="shape"
          />
        </filter>
      </defs>
    </svg>
  );
};

export default BishopPieceIcon;
