const PawnPieceIcon = ({ color = "black" }) => {
  return (
    <svg
      width="100%"
      height="90%"
      viewBox="0 0 47 76"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <circle
        cx="23.5"
        cy="11.5"
        r="11.5"
        fill={color === "black" ? "#515151" : "white"}
      />
      <path
        d="M17 27H30L30.2365 30.7837C30.7427 38.883 32.4484 46.8624 35.2978 54.4608L37 59H10L11.7022 54.4608C14.5516 46.8624 16.2573 38.883 16.7635 30.7837L17 27Z"
        fill={color === "black" ? "#515151" : "white"}
      />
      <g filter="url(#filter0_d_2_55)">
        <path
          d="M4 64C4 61.2386 6.23858 59 9 59H38C40.7614 59 43 61.2386 43 64V66C43 67.1046 42.1046 68 41 68H6C4.89543 68 4 67.1046 4 66V64Z"
          fill={color === "black" ? "#515151" : "white"}
        />
      </g>
      <g filter="url(#filter1_d_2_55)">
        <path
          d="M10 23.5C10 21.567 11.567 20 13.5 20H33.5C35.433 20 37 21.567 37 23.5V23.5C37 25.433 35.433 27 33.5 27H13.5C11.567 27 10 25.433 10 23.5V23.5Z"
          fill={color === "black" ? "#515151" : "white"}
        />
      </g>
      <defs>
        <filter
          id="filter0_d_2_55"
          x="0"
          y="59"
          width="47"
          height="17"
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
            result="effect1_dropShadow_2_55"
          />
          <feBlend
            mode="normal"
            in="SourceGraphic"
            in2="effect1_dropShadow_2_55"
            result="shape"
          />
        </filter>
        <filter
          id="filter1_d_2_55"
          x="6"
          y="20"
          width="35"
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
            result="effect1_dropShadow_2_55"
          />
          <feBlend
            mode="normal"
            in="SourceGraphic"
            in2="effect1_dropShadow_2_55"
            result="shape"
          />
        </filter>
      </defs>
    </svg>
  );
};

export default PawnPieceIcon;
