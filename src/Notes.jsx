const rows = [
  [
    "Who holds the value",
    "React state (useState)",
    "The DOM input itself",
  ],
  [
    "How you read it",
    "vals.nm, straight from state",
    "new FormData(form) or a ref, when you need it",
  ],
  [
    "Re-renders while typing",
    "Yes, on every keystroke",
    "No, the input updates without React",
  ],
  [
    "Live extras (counter, instant errors, disabling the button)",
    "Easy, the value is always in state",
    "Awkward, you only get the value on an event",
  ],
  [
    "Clearing the form",
    "setVals(blank)",
    "form.reset()",
  ],
  [
    "Code you write",
    "More: state plus an onChange",
    "Less: just a name on each input",
  ],
  [
    "Good fit",
    "Forms that react as you type, or share values with other parts of the UI",
    "Simple forms read once on submit, and file inputs (always uncontrolled)",
  ],
];

export default function Notes() {
  return (
    <section className="notes">
      <h2>Controlled vs uncontrolled</h2>
      <p className="sub">
        Type in both forms and watch the render counters. The controlled one climbs with
        every keystroke. The uncontrolled one only moves when you submit.
      </p>

      <div className="wide">
        <table>
          <thead>
            <tr>
              <th></th>
              <th className="c1">Controlled</th>
              <th className="c2">Uncontrolled</th>
            </tr>
          </thead>
          <tbody>
            {rows.map(([a, b, c]) => (
              <tr key={a}>
                <th scope="row">{a}</th>
                <td>{b}</td>
                <td>{c}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <p className="take">
        In React, start with controlled when the screen depends on what's typed. Reach for
        uncontrolled when you only need the values at the moment of submit.
      </p>
    </section>
  );
}
