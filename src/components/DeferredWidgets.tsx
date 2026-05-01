"use client";

import { useEffect, useState } from "react";
import dynamic from "next/dynamic";

const ScrollToTop = dynamic(() => import("@/components/ScrollToTop"), { ssr: false });
const WhatsAppButton = dynamic(() => import("@/components/WhatsAppButton/whatsAppBotton"), { ssr: false });
const CallButton = dynamic(() => import("@/components/CallButton/callButton"), { ssr: false });

export default function DeferredWidgets() {
  const [show, setShow] = useState(false);

  useEffect(() => {
    type IdleWindow = Window & {
      requestIdleCallback?: (cb: () => void, opts?: { timeout: number }) => number;
      cancelIdleCallback?: (id: number) => void;
    };
    const w = window as IdleWindow;
    let idleId: number | null = null;
    let timeoutId: ReturnType<typeof setTimeout> | null = null;
    if (typeof w.requestIdleCallback === "function") {
      idleId = w.requestIdleCallback(() => setShow(true), { timeout: 2000 });
    } else {
      timeoutId = setTimeout(() => setShow(true), 1500);
    }
    return () => {
      if (idleId !== null && typeof w.cancelIdleCallback === "function") w.cancelIdleCallback(idleId);
      if (timeoutId !== null) clearTimeout(timeoutId);
    };
  }, []);

  if (!show) return null;
  return (
    <>
      <ScrollToTop />
      <WhatsAppButton />
      <CallButton />
    </>
  );
}
