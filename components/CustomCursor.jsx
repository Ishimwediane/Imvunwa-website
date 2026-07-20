"use client";

import { useEffect, useRef, useState } from "react";

export default function CustomCursor() {
  const dotRef = useRef(null);
  const ringRef = useRef(null);
  const mouse = useRef({ x: -200, y: -200 });
  const ring = useRef({ x: -200, y: -200 });
  const rafId = useRef(null);
  const [cursorState, setCursorState] = useState("default"); // default | hover | click | text | media

  useEffect(() => {
    // Hide native cursor globally
    document.documentElement.style.cursor = "none";

    const onMove = (e) => {
      mouse.current = { x: e.clientX, y: e.clientY };
      // Dot snaps immediately
      if (dotRef.current) {
        dotRef.current.style.transform = `translate(${e.clientX}px, ${e.clientY}px)`;
      }
    };

    const onDown = () => setCursorState((s) => (s === "hover" ? "hover-click" : "click"));
    const onUp = () =>
      setCursorState((s) =>
        s === "hover-click" ? "hover" : "default"
      );

    // Detect hover targets
    const interactiveSelector =
      "a, button, [role='button'], input, textarea, select, label, [data-cursor-hover], [data-cursor-media]";

    const onOver = (e) => {
      const el = e.target.closest(interactiveSelector);
      if (!el) return;
      if (el.tagName === "IMG" || el.tagName === "VIDEO" || el.dataset.cursorMedia !== undefined) {
        setCursorState("media");
      } else if (el.tagName === "INPUT" || el.tagName === "TEXTAREA") {
        setCursorState("text");
      } else {
        setCursorState("hover");
      }
    };
    const onOut = (e) => {
      const el = e.target.closest(interactiveSelector);
      if (el) setCursorState("default");
    };

    document.addEventListener("mousemove", onMove, { passive: true });
    document.addEventListener("mousedown", onDown);
    document.addEventListener("mouseup", onUp);
    document.addEventListener("mouseover", onOver);
    document.addEventListener("mouseout", onOut);

    // Lag ring animation loop
    const lerp = (a, b, t) => a + (b - a) * t;
    const tick = () => {
      ring.current.x = lerp(ring.current.x, mouse.current.x, 0.10);
      ring.current.y = lerp(ring.current.y, mouse.current.y, 0.10);
      if (ringRef.current) {
        ringRef.current.style.transform = `translate(${ring.current.x}px, ${ring.current.y}px)`;
      }
      rafId.current = requestAnimationFrame(tick);
    };
    rafId.current = requestAnimationFrame(tick);

    return () => {
      document.documentElement.style.cursor = "";
      document.removeEventListener("mousemove", onMove);
      document.removeEventListener("mousedown", onDown);
      document.removeEventListener("mouseup", onUp);
      document.removeEventListener("mouseover", onOver);
      document.removeEventListener("mouseout", onOut);
      cancelAnimationFrame(rafId.current);
    };
  }, []);

  // State-driven ring / dot sizes & colours
  const isHover = cursorState === "hover" || cursorState === "hover-click";
  const isClick = cursorState === "click" || cursorState === "hover-click";
  const isText = cursorState === "text";
  const isMedia = cursorState === "media";

  const dotStyle = {
    position: "fixed",
    top: 0,
    left: 0,
    width: isText ? "2px" : "6px",
    height: isText ? "20px" : "6px",
    borderRadius: isText ? "1px" : "50%",
    background: isHover
      ? "#F5A623"
      : isMedia
      ? "rgba(255,255,255,0.9)"
      : "#ffffff",
    pointerEvents: "none",
    zIndex: 99999,
    marginLeft: isText ? "-1px" : "-3px",
    marginTop: isText ? "-10px" : "-3px",
    transition:
      "width 0.2s cubic-bezier(.22,1,.36,1), height 0.2s cubic-bezier(.22,1,.36,1), background 0.2s ease, border-radius 0.2s ease",
    willChange: "transform",
    mixBlendMode: "difference",
  };

  const ringDiameter = isHover
    ? 44
    : isMedia
    ? 72
    : isClick
    ? 18
    : isText
    ? 28
    : 32;

  const ringStyle = {
    position: "fixed",
    top: 0,
    left: 0,
    width: `${ringDiameter}px`,
    height: `${ringDiameter}px`,
    borderRadius: isMedia ? "10px" : "50%",
    border: `1.5px solid ${
      isHover ? "#F5A623" : isMedia ? "rgba(255,255,255,0.6)" : "rgba(255,255,255,0.55)"
    }`,
    background: isMedia ? "rgba(245,166,35,0.08)" : "transparent",
    pointerEvents: "none",
    zIndex: 99998,
    marginLeft: `-${ringDiameter / 2}px`,
    marginTop: `-${ringDiameter / 2}px`,
    transition:
      "width 0.35s cubic-bezier(.22,1,.36,1), height 0.35s cubic-bezier(.22,1,.36,1), border-color 0.25s ease, border-radius 0.3s ease, background 0.3s ease",
    willChange: "transform",
    backdropFilter: isMedia ? "blur(2px)" : "none",
  };

  // Only render on non-touch devices
  if (typeof window !== "undefined" && window.matchMedia("(pointer: coarse)").matches) {
    return null;
  }

  return (
    <>
      <div ref={dotRef} style={dotStyle} aria-hidden="true" />
      <div ref={ringRef} style={ringStyle} aria-hidden="true">
        {isMedia && (
          <span
            style={{
              position: "absolute",
              inset: 0,
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              fontSize: "9px",
              fontWeight: 800,
              letterSpacing: "0.08em",
              color: "#F5A623",
              textTransform: "uppercase",
            }}
          >
            View
          </span>
        )}
      </div>
    </>
  );
}
