import { contactForm } from "@/lib/home/contact-content";

/**
 * The email step's question, greeting the reader by the name they just gave —
 * "Great **Priya**! Let’s get your email!" — as softsuave.com's contact and
 * meeting cards do. Without a name it is the plain question.
 */
export default function EmailQuestion({ name }: { name: string }) {
  const n = name.trim();
  const q = contactForm.steps.email;
  if (!n) return <>{q.question}</>;
  return (
    <>
      {q.named[0]}
      <strong>{n}</strong>
      {q.named[1]}
    </>
  );
}
