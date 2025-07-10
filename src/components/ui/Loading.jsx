import { motion } from "framer-motion";

const Loading = () => {
  return (
    <div className="space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {[1, 2, 3, 4].map((i) => (
          <motion.div
            key={i}
            className="metric-card rounded-xl p-6"
            animate={{ opacity: [0.5, 1, 0.5] }}
            transition={{ duration: 2, repeat: Infinity, delay: i * 0.2 }}
          >
            <div className="flex items-center justify-between">
              <div className="flex-1">
                <div className="h-4 bg-slate-700 rounded w-24 mb-2 shimmer"></div>
                <div className="h-8 bg-slate-700 rounded w-16 mb-2 shimmer"></div>
                <div className="h-4 bg-slate-700 rounded w-20 shimmer"></div>
              </div>
              <div className="w-12 h-12 bg-slate-700 rounded-lg shimmer"></div>
            </div>
          </motion.div>
        ))}
      </div>
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <motion.div
          className="metric-card rounded-xl p-6"
          animate={{ opacity: [0.5, 1, 0.5] }}
          transition={{ duration: 2, repeat: Infinity }}
        >
          <div className="h-6 bg-slate-700 rounded w-48 mb-4 shimmer"></div>
          <div className="h-80 bg-slate-700 rounded shimmer"></div>
        </motion.div>
        <div className="space-y-4">
          {[1, 2, 3, 4].map((i) => (
            <motion.div
              key={i}
              className="metric-card rounded-xl p-4"
              animate={{ opacity: [0.5, 1, 0.5] }}
              transition={{ duration: 2, repeat: Infinity, delay: i * 0.1 }}
            >
              <div className="flex items-center space-x-4">
                <div className="w-10 h-10 bg-slate-700 rounded-lg shimmer"></div>
                <div className="flex-1">
                  <div className="h-4 bg-slate-700 rounded w-32 mb-2 shimmer"></div>
                  <div className="h-3 bg-slate-700 rounded w-48 shimmer"></div>
                </div>
                <div className="w-16 h-6 bg-slate-700 rounded shimmer"></div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Loading;