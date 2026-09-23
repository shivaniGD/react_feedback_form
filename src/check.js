export function check(v) {
  const out = {};

  if (!v.nm || !v.nm.trim()) {
    out.nm = "Enter your name.";
  }

  if (!v.em || !v.em.trim()) {
    out.em = "Enter your email.";
  } else if (!/^\S+@\S+\.\S+$/.test(v.em.trim())) {
    out.em = "That email doesn't look right. Try name@example.com.";
  }

  if (!v.msg || !v.msg.trim()) {
    out.msg = "Write a message.";
  } else if (v.msg.trim().length < 10) {
    out.msg = "Add a little more. 10 characters minimum.";
  }

  return out;
}
