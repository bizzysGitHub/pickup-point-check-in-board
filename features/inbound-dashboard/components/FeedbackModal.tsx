"use client";

import { MessageSquareText, Send, Star, X } from "lucide-react";
import {
  FEEDBACK_COMMENT_LIMIT,
  useFeedbackForm,
} from "../hooks/useFeedbackForm";
import { useModalBehavior } from "../hooks/useModalBehavior";

export function FeedbackModal({ onClose }: { onClose: () => void }) {
  const dialogRef = useModalBehavior<HTMLElement>(true, onClose);
  const form = useFeedbackForm();

  return (
    <div
      className="specialist-modal-backdrop"
      onPointerDown={(event) => {
        if (event.target === event.currentTarget) onClose();
      }}
    >
      <section
        className="specialist-modal feedback-modal"
        role="dialog"
        aria-modal="true"
        aria-labelledby="feedback-modal-title"
        tabIndex={-1}
        ref={dialogRef}
      >
        <button
          className="specialist-modal-close"
          type="button"
          aria-label="Close feedback form"
          onClick={onClose}
        >
          <X size={18} aria-hidden="true" />
        </button>

        {form.submitted ? (
          <div className="feedback-thanks">
            <span className="feedback-icon">
              <MessageSquareText size={25} aria-hidden="true" />
            </span>
            <p className="modal-eyebrow">Feedback received</p>
            <h2 id="feedback-modal-title">Thanks for sharing.</h2>
            <p>Your feedback helps us make every visit better.</p>
            <button
              className="feedback-submit"
              type="button"
              onClick={onClose}
            >
              Done
            </button>
          </div>
        ) : (
          <>
            <div className="feedback-heading">
              <span className="feedback-icon">
                <MessageSquareText size={25} aria-hidden="true" />
              </span>
              <div>
                <p className="modal-eyebrow">Your experience</p>
                <h2 id="feedback-modal-title">Tell us how we’re doing</h2>
                <p>Rate today’s visit and leave a note for the team.</p>
              </div>
            </div>

            <form className="feedback-form" onSubmit={form.handleSubmit}>
              <fieldset>
                <legend>How was your visit?</legend>
                <div
                  className="rating-picker"
                  role="radiogroup"
                  aria-label="Visit rating"
                >
                  {Array.from({ length: 5 }, (_, index) => {
                    const value = index + 1;

                    return (
                      <button
                        key={value}
                        className={
                          value <= form.rating
                            ? "rating-button rating-button-selected"
                            : "rating-button"
                        }
                        type="button"
                        role="radio"
                        aria-checked={value === form.rating}
                        aria-label={`${value} star${value === 1 ? "" : "s"}`}
                        onClick={() => form.setRating(value)}
                      >
                        <Star size={27} aria-hidden="true" />
                      </button>
                    );
                  })}
                </div>
              </fieldset>

              <label htmlFor="feedback-comment">
                Leave a comment
                <span>Optional</span>
              </label>
              <textarea
                id="feedback-comment"
                value={form.comment}
                maxLength={FEEDBACK_COMMENT_LIMIT}
                rows={5}
                placeholder="What went well, or what could we do better?"
                onChange={(event) => form.setComment(event.target.value)}
              />
              {form.error && (
                <p className="feedback-error" role="alert">
                  We couldn’t send your feedback. Please try again.
                </p>
              )}
              <div className="feedback-form-footer">
                <span>
                  {form.comment.length}/{FEEDBACK_COMMENT_LIMIT}
                </span>
                <button
                  className="feedback-submit"
                  type="submit"
                  disabled={!form.canSubmit}
                >
                  <Send size={16} aria-hidden="true" />
                  {form.loading ? "Sending…" : "Submit feedback"}
                </button>
              </div>
            </form>
          </>
        )}
      </section>
    </div>
  );
}
