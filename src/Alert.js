export const Alert = ({ type, children }) => {
  return <div className={`alert alert-${type} w-50 mx-auto`}>{children}</div>;
};
