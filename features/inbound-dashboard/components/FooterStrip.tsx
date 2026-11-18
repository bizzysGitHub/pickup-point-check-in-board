import { Building2, MessageSquareText, ShieldCheck } from "lucide-react";

export function FooterStrip({ onFeedbackClick }: { onFeedbackClick: () => void }) {
  return (
    <footer className="footer-strip">
      <div className="footer-item">
        <Building2 size={27} color="#45c1ff" aria-hidden="true" />
        <p>
          <strong>Paperwork handled for you</strong>
          <span>Ask your specialist what we take care of.</span>
        </p>
      </div>
      <div className="footer-item">
        <ShieldCheck size={27} color="#70d94f" aria-hidden="true" />
        <p>
          <strong>Take your time</strong>
          <span>Make sure everything looks right before you go.</span>
        </p>
      </div>
      <button
        className="footer-item footer-feedback"
        type="button"
        onClick={onFeedbackClick}
      >
        <MessageSquareText size={27} color="#45c1ff" aria-hidden="true" />
        <span className="footer-copy">
          <strong>Tell us how we’re doing</strong>
          <span>Leave a quick rating or comment about your visit.</span>
        </span>
      </button>
    </footer>
  );
}
