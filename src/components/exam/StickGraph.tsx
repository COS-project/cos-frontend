interface StickGraphProps {
  height: number;
  color: string;
}

// report 페이지에서 쓰이는 그래프
const StickGraph: React.FC<StickGraphProps> = ({ height, color }) => {
  return <div style={{ height: `${height}%` }} className={`w-[20%] mt-auto bg-${color} rounded-t-full`}></div>;
};
export default StickGraph;
