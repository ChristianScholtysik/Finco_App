const ButtonIncome = () => {
  return (
    <button className="">
      <svg
        width="118"
        height="118"
        viewBox="0 0 118 118"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <g filter="url(#filter0_d_1_502)">
          <rect
            x="35"
            y="20"
            width="48"
            height="48"
            rx="24"
            fill="url(#paint0_linear_1_502)"
          />
        </g>
        <path
          d="M68.1666 39L60.25 46.9167L56.0833 42.75L49.8333 49"
          stroke="white"
          stroke-width="1.5"
          stroke-linecap="round"
          stroke-linejoin="round"
        />
        <path
          d="M63.1667 39H68.1667V44"
          stroke="white"
          stroke-width="1.5"
          stroke-linecap="round"
          stroke-linejoin="round"
        />
        <defs>
          <filter
            id="filter0_d_1_502"
            x="0"
            y="0"
            width="118"
            height="118"
            filterUnits="userSpaceOnUse"
            color-interpolation-filters="sRGB"
          >
            <feFlood flood-opacity="0" result="BackgroundImageFix" />
            <feColorMatrix
              in="SourceAlpha"
              type="matrix"
              values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0"
              result="hardAlpha"
            />
            <feOffset dy="15" />
            <feGaussianBlur stdDeviation="17.5" />
            <feComposite in2="hardAlpha" operator="out" />
            <feColorMatrix
              type="matrix"
              values="0 0 0 0 0.12549 0 0 0 0 0.486275 0 0 0 0 0.996078 0 0 0 0.2 0"
            />
            <feBlend
              mode="normal"
              in2="BackgroundImageFix"
              result="effect1_dropShadow_1_502"
            />
            <feBlend
              mode="normal"
              in="SourceGraphic"
              in2="effect1_dropShadow_1_502"
              result="shape"
            />
          </filter>
          <linearGradient
            id="paint0_linear_1_502"
            x1="59"
            y1="20"
            x2="59"
            y2="68"
            gradientUnits="userSpaceOnUse"
          >
            <stop stop-color="#44BBFE" />
            <stop offset="1" stop-color="#1E78FE" />
          </linearGradient>
        </defs>
      </svg>
    </button>
  );
};

export default ButtonIncome;
