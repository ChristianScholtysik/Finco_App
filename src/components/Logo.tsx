const Logo = () => {
  return (
    <>
      <svg
        width="87"
        height="102"
        viewBox="0 0 87 102"
        fill="none"
        xmlns="http://www.w3.org/2000/svg">
        <g filter="url(#filter0_d_1_535)">
          <path
            d="M39.7055 52V42.9214C39.7055 36.5956 44.8436 31.4343 51.2 31.4343V40.5128C51.2 46.8387 46.0354 52 39.7055 52Z"
            fill="url(#paint0_linear_1_535)"
          />
          <path
            d="M36.7922 45.9388V32.7841C36.7922 25.7171 31.0715 20 24 20V33.1547C24 40.2217 29.7207 45.9388 36.7922 45.9388Z"
            fill="url(#paint1_linear_1_535)"
          />
          <path
            d="M48.2848 26.4755C48.8399 24.1431 47.3979 21.8026 45.0641 21.2479C42.7302 20.6931 40.3883 22.1342 39.8332 24.4666C39.2781 26.7989 40.72 29.1394 43.0539 29.6942C45.3877 30.2489 47.7297 28.8078 48.2848 26.4755Z"
            fill="url(#paint2_linear_1_535)"
          />
        </g>
        <defs>
          <filter
            id="filter0_d_1_535"
            x="-11"
            y="0"
            width="97.2"
            height="102"
            filterUnits="userSpaceOnUse"
            color-interpolation-filters="sRGB">
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
              values="0 0 0 0 0.12549 0 0 0 0 0.486275 0 0 0 0 0.996078 0 0 0 0.1 0"
            />
            <feBlend
              mode="normal"
              in2="BackgroundImageFix"
              result="effect1_dropShadow_1_535"
            />
            <feBlend
              mode="normal"
              in="SourceGraphic"
              in2="effect1_dropShadow_1_535"
              result="shape"
            />
          </filter>
          <linearGradient
            id="paint0_linear_1_535"
            x1="45.4527"
            y1="31.4343"
            x2="45.4527"
            y2="52"
            gradientUnits="userSpaceOnUse">
            <stop stop-color="#44BBFE" />
            <stop offset="1" stop-color="#1E78FE" />
          </linearGradient>
          <linearGradient
            id="paint1_linear_1_535"
            x1="30.3961"
            y1="20"
            x2="30.3961"
            y2="45.9388"
            gradientUnits="userSpaceOnUse">
            <stop stop-color="#44BBFE" />
            <stop offset="1" stop-color="#1E78FE" />
          </linearGradient>
          <linearGradient
            id="paint2_linear_1_535"
            x1="39.8332"
            y1="24.4666"
            x2="48.2842"
            y2="26.4779"
            gradientUnits="userSpaceOnUse">
            <stop stop-color="#FFCF53" />
            <stop offset="1" stop-color="#FF9900" />
          </linearGradient>
        </defs>
      </svg>
    </>
  );
};

export default Logo;
