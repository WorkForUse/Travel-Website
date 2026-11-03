"use client";

import React, { useEffect, useId, useLayoutEffect, useRef, useState } from "react";
import { Check, ChevronDown, SlidersHorizontal } from "lucide-react";

export const fieldBox =
  "block min-w-0 rounded-xl border border-[#E8E2D5] bg-[#FAF8F5] px-3.5 py-2.5 transition-colors focus-within:border-[#C5A059] focus-within:ring-2 focus-within:ring-[#C5A059]/15";

export const labelCls =
  "flex items-center gap-1.5 text-[10px] font-bold uppercase leading-none tracking-[0.12em] text-[#6A7382]";

export const controlCls =
  "mt-1.5 block w-full min-w-0 bg-transparent text-[13px] sm:text-sm font-semibold text-[#141A22] focus:outline-none";

interface Option {
  value: string;
  label: string;
}

function parseOptions(children: React.ReactNode): Option[] {
  const out: Option[] = [];
  React.Children.forEach(children, (child) => {
    if (React.isValidElement(child)) {
      const p = child.props as { value?: string | number; children?: React.ReactNode };
      const label = React.Children.toArray(p.children).join("");
      out.push({ value: String(p.value ?? label), label });
    }
  });
  return out;
}

interface SelectFieldProps {
  label: string;
  icon?: React.ReactNode;
  value: string;
  onChange: (val: string) => void;
  children: React.ReactNode;
  className?: string;
  /** "field" = boxed field with label on top. "inline" = compact pill (label left, value right). */
  variant?: "field" | "inline";
}

export function SelectField({
  label,
  icon,
  value,
  onChange,
  children,
  className = "",
  variant = "field",
}: SelectFieldProps) {
  const options = parseOptions(children);
  const selectedIndex = options.findIndex((o) => o.value === value);
  const selected = options[selectedIndex];

  const [open, setOpen] = useState(false);
  const [active, setActive] = useState(0);
  const [openUp, setOpenUp] = useState(false);
  const [flipRight, setFlipRight] = useState(false);

  const rootRef = useRef<HTMLDivElement>(null);
  const triggerRef = useRef<HTMLButtonElement>(null);
  const listRef = useRef<HTMLUListElement>(null);
  const listId = useId();

  const alignRight = variant === "inline" || flipRight;

  const openList = () => {
    setActive(selectedIndex >= 0 ? selectedIndex : 0);
    setOpenUp(false);
    setFlipRight(false);
    setOpen(true);
  };

  const close = (refocus = false) => {
    setOpen(false);
    if (refocus) triggerRef.current?.focus();
  };

  const choose = (i: number) => {
    const opt = options[i];
    if (!opt) return;
    onChange(opt.value);
    close(true);
  };

  // Close when clicking / tapping outside
  useEffect(() => {
    if (!open) return;
    const handler = (e: PointerEvent) => {
      if (!rootRef.current?.contains(e.target as Node)) setOpen(false);
    };
    document.addEventListener("pointerdown", handler);
    return () => document.removeEventListener("pointerdown", handler);
  }, [open]);

  // Smart placement: flip upward near the bottom edge, flip to the right edge near the right side
  useLayoutEffect(() => {
    if (!open || !listRef.current || !triggerRef.current) return;
    const list = listRef.current.getBoundingClientRect();
    const trigger = triggerRef.current.getBoundingClientRect();
    const spaceBelow = window.innerHeight - trigger.bottom - 12;
    setOpenUp(list.height > spaceBelow && trigger.top > spaceBelow);
    if (variant !== "inline") setFlipRight(list.right > window.innerWidth - 8);
  }, [open, variant]);

  // Keep the keyboard-highlighted option visible inside the list (without scrolling the page)
  useEffect(() => {
    if (!open || !listRef.current) return;
    const list = listRef.current;
    const el = list.children[active] as HTMLElement | undefined;
    if (!el) return;
    const top = el.offsetTop;
    const bottom = top + el.offsetHeight;
    if (top < list.scrollTop) list.scrollTop = top;
    else if (bottom > list.scrollTop + list.clientHeight) list.scrollTop = bottom - list.clientHeight;
  }, [open, active]);

  const onKeyDown = (e: React.KeyboardEvent<HTMLButtonElement>) => {
    if (!open) {
      if (e.key === "ArrowDown" || e.key === "ArrowUp") {
        e.preventDefault();
        openList();
      }
      return;
    }
    switch (e.key) {
      case "ArrowDown":
        e.preventDefault();
        setActive((i) => Math.min(i + 1, options.length - 1));
        break;
      case "ArrowUp":
        e.preventDefault();
        setActive((i) => Math.max(i - 1, 0));
        break;
      case "Home":
        e.preventDefault();
        setActive(0);
        break;
      case "End":
        e.preventDefault();
        setActive(options.length - 1);
        break;
      case "Escape":
        e.preventDefault();
        close(true);
        break;
      case "Tab":
        setOpen(false);
        break;
    }
  };

  const onTriggerClick = (e: React.MouseEvent<HTMLButtonElement>) => {
    if (!open) return openList();
    // detail === 0 means the click came from the keyboard (Enter / Space) -> pick the highlighted option
    if (e.detail === 0) choose(active);
    else close();
  };

  const stateRing = open
    ? "border-[#C5A059] ring-2 ring-[#C5A059]/15"
    : "hover:border-[#C5A059]/60 focus-visible:border-[#C5A059] focus-visible:ring-2 focus-visible:ring-[#C5A059]/15";

  return (
    <div
      ref={rootRef}
      className={`relative min-w-0 ${variant === "inline" ? "w-full sm:w-auto" : ""} ${className}`}
    >
      {variant === "field" ? (
        <button
          ref={triggerRef}
          type="button"
          aria-haspopup="listbox"
          aria-expanded={open}
          aria-controls={open ? listId : undefined}
          onClick={onTriggerClick}
          onKeyDown={onKeyDown}
          className={`${fieldBox} w-full cursor-pointer text-left focus:outline-none ${stateRing}`}
        >
          <span className={labelCls}>
            {icon}
            {label}
          </span>
          <span className="mt-1.5 flex items-center justify-between gap-2">
            <span className="truncate text-[13px] font-semibold text-[#141A22] sm:text-sm">{selected?.label}</span>
            <ChevronDown
              className={`size-4 shrink-0 text-[#C5A059] transition-transform duration-200 ${open ? "rotate-180" : ""}`}
            />
          </span>
        </button>
      ) : (
        <button
          ref={triggerRef}
          type="button"
          aria-haspopup="listbox"
          aria-expanded={open}
          aria-controls={open ? listId : undefined}
          onClick={onTriggerClick}
          onKeyDown={onKeyDown}
          className={`flex w-full cursor-pointer items-center justify-between gap-4 rounded-xl border border-[#E8E2D5] bg-[#FAF8F5] px-3.5 py-2.5 text-left transition-colors focus:outline-none sm:w-auto sm:py-2 ${stateRing}`}
        >
          <span className={labelCls}>
            {icon}
            {label}
          </span>
          <span className="flex items-center gap-1.5 text-xs font-semibold text-[#141A22]">
            {selected?.label}
            <ChevronDown
              className={`size-4 shrink-0 text-[#C5A059] transition-transform duration-200 ${open ? "rotate-180" : ""}`}
            />
          </span>
        </button>
      )}

      {open && (
        <ul
          ref={listRef}
          id={listId}
          role="listbox"
          aria-label={label}
          className={`absolute z-40 max-h-64 w-max min-w-full max-w-[calc(100vw-2rem)] overflow-y-auto rounded-xl border border-[#E8E2D5] bg-white p-1.5 shadow-[0_18px_40px_-12px_rgba(15,30,54,0.28)] animate-in fade-in duration-150 ${
            openUp ? "bottom-full mb-1.5" : "top-full mt-1.5"
          } ${alignRight ? "right-0" : "left-0"}`}
        >
          {options.map((opt, i) => {
            const isSelected = i === selectedIndex;
            const isActive = i === active;
            return (
              <li
                key={opt.value}
                role="option"
                aria-selected={isSelected}
                onMouseEnter={() => setActive(i)}
                onMouseDown={(e) => e.preventDefault()}
                onClick={() => choose(i)}
                className={`flex cursor-pointer items-center justify-between gap-3 rounded-lg px-3 py-2.5 text-[13px] transition-colors sm:text-sm ${
                  isSelected ? "font-bold text-[#0F1E36]" : "font-medium text-[#485363]"
                } ${isActive ? "bg-[#F3EFE6]" : isSelected ? "bg-[#FAF8F5]" : ""}`}
              >
                <span>{opt.label}</span>
                {isSelected && <Check className="size-4 shrink-0 text-[#C5A059]" />}
              </li>
            );
          })}
        </ul>
      )}
    </div>
  );
}

/* ------------------------------------------------------------------ */

interface DateFieldProps {
  label: string;
  value: string;
  onChange: (val: string) => void;
  className?: string;
}

export function DateField({ label, value, onChange, className = "" }: DateFieldProps) {
  return (
    <label className={`${fieldBox} ${className}`}>
      <span className={labelCls}>{label}</span>
      <input
        type="date"
        value={value}
        onChange={(e) => onChange(e.target.value)}
        className={`${controlCls} min-h-[20px] cursor-pointer appearance-none text-left`}
      />
    </label>
  );
}

/* Secondary row (filters + sort). 2 columns on mobile, 3 on larger screens,
   so nothing ever wraps unevenly. Give the last child
   className="col-span-2 sm:col-span-1" for a full-width sort on mobile. */
export function FilterBar({ children }: { children: React.ReactNode }) {
  return (
    <div className="space-y-2.5 border-t border-[#E8E2D5]/70 pt-3.5">
      <div className="flex items-center gap-1.5 text-[10px] font-bold uppercase tracking-[0.14em] text-[#9E7D3B]">
        <SlidersHorizontal className="size-3.5" />
        <span>Refine &amp; Sort</span>
      </div>
      <div className="grid grid-cols-2 gap-2.5 sm:grid-cols-3">{children}</div>
    </div>
  );
}