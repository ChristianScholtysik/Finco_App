const ButtonExpense = () => {
  return (
    <button className="">
      <svg
        width="108"
        height="108"
        viewBox="0 0 108 108"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <g filter="url(#filter0_d_1_511)">
          <rect
            x="30"
            y="20"
            width="48"
            height="48"
            rx="24"
            fill="url(#paint0_linear_1_511)"
          />
        </g>
        <path
          d="M63.1666 49L55.25 41.0833L51.0833 45.25L44.8333 39"
          stroke="white"
          stroke-width="1.5"
          stroke-linecap="round"
          stroke-linejoin="round"
        />
        <path
          d="M58.1667 49H63.1667V44"
          stroke="white"
          stroke-width="1.5"
          stroke-linecap="round"
          stroke-linejoin="round"
        />
        <defs>
          <filter
            id="filter0_d_1_511"
            x="0"
            y="0"
            width="108"
            height="108"
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
            <feOffset dy="10" />
            <feGaussianBlur stdDeviation="15" />
            <feComposite in2="hardAlpha" operator="out" />
            <feColorMatrix
              type="matrix"
              values="0 0 0 0 1 0 0 0 0 0.6 0 0 0 0 0 0 0 0 0.2 0"
            />
            <feBlend
              mode="normal"
              in2="BackgroundImageFix"
              result="effect1_dropShadow_1_511"
            />
            <feBlend
              mode="normal"
              in="SourceGraphic"
              in2="effect1_dropShadow_1_511"
              result="shape"
            />
          </filter>
          <linearGradient
            id="paint0_linear_1_511"
            x1="54"
            y1="20"
            x2="54"
            y2="68"
            gradientUnits="userSpaceOnUse"
          >
            <stop stop-color="#FFCF53" />
            <stop offset="1" stop-color="#FF9900" />
          </linearGradient>
        </defs>
      </svg>
    </button>
  );
};

export default ButtonExpense;
