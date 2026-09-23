export default function Field({ id, label, error, children }) {
  return (
    <div className={error ? "fld bad" : "fld"}>
      <label htmlFor={id}>{label}</label>
      {children}
      {error && (
        <p className="oops" id={id + "-err"} role="alert">
          {error}
        </p>
      )}
    </div>
  );
}
