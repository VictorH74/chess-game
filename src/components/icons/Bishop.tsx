// #393939

const BishopPieceIcon = ({ color = "black" }) => {
  return (
    <svg
      width="90%"
      height="90%"
      viewBox="0 0 38 76"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <g filter="url(#filter0_d_2_51)">
        <path
          d="M11 33C11 31.8954 11.8954 31 13 31H24C25.1046 31 26 31.8954 26 33V33C26 34.1046 25.1046 35 24 35H13C11.8954 35 11 34.1046 11 33V33Z"
          fill={color === "black" ? "#515151" : "white"}
        />
      </g>
      <g filter="url(#filter1_d_2_51)">
        <path
          d="M5 62H33V68H5V62Z"
          fill={color === "black" ? "#515151" : "white"}
        />
      </g>
      <g filter="url(#filter2_d_2_51)">
        <rect
          x="4"
          y="57"
          width="30"
          height="6"
          rx="2"
          fill={color === "black" ? "#515151" : "white"}
        />
      </g>
      <path
        d="M12.3535 25.5033C10.8671 22.4889 10.8421 18.9601 12.2856 15.925L12.5 15.4742L15 10.9381L19 3L23.1153 10.7781C23.3388 11.2006 23.2322 11.7221 22.8609 12.0229L20.6387 13.8228C20.2716 14.1202 20.1771 14.6415 20.4166 15.0488V15.0488C20.7197 15.5644 21.4168 15.6777 21.8675 15.2845L23.3154 14.0214C23.796 13.6022 24.5408 13.7338 24.8486 14.2923L24.875 14.3402L25.5 15.4742L25.7613 16.0237C27.1594 18.9632 26.9913 22.4077 25.3137 25.1971L24.5925 26.3963C24.2041 27.0421 23.6556 27.5767 23 27.9485V27.9485L23.6818 31.4476V31.4476C23.2359 34.8486 23.7346 38.3068 25.1234 41.4433L27.1396 45.9967C27.5296 46.8775 28.0363 47.7018 28.6459 48.4476L29.1198 49.0273C29.6431 49.6675 30.0681 50.382 30.3809 51.1473V51.1473C30.7897 52.1475 31 53.2177 31 54.2982V54.424C31 55.0271 30.9392 55.6287 30.8184 56.2196L30.4545 58H7.54545L7.18161 56.2196C7.06084 55.6287 7 55.0271 7 54.424V54.2982C7 53.2177 7.21026 52.1475 7.61907 51.1473V51.1473C7.93189 50.382 8.35693 49.6675 8.88021 49.0273L9.20949 48.6245C9.91288 47.7641 10.4601 46.7871 10.8265 45.7378L12.2462 41.6711C13.4018 38.3612 13.8295 34.8409 13.5 31.3505V31.3505L14 27.9485L13.9669 27.9109C13.3251 27.1831 12.7826 26.3735 12.3535 25.5033V25.5033Z"
        fill={color === "black" ? "#515151" : "white"}
      />
      <circle
        cx="19"
        cy="4"
        r="4"
        fill={color === "black" ? "#515151" : "white"}
      />
      <defs>
        <filter
          id="filter0_d_2_51"
          x="7"
          y="31"
          width="23"
          height="12"
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
          y="62"
          width="36"
          height="14"
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
          y="57"
          width="38"
          height="14"
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
