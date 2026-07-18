import { useEffect, useState } from "react";

export type PortfolioOverlayId = "mobile-nav" | "dock-window" | "ai-assistant";

const overlayEventName = "portfolio-overlay-activate";

export function activatePortfolioOverlay(id: PortfolioOverlayId) {
  if (typeof window === "undefined") return;
  window.dispatchEvent(new CustomEvent<PortfolioOverlayId>(overlayEventName, { detail: id }));
}

export function usePortfolioOverlayLayer(id: PortfolioOverlayId, baseLayer: number, activeLayer = 300) {
  const [activeOverlay, setActiveOverlay] = useState<PortfolioOverlayId | null>(null);

  useEffect(() => {
    const onActivate = (event: Event) => {
      setActiveOverlay((event as CustomEvent<PortfolioOverlayId>).detail);
    };

    window.addEventListener(overlayEventName, onActivate);
    return () => window.removeEventListener(overlayEventName, onActivate);
  }, []);

  return activeOverlay === id ? activeLayer : baseLayer;
}
