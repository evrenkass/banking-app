export const Alert = ({ type, children }) => {
  return <div className={`alert alert-${type}`}>{children}</div>;
};
