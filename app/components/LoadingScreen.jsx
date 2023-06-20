import {motion, AnimatePresence} from 'framer-motion';

export default function LoadingScreen({progress}) {
  return (
    <AnimatePresence>
      {progress !== 100 && (
        <motion.div
          className="loader-container"
          initial={{opacity: 1}}
          animate={{opacity: 1}}
          exit={{opacity: 0}}
        >
          <h6
            className="loading-header-text"
            style={{top: '10px', left: '10px'}}
          >
            TAYK.WORLD
          </h6>
          <div className="text-div">
            <h3 className="loader-text">{progress.toFixed(0)}%</h3>
          </div>
          <h6
            className="loading-header-text"
            style={{bottom: '10px', right: '10px'}}
          >
            TAYK.WORLD
          </h6>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
