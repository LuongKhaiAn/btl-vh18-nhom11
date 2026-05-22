const PageTransition = ({ pageKey, children }) => (
  <div key={pageKey} className="page-transition">
    {children}
  </div>
);

export default PageTransition;
