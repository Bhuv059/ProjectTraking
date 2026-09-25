"use client";

import { ReactNode } from "react";
import "./dialog.css";

interface DialogProps {
  open: boolean;
  title: string;
  message?: string;
  children?: ReactNode;
  onClose: () => void;
}

export default function Dialog({ open, title, message, children, onClose }: DialogProps) {
  if (!open) return null;

  return (
    <div className="dialog-overlay" onClick={onClose}>
      <div className="dialog-box" onClick={(event) => event.stopPropagation()}>
        <h2 className="dialog-title">{title}</h2>

        {message && <p className="dialog-message">{message}</p>}

        {children}
      </div>
    </div>
  );
}
