"use client";

import React from "react";
import { useFormStatus } from "react-dom";

type Props = { label: string };

export default function SubmitButton({ label }: Props) {
  const { pending } = useFormStatus();
  return (
    <button type="submit" disabled={pending} className="button">
      {label}
    </button>
  );
}
