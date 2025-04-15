import { motion } from 'framer-motion';

const Spinner = () => (
  <div className="fixed inset-0 flex items-center justify-center bg-white/50 z-50">
    <motion.div
      animate={{ rotate: 360 }}
      transition={{
        repeat: Infinity,
        ease: 'linear',
        duration: 1,
      }}
      className="w-12 h-12 rounded-full border-4 border-primary border-t-transparent border-solid"
      style={{
        borderTopColor: 'transparent', // 회전 효과를 위한 핵심 포인트
      }}
    />
  </div>
);
export default Spinner;
