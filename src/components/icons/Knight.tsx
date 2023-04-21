const KnightPieceIcon = ({ color = "black" }) => {
  return (
    <svg
      width="90%"
      height="90%"
      viewBox="0 0 52 76"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <g filter="url(#filter0_d_2_53)">
        <path
          d="M8.02544 57.296C8.31865 56.5163 9.06443 56 9.89744 56H42.1026C42.9356 56 43.6813 56.5163 43.9746 57.296L46.9831 65.296C47.4749 66.6038 46.5083 68 45.1111 68H6.88889C5.49168 68 4.52507 66.6038 5.01689 65.296L8.02544 57.296Z"
          fill={color === "black" ? "#515151" : "white"}
        />
      </g>
      <path
        d="M11.088 15.9585C12.1735 12.7973 14.4745 10.1992 17.4814 8.7396L18.0816 8.44824C18.8692 8.06599 19.7119 7.81004 20.579 7.68979V7.68979C22.1557 7.47113 23.5675 6.59888 24.4686 5.28672L26.0304 3.01247C26.9011 1.74456 28.1909 0.824147 29.673 0.413046V0.413046C30.3739 0.218646 31.0431 0.809332 30.9372 1.52891L30.7961 2.48779C30.6803 3.27438 30.6731 4.07315 30.7746 4.86171V4.86171C31.0256 6.81035 31.9297 8.61638 33.3394 9.98492L46.7827 23.0356C47.9965 24.2139 47.9965 26.1623 46.7827 27.3406L43.4995 30.528C42.2649 31.7265 40.4021 32.0012 38.8741 31.2101L34.6942 29.0459C33.8017 28.5838 32.7907 28.4014 31.793 28.5225L30.244 28.7104C29.4273 28.8095 28.5987 28.7056 27.8318 28.4078L23.5946 26.7624L33.8649 38.8317L40.8679 43.9306C41.9019 44.6834 42.5135 45.8853 42.5135 47.1643V53H9V30.4356L9.90815 20.7378C10.023 19.511 10.2833 18.3022 10.6834 17.1369L11.088 15.9585Z"
        fill={color === "black" ? "#515151" : "white"}
      />
      <defs>
        <filter
          id="filter0_d_2_53"
          x="0.887085"
          y="56"
          width="50.2259"
          height="20"
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
            result="effect1_dropShadow_2_53"
          />
          <feBlend
            mode="normal"
            in="SourceGraphic"
            in2="effect1_dropShadow_2_53"
            result="shape"
          />
        </filter>
      </defs>
    </svg>
  );
};

export default KnightPieceIcon;
