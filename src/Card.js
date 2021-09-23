export const Card = ({ header, children, className = "" }) => {
  return (
    <div
      className={`card bg-white text-black w-50 mx-auto shadow-sm ${className}`}
    >
      <div className="card-body">
        <h5 className="card-title">{header}</h5>
        {children}
      </div>
    </div>
  );
};
