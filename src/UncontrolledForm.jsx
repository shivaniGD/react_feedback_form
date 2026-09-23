import { useRef, useState } from "react";
import Field from "./Field.jsx";
import { check } from "./check.js";

export default function UncontrolledForm({ onSend }) {
  const frm = useRef(null);
  const [errs, setErrs] = useState({});
  const hits = useRef(0);
  hits.current += 1;

  const submit = (e) => {
    e.preventDefault();
    const vals = Object.fromEntries(new FormData(frm.current));
    const found = check(vals);
    setErrs(found);
    if (Object.keys(found).length > 0) return;
    onSend({ ...vals, way: "Uncontrolled" });
    frm.current.reset();
  };

  return (
    <section className="panel unc">
      <h2>Uncontrolled</h2>
      <p className="sub">
        The inputs keep their own values. React reads them once, on submit.
      </p>

      <form ref={frm} onSubmit={submit} noValidate>
        <Field id="u-nm" label="Name" error={errs.nm}>
          <input
            id="u-nm"
            name="nm"
            type="text"
            defaultValue=""
            required
            autoComplete="off"
            aria-invalid={!!errs.nm}
            aria-describedby={errs.nm ? "u-nm-err" : undefined}
          />
        </Field>

        <Field id="u-em" label="Email" error={errs.em}>
          <input
            id="u-em"
            name="em"
            type="email"
            defaultValue=""
            required
            autoComplete="off"
            aria-invalid={!!errs.em}
            aria-describedby={errs.em ? "u-em-err" : undefined}
          />
        </Field>

        <Field id="u-msg" label="Message" error={errs.msg}>
          <textarea
            id="u-msg"
            name="msg"
            rows="4"
            defaultValue=""
            required
            aria-invalid={!!errs.msg}
            aria-describedby={errs.msg ? "u-msg-err" : undefined}
          />
          <span className="count">No live counter: React can't see the text yet.</span>
        </Field>

        <div className="row">
          <button type="submit">Send feedback</button>
          <span className="hits">Renders: {hits.current}</span>
        </div>
      </form>
    </section>
  );
}
