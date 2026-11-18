import { useState, type FormEvent } from "react";
import { useMutation } from "@apollo/client/react";
import { SUBMIT_FEEDBACK } from "../graphql/operations";

export const FEEDBACK_COMMENT_LIMIT = 600;

export function useFeedbackForm() {
  const [rating, setRating] = useState(0);
  const [comment, setComment] = useState("");
  const [submitted, setSubmitted] = useState(false);
  const [submitFeedback, { loading, error }] = useMutation(SUBMIT_FEEDBACK);

  const canSubmit =
    !loading && (rating > 0 || comment.trim().length > 0);

  async function handleSubmit(event: FormEvent) {
    event.preventDefault();
    if (!canSubmit) return;

    try {
      await submitFeedback({
        variables: { input: { rating, comment: comment.trim() } },
      });
      setSubmitted(true);
    } catch {
      // `error` from useMutation drives the message shown in the form.
    }
  }

  return {
    rating,
    setRating,
    comment,
    setComment,
    submitted,
    loading,
    error,
    canSubmit,
    handleSubmit,
  };
}
