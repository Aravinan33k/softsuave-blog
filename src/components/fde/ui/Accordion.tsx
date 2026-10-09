"use client";

import { useId, useState, type ReactNode } from "react";
import { ChevronDownIcon } from "@/components/fde/ui/Icons";
import { cn } from "@/lib/fde/utils";

export type AccordionEntry = {
  id: string;
  trigger: ReactNode;
  content: ReactNode;
};

type AccordionProps = {
  items: AccordionEntry[];
  /** Allow several panels open at once. Defaults to one-at-a-time. */
  allowMultiple?: boolean;
  /** `id` of the entry expanded on first render. Omit to start all closed. */
  defaultOpenId?: string;
  className?: string;
};

export function Accordion({
  items,
  allowMultiple = false,
  defaultOpenId,
  className,
}: AccordionProps) {
  const baseId = useId();
  const [openIds, setOpenIds] = useState<string[]>(
    defaultOpenId ? [defaultOpenId] : [],
  );

  const toggle = (id: string) => {
    setOpenIds((current) => {
      const isOpen = current.includes(id);
      if (allowMultiple) {
        return isOpen ? current.filter((item) => item !== id) : [...current, id];
      }
      return isOpen ? [] : [id];
    });
  };

  return (
    <div className={cn("space-y-3.5", className)}>
      {items.map((item) => {
        const isOpen = openIds.includes(item.id);
        const triggerId = `${baseId}-trigger-${item.id}`;
        const panelId = `${baseId}-panel-${item.id}`;

        return (
          <div
            key={item.id}
            className={cn(
              "overflow-hidden rounded-[0.75rem] border bg-background transition-colors duration-200",
              isOpen
                ? "border-primary/25 shadow-[0_6px_20px_-12px_hsl(220_15%_8%/0.18)]"
                : "border-border shadow-[0_1px_2px_0_hsl(220_15%_8%/0.04)] hover:border-border/60",
            )}
          >
            <h3>
              <button
                type="button"
                id={triggerId}
                aria-expanded={isOpen}
                aria-controls={panelId}
                onClick={() => toggle(item.id)}
                className="flex w-full items-center justify-between gap-6 px-6 py-5 text-left"
              >
                <span className="text-[0.95rem] font-medium leading-snug text-foreground sm:text-base">
                  {item.trigger}
                </span>
                <ChevronDownIcon
                  aria-hidden
                  className={cn(
                    "h-4 w-4 shrink-0 text-muted-foreground transition-transform duration-300",
                    isOpen && "rotate-180 text-primary",
                  )}
                />
              </button>
            </h3>

            {/* Animating grid-template-rows lets the panel ease open to its
                natural height without hard-coding a max-height. */}
            <div
              id={panelId}
              role="region"
              aria-labelledby={triggerId}
              // `inert` keeps collapsed copy out of the a11y tree and out of
              // tab order without `display:none`, which would kill the ease.
              inert={!isOpen}
              className={cn(
                "grid transition-[grid-template-rows] duration-300 ease-out",
                isOpen ? "grid-rows-[1fr]" : "grid-rows-[0fr]",
              )}
            >
              <div className="overflow-hidden">
                <div className="px-6 pb-5 text-[0.925rem] leading-[1.7] text-muted-foreground">
                  {item.content}
                </div>
              </div>
            </div>
          </div>
        );
      })}
    </div>
  );
}
