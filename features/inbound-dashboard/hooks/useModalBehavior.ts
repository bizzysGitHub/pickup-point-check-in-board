import { useEffect, useRef } from "react";

/**
 * Shared modal behaviour: Escape closes, body scroll is locked while open,
 * and focus moves into the dialog. Attach the returned ref to the dialog.
 */
export function useModalBehavior<T extends HTMLElement>(
  open: boolean,
  onClose: () => void,
) {
  const dialogRef = useRef<T>(null);
  const onCloseRef = useRef(onClose);

  useEffect(() => {
    onCloseRef.current = onClose;
  }, [onClose]);

  useEffect(() => {
    if (!open) return;

    const previousOverflow = document.body.style.overflow;
    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") onCloseRef.current();
    };
    const focusFrame = window.requestAnimationFrame(() =>
      dialogRef.current?.focus(),
    );

    document.body.style.overflow = "hidden";
    window.addEventListener("keydown", handleKeyDown);

    return () => {
      window.cancelAnimationFrame(focusFrame);
      document.body.style.overflow = previousOverflow;
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, [open]);

  return dialogRef;
}
