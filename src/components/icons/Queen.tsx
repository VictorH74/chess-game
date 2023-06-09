const QueenPieceIcon = ({ color = "black" }) => {
  return (
    <svg
      width="100%"
      height="90%"
      viewBox="0 0 36 74"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <g filter="url(#filter0_d_2_54)">
        <path
          d="M4 64.5714C4 62.599 5.59898 61 7.57143 61H28.4286C30.401 61 32 62.599 32 64.5714V64.5714C32 65.3604 31.3604 66 30.5714 66H5.42857C4.63959 66 4 65.3604 4 64.5714V64.5714Z"
          fill={color === "black" ? "#515151" : "white"}
        />
      </g>
      <g filter="url(#filter1_d_2_54)">
        <rect x="8" y="19" width="20" height="5" rx="2.5" fill={color === "black" ? "#515151" : "white"} />
      </g>
      <g filter="url(#filter2_d_2_54)">
        <rect x="6" y="48" width="24" height="2" rx="1" fill={color === "black" ? "#515151" : "white"} />
      </g>
      <path
        d="M6.54545 1.78063C6.54545 0.797215 7.34267 0 8.32609 0V0C8.76551 0 9.19511 0.130071 9.56073 0.37382L10.3359 0.8906C11.3436 1.5624 12.6564 1.5624 13.6641 0.8906L15 0L16.3359 0.8906C17.3436 1.5624 18.6564 1.5624 19.6641 0.8906L21 0L22.3359 0.8906C23.3436 1.5624 24.6564 1.5624 25.6641 0.8906L26.4393 0.37382C26.8049 0.130071 27.2345 0 27.6739 0V0C28.6573 0 29.4545 0.797215 29.4545 1.78063V2L29.2378 2.3973C29.0202 2.79636 28.7381 3.15674 28.403 3.4639V3.4639C28.0148 3.81975 27.6752 4.22522 27.393 4.66983L26.7273 5.71875V5.71875C25.3075 7.20321 24.3814 9.09028 24.0758 11.1215L23.4545 15.25L22.9946 21.6794C22.5772 27.5145 23.187 33.3776 24.7964 39.002L26.1878 43.8647C26.5461 45.117 27.0543 46.3215 27.7013 47.452L27.9963 47.9675C28.6026 49.027 29.0788 50.1557 29.4146 51.3293V51.3293C29.803 52.6865 30 54.0912 30 55.5028V55.9041C30 56.7586 29.9393 57.6121 29.8182 58.458L29.4545 61H6.54545L6.18176 58.458C6.06074 57.6121 6 56.7586 6 55.9041V55.5028C6 54.0912 6.19702 52.6865 6.58536 51.3293V51.3293C6.92116 50.1557 7.39739 49.027 8.00369 47.9675L8.2987 47.452C8.94569 46.3215 9.45386 45.117 9.8122 43.8647L11.2036 39.002C12.813 33.3776 13.4228 27.5145 13.0054 21.6794L12.5455 15.25L11.9242 11.1215C11.6186 9.09028 10.6925 7.20321 9.27273 5.71875V5.71875L8.60697 4.66983C8.32477 4.22522 7.98518 3.81975 7.59699 3.4639V3.4639C7.2619 3.15674 6.97983 2.79636 6.76216 2.3973L6.54545 2V1.78063Z"
        fill={color === "black" ? "#515151" : "white"}
      />
      <defs>
        <filter
          id="filter0_d_2_54"
          x="0"
          y="61"
          width="36"
          height="13"
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
            result="effect1_dropShadow_2_54"
          />
          <feBlend
            mode="normal"
            in="SourceGraphic"
            in2="effect1_dropShadow_2_54"
            result="shape"
          />
        </filter>
        <filter
          id="filter1_d_2_54"
          x="4"
          y="19"
          width="28"
          height="13"
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
            result="effect1_dropShadow_2_54"
          />
          <feBlend
            mode="normal"
            in="SourceGraphic"
            in2="effect1_dropShadow_2_54"
            result="shape"
          />
        </filter>
        <filter
          id="filter2_d_2_54"
          x="2"
          y="48"
          width="32"
          height="10"
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
            result="effect1_dropShadow_2_54"
          />
          <feBlend
            mode="normal"
            in="SourceGraphic"
            in2="effect1_dropShadow_2_54"
            result="shape"
          />
        </filter>
      </defs>
    </svg>
  );
};

export default QueenPieceIcon;
