"use client";

import { useEffect, useRef } from "react";
import { ArrowLeft, SlidersHorizontal } from "lucide-react";

interface BottomSheetProps {
  isOpen: boolean;
  onClose: () => void;
  onOpen?: () => void;
  onFilters?: () => void;
  title?: React.ReactNode;
  children: React.ReactNode;
  closeButton?: boolean; // show close button even if no title
  peekHeight?: number; // px — default 40
}

export function BottomSheet({
  isOpen,
  onClose,
  onOpen,
  onFilters,
  title,
  children,
  closeButton,
  peekHeight = 40,
}: BottomSheetProps) {
  const sheetRef = useRef<HTMLDivElement>(null);
  const dragRef = useRef({
    startY: 0,
    startH: 0,
    lastY: 0,
    dragging: false,
  });

  const fullH = () => window.innerHeight * 0.85;

  // ── Snap helper ────────────────────────────────────

  const snapTo = (targetH: number) => {
    if (!sheetRef.current) return;
    sheetRef.current.style.transition =
      "height 0.3s cubic-bezier(0.32,0.72,0,1)";
    sheetRef.current.style.height = `${targetH}px`;
    setTimeout(() => {
      if (sheetRef.current) sheetRef.current.style.transition = "";
    }, 300);
  };

  // Snap to full when opened, back to peek when closed externally
  useEffect(() => {
    if (isOpen) {
      snapTo(fullH());
    } else {
      snapTo(peekHeight);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isOpen]);

  // ── Drag handlers ─────────────────────────────────

  const handleDragStart = (clientY: number) => {
    if (!sheetRef.current) return;
    dragRef.current = {
      startY: clientY,
      startH: sheetRef.current.offsetHeight,
      lastY: clientY,
      dragging: true,
    };
  };

  const handleDragMove = (clientY: number) => {
    if (!dragRef.current.dragging || !sheetRef.current) return;
    dragRef.current.lastY = clientY;
    const delta = dragRef.current.startY - clientY;
    const newH = Math.max(
      peekHeight,
      Math.min(fullH(), dragRef.current.startH + delta),
    );
    sheetRef.current.style.height = `${newH}px`;
  };

  const handleDragEnd = () => {
    if (!sheetRef.current) return;
    dragRef.current.dragging = false;

    const h = sheetRef.current.offsetHeight;
    // flick velocity: positive = dragged up, negative = dragged down
    const flick = dragRef.current.startY - dragRef.current.lastY;

    if (!isOpen) {
      // Sheet is in peek state — upward drag/flick triggers open
      if (flick > 40 || h > peekHeight + 60) {
        onOpen?.();
        if (!onOpen) snapTo(peekHeight);
      } else {
        snapTo(peekHeight);
      }
      return;
    }

    // Sheet is open — snap or close
    if (flick < -40) {
      // fast downward flick → back to peek + close
      snapTo(peekHeight);
      onClose();
    } else if (flick > 40) {
      // fast upward flick → expand to full
      snapTo(fullH());
    } else {
      // snap to nearest
      const mid = (peekHeight + fullH()) / 2;
      if (h < mid) {
        snapTo(peekHeight);
        onClose();
      } else {
        snapTo(fullH());
      }
    }
  };

  // ── Render ─────────────────────────────────────────

  return (
    <div className="fixed inset-0 z-[60] pointer-events-none">
      {/* Backdrop — only visible when open */}
      {isOpen && (
        <div
          className="absolute inset-0 bg-black/30 pointer-events-auto"
          onClick={onClose}
        />
      )}

      {/* Sheet — starts at peek height */}
      <div
        ref={sheetRef}
        className="absolute bottom-0 left-0 right-0 bg-white rounded-t-2xl shadow-2xl pointer-events-auto flex flex-col overflow-hidden"
        style={{ height: peekHeight, maxHeight: "85vh" }}
      >
        {/* Drag handle */}
        <div
          className="flex justify-center py-3 cursor-grab active:cursor-grabbing flex-shrink-0"
          onTouchStart={(e) => handleDragStart(e.touches[0].clientY)}
          onTouchMove={(e) => handleDragMove(e.touches[0].clientY)}
          onTouchEnd={handleDragEnd}
          onMouseDown={(e) => {
            handleDragStart(e.clientY);
            const onMove = (ev: MouseEvent) => handleDragMove(ev.clientY);
            const onUp = () => {
              handleDragEnd();
              window.removeEventListener("mousemove", onMove);
              window.removeEventListener("mouseup", onUp);
            };
            window.addEventListener("mousemove", onMove);
            window.addEventListener("mouseup", onUp);
          }}
        >
          <div className="w-10 h-1 rounded-full bg-gray-300" />
        </div>

        {/* Header */}
        {title !== undefined && (
          <div className="px-4 pb-3 flex items-center gap-2 border-b border-gray-100 flex-shrink-0">
            {closeButton && (
              <button
                onClick={onClose}
                className="p-1.5 hover:bg-gray-100 rounded-full transition-colors flex-shrink-0"
              >
                <ArrowLeft className="w-4 h-4 text-gray-500" />
              </button>
            )}
            <div className="text-sm font-medium text-gray-900 flex-1 min-w-0 truncate">
              {title}
            </div>
            {onFilters && (
              <button
                onClick={onFilters}
                className="p-1.5 hover:bg-gray-100 rounded-full transition-colors flex-shrink-0"
              >
                <SlidersHorizontal className="w-4 h-4 text-gray-500" />
              </button>
            )}
          </div>
        )}

        {/* Content */}
        <div className="flex-1 overflow-y-auto">{children}</div>
      </div>
    </div>
  );
}
