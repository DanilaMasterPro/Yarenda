"use client";

import { useRef } from "react";
import { X } from "lucide-react";

interface BottomSheetProps {
  isOpen: boolean;
  onClose: () => void;
  title?: React.ReactNode;
  children: React.ReactNode;
}

export function BottomSheet({
  isOpen,
  onClose,
  title,
  children,
}: BottomSheetProps) {
  const sheetRef = useRef<HTMLDivElement>(null);
  const dragRef = useRef({ startY: 0, startH: 0, dragging: false });

  if (!isOpen) return null;

  // ── Drag handlers ─────────────────────────────────

  const handleDragStart = (clientY: number) => {
    if (!sheetRef.current) return;
    dragRef.current = {
      startY: clientY,
      startH: sheetRef.current.offsetHeight,
      dragging: true,
    };
  };

  const handleDragMove = (clientY: number) => {
    if (!dragRef.current.dragging || !sheetRef.current) return;
    const delta = dragRef.current.startY - clientY;
    const newH = Math.max(
      120,
      Math.min(window.innerHeight * 0.85, dragRef.current.startH + delta),
    );
    sheetRef.current.style.height = `${newH}px`;
  };

  const handleDragEnd = () => {
    if (!sheetRef.current) return;
    dragRef.current.dragging = false;
    if (sheetRef.current.offsetHeight < 120) {
      onClose();
    }
  };

  // ── Render ─────────────────────────────────────────

  return (
    <div className="fixed inset-0 z-[60] pointer-events-none">
      {/* Backdrop */}
      <div
        className="absolute inset-0 bg-black/30 pointer-events-auto"
        onClick={onClose}
      />

      {/* Sheet */}
      <div
        ref={sheetRef}
        className="absolute bottom-0 left-0 right-0 bg-white rounded-t-2xl shadow-2xl pointer-events-auto flex flex-col max-h-[85vh]"
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
          <div className="px-4 pb-3 flex items-center justify-between border-b border-gray-100 flex-shrink-0">
            <div className="text-sm font-medium text-gray-900">{title}</div>
            <button
              onClick={onClose}
              className="p-1.5 hover:bg-gray-100 rounded-full transition-colors"
            >
              <X className="w-4 h-4 text-gray-500" />
            </button>
          </div>
        )}

        {/* Content */}
        <div className="flex-1 overflow-y-auto">{children}</div>
      </div>
    </div>
  );
}
