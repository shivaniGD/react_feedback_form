import { useRef, useState } from "react";
import Field from "./Field.jsx";
import { check } from "./check.js";

const blank = { nm: "", em: "", msg: "" };
const LIMIT = 300;

export default function ControlledForm({ onSend }) {
  const [vals, setVals] = useState(blank);
  const [errs, setErrs] = useState({});
  const hits = useRef(0);
  hits.current += 1;

  const change = (e) => {
    const { name, value } = e.target;
    setVals((p) => ({ ...p, [name]: value }));
    if (errs[name]) setErrs((p) => ({ ...p, [name]: undefined }));
  };

  const submit = (e) => {
    e.preventDefault();
    const found = check(vals);
    setErrs(found);
    if (Object.keys(found).length > 0) return;
    onSend({ ...vals, way: "Controlled" });
    setVals(blank);
  };

  return (
    <section className="panel ctl">
      <h2>Controlled</h2>
      <p className="sub">React state holds every value. Each keystroke updates state.</p>

      <form onSubmit={submit} noValidate>
        <Field id="c-nm" label="Name" error={errs.nm}>
          <input
            id="c-nm"
            name="nm"
            type="text"
            value={vals.nm}
            onChange={change}
            required
            autoComplete="off"
            aria-invalid={!!errs.nm}
            aria-describedby={errs.nm ? "c-nm-err" : undefined}
          />
        </Field>

        <Field id="c-em" label="Email" error={errs.em}>
          <input
            id="c-em"
            name="em"
            type="email"
            value={vals.em}
            onChange={change}
            required
            autoComplete="off"
            aria-invalid={!!errs.em}
            aria-describedby={errs.em ? "c-em-err" : undefined}
          />
        </Field>

        <Field id="c-msg" label="Message" error={errs.msg}>
          <textarea
            id="c-msg"
            name="msg"
            rows="4"
            value={vals.msg}
            onChange={change}
            maxLength={LIMIT}
            required
            aria-invalid={!!errs.msg}
            aria-describedby={errs.msg ? "c-msg-err" : undefined}
          />
          <span className="count">
            {vals.msg.length} / {LIMIT}
          </span>
        </Field>

        <div className="row">
          <button type="submit">Send feedback</button>
          <span className="hits">Renders: {hits.current}</span>
        </div>
      </form>
    </section>
  );
}
