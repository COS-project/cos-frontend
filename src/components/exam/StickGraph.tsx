interface StickGraphProps {
  height: Number | null;
  color: string;
}

// report 페이지에서 쓰이는 그래프
const StickGraph: React.FC<StickGraphProps> = ({ height, color }) => {
  return <div style={{ height: `${height}%` }} className={`w-[40%] mt-auto bg-${color} rounded-t-full`}></div>;
};
export default StickGraph;
