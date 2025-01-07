import Image from "next/image";

function IsLoading() {
  return (
    <div className="flex justify-center items-center">
      <svg
        xmlns="http://www.w3.org/2000/svg"
        viewBox="0 0 100 100"
        preserveAspectRatio="xMidYMid"
        width="200"
        height="200"
      >
        <g>
          <circle
            strokeWidth="2"
            stroke="#00a98f"
            fill="none"
            r="0"
            cy="50"
            cx="50"
          >
            <animate
              begin="0s"
              calcMode="spline"
              keySplines="0 0.2 0.8 1"
              keyTimes="0;1"
              values="0;24"
              dur="1s"
              repeatCount="indefinite"
              attributeName="r"
            ></animate>
            <animate
              begin="0s"
              calcMode="spline"
              keySplines="0.2 0 0.8 1"
              keyTimes="0;1"
              values="1;0"
              dur="1s"
              repeatCount="indefinite"
              attributeName="opacity"
            ></animate>
          </circle>
          <circle
            strokeWidth="2"
            stroke="#00a98f"
            fill="none"
            r="0"
            cy="50"
            cx="50"
          >
            <animate
              begin="-0.5s"
              calcMode="spline"
              keySplines="0 0.2 0.8 1"
              keyTimes="0;1"
              values="0;24"
              dur="1s"
              repeatCount="indefinite"
              attributeName="r"
            ></animate>
            <animate
              begin="-0.5s"
              calcMode="spline"
              keySplines="0.2 0 0.8 1"
              keyTimes="0;1"
              values="1;0"
              dur="1s"
              repeatCount="indefinite"
              attributeName="opacity"
            ></animate>
          </circle>
          <g></g>
        </g>
      </svg>
      {/* <Image
        src="/img/loading-spinner-transparent.svg"
        alt="로딩중"
        width={200}
        height={200}
        priority
      /> */}
    </div>
  );
}

export default IsLoading;
