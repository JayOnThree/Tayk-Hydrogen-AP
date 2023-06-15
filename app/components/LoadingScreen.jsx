export default function LoadingScreen({progress}) {
  
  return (
    <div
      className="loader-container"
      style={{opacity: progress === 100 ? 0 : 1}}
    >
      <h6 className="loading-header-text" style={{top: "10px", left: "10px"}}>TAYK.WORLD</h6>
      <div className="text-div">
        <h3 className="loader-text">{progress.toFixed(0)}%</h3>
      </div>
      <h6 className="loading-header-text" style={{bottom: "10px", right: "10px"}}>TAYK.WORLD</h6>
    </div>
  );
}
