import { useState } from "react";
import "./App.css";

const emptyForm = {
  name: "",
  email: "",
  category: "",
  rating: "",
  message: "",
  contact: false,
};

function App() {
  const [form, setForm] = useState(emptyForm);
  const [errors, setErrors] = useState({});
  const [done, setDone] = useState(false);
  const [list, setList] = useState([]);

  function handleChange(e) {
    const { name, value, type, checked } = e.target;
    setForm({ ...form, [name]: type === "checkbox" ? checked : value });
    setErrors({ ...errors, [name]: "" });
    setDone(false);
  }

  function validate() {
    const err = {};

    if (form.name.trim() === "") {
      err.name = "Name is required";
    } else if (form.name.trim().length < 2) {
      err.name = "Name must be at least 2 letters";
    }

    if (form.email.trim() === "") {
      err.email = "Email is required";
    } else if (!/^\S+@\S+\.\S+$/.test(form.email.trim())) {
      err.email = "Please enter a valid email";
    }

    if (form.category === "") {
      err.category = "Please select a category";
    }

    if (form.rating === "") {
      err.rating = "Please give a rating";
    }

    if (form.message.trim() === "") {
      err.message = "Message is required";
    } else if (form.message.trim().length < 10) {
      err.message = "Message must be at least 10 characters";
    }

    return err;
  }

  function handleSubmit(e) {
    e.preventDefault();

    const err = validate();
    setErrors(err);

    if (Object.keys(err).length > 0) {
      setDone(false);
      return;
    }

    console.log(form);

    setList([{ ...form, id: Date.now() }, ...list]);
    setForm(emptyForm);
    setDone(true);
  }

  function handleReset() {
    setForm(emptyForm);
    setErrors({});
    setDone(false);
  }

  return (
    <div className="box">
      <h2>Feedback Form</h2>

      <form onSubmit={handleSubmit} noValidate>
        <label>Name *</label>
        <input
          type="text"
          name="name"
          value={form.name}
          onChange={handleChange}
          required
        />
        {errors.name && <p className="error">{errors.name}</p>}

        <label>Email *</label>
        <input
          type="email"
          name="email"
          value={form.email}
          onChange={handleChange}
          required
        />
        {errors.email && <p className="error">{errors.email}</p>}

        <label>Category *</label>
        <select
          name="category"
          value={form.category}
          onChange={handleChange}
          required
        >
          <option value="">-- Select --</option>
          <option value="General">General</option>
          <option value="Bug">Bug report</option>
          <option value="Suggestion">Suggestion</option>
          <option value="Compliment">Compliment</option>
          <option value="Other">Other</option>
        </select>
        {errors.category && <p className="error">{errors.category}</p>}

        <label>Rating *</label>
        <div className="rating">
          {[1, 2, 3, 4, 5].map((n) => (
            <label key={n} className="radio">
              <input
                type="radio"
                name="rating"
                value={n}
                checked={form.rating === String(n)}
                onChange={handleChange}
              />
              {n}
            </label>
          ))}
        </div>
        {errors.rating && <p className="error">{errors.rating}</p>}

        <label>Message *</label>
        <textarea
          name="message"
          rows="4"
          maxLength="300"
          value={form.message}
          onChange={handleChange}
          required
        ></textarea>
        <small>{form.message.length} / 300</small>
        {errors.message && <p className="error">{errors.message}</p>}

        <label className="check">
          <input
            type="checkbox"
            name="contact"
            checked={form.contact}
            onChange={handleChange}
          />
          You can contact me about this feedback
        </label>

        {done && <p className="ok">Thank you for your feedback!</p>}

        <button type="submit">Submit</button>
        <button type="button" onClick={handleReset}>
          Reset
        </button>
      </form>

      <h3>Feedback received ({list.length})</h3>
      {list.length === 0 && <p>No feedback yet.</p>}
      {list.map((item) => (
        <div className="item" key={item.id}>
          <b>{item.name}</b> ({item.email})
          <br />
          {item.category} - {"★".repeat(Number(item.rating))}
          <br />
          {item.message}
          <br />
          {item.contact ? "OK to contact" : "Do not contact"}
        </div>
      ))}
    </div>
  );
}

export default App;