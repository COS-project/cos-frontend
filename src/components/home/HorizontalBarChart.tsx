import React, { SVGProps, useState } from 'react';

interface Props {
  goalRunningGraphType: 'time' | 'exam';
  score: number;
  total: number;
  unit: string;
}

const HorizontalBarChart = (props: Props) => {
  const { goalRunningGraphType, score, total, unit } = props;
  // Percentage calculation
  const percentage = Math.round((score / total) * 100);
  const widthPercentage = Math.max(0, percentage - 4);
  let iconComponent;

  const [isHovered, setIsHovered] = useState(false);

  const handleMouseEnter = () => {
    setIsHovered(true);
  };

  const handleMouseLeave = () => {
    setIsHovered(false);
  };

  if (percentage === 0) {
    iconComponent = goalRunningGraphType === 'time' ? <PendingStopWatchIcon /> : <PendingBookIcon />;
  } else if (percentage < 100) {
    iconComponent = goalRunningGraphType === 'time' ? <InProgressStopWatchIcon /> : <InProgressBookIcon />;
  } else {
    iconComponent = <AttainmentIcon />;
  }

  return (
    <div className="w-[100%]">
      <div className="flex">
        <div className="bg-white h-1" style={{ width: `${widthPercentage}%` }}></div>
        <div className="relative" onMouseEnter={handleMouseEnter} onMouseLeave={handleMouseLeave}>
          {iconComponent}
          {isHovered && (
            <div
              className={
                'absolute bottom-full left-1/2 transform -translate-x-1/2 text-white px-[20%] bg-black rounded-lg mb-[10%]'
              }
              style={{ zIndex: 1, marginTop: '10px' }}>
              <div className="flex text-h6">
                <div>{percentage}</div>
                <div>{unit}</div>
              </div>
            </div>
          )}
        </div>
      </div>
      <div className="h-[50%]  relative mt-4">
        {/* Gray background */}
        <div className="bg-gray1 h-2 rounded-full"></div>

        {/* Blue bar */}
        <div
          className="absolute top-0 left-0 bg-second h-2 rounded-l-full rounded-r-full"
          style={{ width: percentage > 100 ? '100%' : `${percentage}%` }}></div>

        {/* Score and Total labels */}
        <div className="flex justify-end mt-2">
          <span className="text-gray4 text-h6">
            {total}
            {unit}
          </span>
        </div>
      </div>
    </div>
  );
};
export default HorizontalBarChart;

const InProgressStopWatchIcon = (props: SVGProps<SVGSVGElement>) => (
  <svg xmlns="http://www.w3.org/2000/svg" width={39} height={28} fill="none" {...props}>
    <rect width={10} height={2} x={2.5} y={10} fill="#3B3DFF" rx={1} />
    <rect width={11} height={2} x={0.5} y={14} fill="#3B3DFF" rx={1} />
    <rect width={7} height={2} x={4.5} y={18} fill="#3B3DFF" rx={1} />
    <path
      fill="#3B3DFF"
      d="M23.833 2.667a1.3 1.3 0 0 1-.95-.384 1.3 1.3 0 0 1-.383-.95q0-.566.383-.95a1.3 1.3 0 0 1 .95-.383h5.334q.566 0 .95.383.383.384.383.95 0 .567-.383.95a1.3 1.3 0 0 1-.95.384zM26.5 17.333q.566 0 .95-.383a1.3 1.3 0 0 0 .383-.95v-5.333a1.3 1.3 0 0 0-.383-.95 1.3 1.3 0 0 0-.95-.384 1.3 1.3 0 0 0-.95.384 1.3 1.3 0 0 0-.383.95V16q0 .566.383.95.384.383.95.383M26.5 28q-2.466 0-4.65-.95a12.3 12.3 0 0 1-3.817-2.583 12.3 12.3 0 0 1-2.583-3.817A11.5 11.5 0 0 1 14.5 16q0-2.466.95-4.65a12.3 12.3 0 0 1 2.583-3.817A12.3 12.3 0 0 1 21.85 4.95 11.5 11.5 0 0 1 26.5 4q2.067 0 3.967.667A13 13 0 0 1 34.033 6.6l.934-.933q.366-.367.933-.367t.933.367.367.933-.367.933l-.933.934a13 13 0 0 1 1.933 3.566Q38.5 13.934 38.5 16q0 2.466-.95 4.65a12.3 12.3 0 0 1-2.583 3.817 12.3 12.3 0 0 1-3.817 2.583q-2.184.95-4.65.95"
    />
  </svg>
);
const AttainmentIcon = (props: SVGProps<SVGSVGElement>) => (
  <svg xmlns="http://www.w3.org/2000/svg" width={40} height={40} fill="none" {...props}>
    <mask
      id="a"
      width={48}
      height={48}
      x={-4}
      y={-4}
      maskUnits="userSpaceOnUse"
      style={{
        maskType: 'alpha',
      }}>
      <path fill="#D9D9D9" d="M-4-4h48v48H-4z" />
    </mask>
    <g mask="url(#a)">
      <path
        fill="#3B3DFF"
        d="M15 7.333h3.333V4H15zm6.667 0V4H25v3.333zM15 20.666v-3.333h3.333v3.333zM28.333 14v-3.334h3.334V14zm0 6.666v-3.333h3.334v3.333zm-6.666 0v-3.333H25v3.333zm6.666-13.333V4h3.334v3.333zm-10 3.333V7.333h3.334v3.333zM9.994 36q-.71 0-1.186-.48a1.62 1.62 0 0 1-.475-1.187V5.666q0-.708.481-1.187.48-.48 1.192-.48.71 0 1.189.48.478.48.478 1.187v1.667H15v3.333h-3.333V14H15v3.333h-3.333v17q0 .708-.481 1.188-.48.479-1.192.479M25 17.333V14h3.333v3.333zm-6.667 0V14h3.334v3.333zM15 14v-3.334h3.333V14zm6.667 0v-3.334H25V14zM25 10.666V7.333h3.333v3.333z"
      />
    </g>
  </svg>
);
const PendingStopWatchIcon = (props: SVGProps<SVGSVGElement>) => (
  <svg xmlns="http://www.w3.org/2000/svg" width={39} height={28} fill="none" {...props}>
    <rect width={10} height={2} x={2.5} y={10} fill="#9E9FA1" rx={1} />
    <rect width={11} height={2} x={0.5} y={14} fill="#9E9FA1" rx={1} />
    <rect width={7} height={2} x={4.5} y={18} fill="#9E9FA1" rx={1} />
    <path
      fill="#9E9FA1"
      d="M23.833 2.667a1.3 1.3 0 0 1-.95-.384 1.3 1.3 0 0 1-.383-.95q0-.566.383-.95a1.3 1.3 0 0 1 .95-.383h5.334q.566 0 .95.383.383.384.383.95 0 .567-.383.95a1.3 1.3 0 0 1-.95.384zM26.5 17.333q.566 0 .95-.383a1.3 1.3 0 0 0 .383-.95v-5.333a1.3 1.3 0 0 0-.383-.95 1.3 1.3 0 0 0-.95-.384 1.3 1.3 0 0 0-.95.384 1.3 1.3 0 0 0-.383.95V16q0 .566.383.95.384.383.95.383M26.5 28q-2.466 0-4.65-.95a12.3 12.3 0 0 1-3.817-2.583 12.3 12.3 0 0 1-2.583-3.817A11.5 11.5 0 0 1 14.5 16q0-2.466.95-4.65a12.3 12.3 0 0 1 2.583-3.817A12.3 12.3 0 0 1 21.85 4.95 11.5 11.5 0 0 1 26.5 4q2.067 0 3.967.667A13 13 0 0 1 34.033 6.6l.934-.933q.366-.367.933-.367t.933.367.367.933-.367.933l-.933.934a13 13 0 0 1 1.933 3.566Q38.5 13.934 38.5 16q0 2.466-.95 4.65a12.3 12.3 0 0 1-2.583 3.817 12.3 12.3 0 0 1-3.817 2.583q-2.184.95-4.65.95"
    />
  </svg>
);
const PendingBookIcon = (props: SVGProps<SVGSVGElement>) => (
  <svg xmlns="http://www.w3.org/2000/svg" width={46} height={22} fill="none" {...props}>
    <path
      fill="#9E9FA1"
      d="M30.68 19.867a16.2 16.2 0 0 1 3.857-1.557 16.4 16.4 0 0 1 4.047-.493q1.41 0 2.578.17 1.166.172 1.932.424.354.147.648-.045t.295-.604V3.545a.8.8 0 0 0-.147-.471q-.147-.207-.501-.354a13.4 13.4 0 0 0-2.333-.647q-1.06-.18-2.472-.181-2.109 0-4.164.639a12.3 12.3 0 0 0-3.74 1.9zm-.648 1.539q-.285 0-.523-.069a2 2 0 0 1-.437-.178 16.2 16.2 0 0 0-3.697-1.512 15 15 0 0 0-3.959-.527 13.6 13.6 0 0 0-4.376.72q-.866.352-1.62-.212-.756-.566-.755-1.544V3.492q0-.612.318-1.133.318-.52.895-.744A13.4 13.4 0 0 1 18.591.84a16.4 16.4 0 0 1 2.825-.246q2.322 0 4.508.67a15.2 15.2 0 0 1 4.108 1.979 14.8 14.8 0 0 1 4.076-1.978 15.1 15.1 0 0 1 4.476-.67q1.423 0 2.813.245 1.389.245 2.72.775.576.224.897.744t.321 1.133v14.592q0 .99-.83 1.529-.828.538-1.728.168a13 13 0 0 0-2.075-.5 14 14 0 0 0-2.118-.16q-2.014 0-3.937.526a16.2 16.2 0 0 0-3.676 1.512 2 2 0 0 1-.437.178 1.8 1.8 0 0 1-.502.069M32.89 6.714a.5.5 0 0 1 .082-.26.5.5 0 0 1 .224-.19q1.177-.555 2.505-.842t2.733-.286q.77 0 1.437.081.668.081 1.392.24a.64.64 0 0 1 .288.182q.127.135.127.333 0 .312-.19.455t-.5.073a11 11 0 0 0-1.236-.185q-.631-.058-1.318-.058-1.27 0-2.48.238-1.212.24-2.288.701-.333.14-.554.004-.222-.135-.222-.486m0 8.316q0-.13.082-.278a.46.46 0 0 1 .224-.207 9.8 9.8 0 0 1 2.505-.825 14.4 14.4 0 0 1 2.733-.268q.77 0 1.437.081.668.082 1.392.24a.64.64 0 0 1 .288.183q.127.134.127.333 0 .311-.19.454t-.5.074a11 11 0 0 0-1.236-.186q-.631-.058-1.318-.058-1.241 0-2.437.259t-2.272.73q-.352.17-.594.01-.24-.16-.24-.542m0-4.129a.5.5 0 0 1 .082-.26.5.5 0 0 1 .224-.189q1.177-.556 2.505-.842t2.733-.286q.77 0 1.437.08.668.082 1.392.241a.64.64 0 0 1 .288.182q.127.134.127.333 0 .313-.19.454-.19.143-.5.074a11 11 0 0 0-1.236-.185q-.631-.06-1.318-.059-1.27 0-2.48.239-1.212.24-2.288.7-.333.14-.554.005t-.222-.487"
    />
    <rect width={10} height={2} x={2.665} y={5.594} fill="#9E9FA1" rx={1} />
    <rect width={11} height={2} x={0.665} y={9.594} fill="#9E9FA1" rx={1} />
    <rect width={7} height={2} x={4.665} y={13.594} fill="#9E9FA1" rx={1} />
  </svg>
);
const InProgressBookIcon = (props: SVGProps<SVGSVGElement>) => (
  <svg xmlns="http://www.w3.org/2000/svg" width={46} height={22} fill="none" {...props}>
    <path
      fill="#3B3DFF"
      d="M30.68 19.867a16.2 16.2 0 0 1 3.857-1.557 16.4 16.4 0 0 1 4.047-.493q1.41 0 2.578.17 1.166.172 1.932.424.354.147.648-.045t.295-.604V3.545a.8.8 0 0 0-.147-.471q-.147-.207-.501-.354a13.4 13.4 0 0 0-2.333-.647q-1.06-.18-2.472-.181-2.109 0-4.164.639a12.3 12.3 0 0 0-3.74 1.9zm-.648 1.539q-.285 0-.523-.069a2 2 0 0 1-.437-.178 16.2 16.2 0 0 0-3.697-1.512 15 15 0 0 0-3.959-.527 13.6 13.6 0 0 0-4.376.72q-.866.352-1.62-.212-.756-.566-.755-1.544V3.492q0-.612.318-1.133.318-.52.895-.744A13.4 13.4 0 0 1 18.591.84a16.4 16.4 0 0 1 2.825-.246q2.322 0 4.508.67a15.2 15.2 0 0 1 4.108 1.979 14.8 14.8 0 0 1 4.076-1.978 15.1 15.1 0 0 1 4.476-.67q1.423 0 2.813.245 1.389.245 2.72.775.576.224.897.744t.321 1.133v14.592q0 .99-.83 1.529-.828.538-1.728.168a13 13 0 0 0-2.075-.5 14 14 0 0 0-2.118-.16q-2.014 0-3.937.526a16.2 16.2 0 0 0-3.676 1.512 2 2 0 0 1-.437.178 1.8 1.8 0 0 1-.502.069M32.89 6.714a.5.5 0 0 1 .082-.26.5.5 0 0 1 .224-.19q1.177-.555 2.505-.842t2.733-.286q.77 0 1.437.081.668.081 1.392.24a.64.64 0 0 1 .288.182q.127.135.127.333 0 .312-.19.455t-.5.073a11 11 0 0 0-1.236-.185q-.631-.058-1.318-.058-1.27 0-2.48.238-1.212.24-2.288.701-.333.14-.554.004-.222-.135-.222-.486m0 8.316q0-.13.082-.278a.46.46 0 0 1 .224-.207 9.8 9.8 0 0 1 2.505-.825 14.4 14.4 0 0 1 2.733-.268q.77 0 1.437.081.668.082 1.392.24a.64.64 0 0 1 .288.183q.127.134.127.333 0 .311-.19.454t-.5.074a11 11 0 0 0-1.236-.186q-.631-.058-1.318-.058-1.241 0-2.437.259t-2.272.73q-.352.17-.594.01-.24-.16-.24-.542m0-4.129a.5.5 0 0 1 .082-.26.5.5 0 0 1 .224-.189q1.177-.556 2.505-.842t2.733-.286q.77 0 1.437.08.668.082 1.392.241a.64.64 0 0 1 .288.182q.127.134.127.333 0 .313-.19.454-.19.143-.5.074a11 11 0 0 0-1.236-.185q-.631-.06-1.318-.059-1.27 0-2.48.239-1.212.24-2.288.7-.333.14-.554.005t-.222-.487"
    />
    <rect width={10} height={2} x={2.665} y={5.594} fill="#3B3DFF" rx={1} />
    <rect width={11} height={2} x={0.665} y={9.594} fill="#3B3DFF" rx={1} />
    <rect width={7} height={2} x={4.665} y={13.594} fill="#3B3DFF" rx={1} />
  </svg>
);
