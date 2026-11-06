"use client";

import { useMemo, useState } from "react";
import type { SlotDay } from "./chat-api";
import { CHAT_COPY } from "./chat-copy";
import { Arrowhead, BoxedArrow } from "./icons";
import styles from "./chatbot.module.css";

const DAYS_PER_VIEW = 2;

/**
 * The meeting picker the assistant asks for (`{schedule_meeting = True}`),
 * laid out as softsuave.com's widget lays it out: a month header (with arrows
 * once the slots span months), two days at a time with arrows to page through,
 * that day's times in a three-column grid (two on narrow screens), and "Skip
 * for now". Times are the visitor's own (see `groupSlots`).
 *
 * `active` is false once a time was picked or the booking cancelled: the
 * picker stays in the thread, dimmed and inert, as it does on the live site.
 */
export default function SlotPicker({
  days,
  active,
  onPick,
  onSkip,
}: {
  days: readonly SlotDay[];
  active: boolean;
  onPick: (date: string, time: string) => void;
  onSkip: () => void;
}) {
  const months = useMemo(() => {
    const grouped = new Map<string, SlotDay[]>();
    for (const day of days) {
      if (!day.times.length) continue;
      grouped.set(day.monthYear, [...(grouped.get(day.monthYear) ?? []), day]);
    }
    return [...grouped.entries()];
  }, [days]);

  const [monthIndex, setMonthIndex] = useState(0);
  const [dayStart, setDayStart] = useState(0);
  const [selected, setSelected] = useState<string | null>(null);

  if (!months.length) return <p className={styles.slotEmpty}>{CHAT_COPY.slotsUnavailable}</p>;

  const [monthLabel, monthDays] = months[Math.min(monthIndex, months.length - 1)];
  const visible = monthDays.slice(dayStart, dayStart + DAYS_PER_VIEW);
  const selectedDay = monthDays.find((d) => d.date === selected) ?? visible[0];
  const disabled = !active;

  const goMonth = (step: number) => {
    setMonthIndex((i) => i + step);
    setDayStart(0);
    setSelected(months[monthIndex + step]?.[1][0]?.date ?? null);
  };
  const goDays = (step: number) => {
    const next = dayStart + step * DAYS_PER_VIEW;
    setDayStart(next);
    setSelected(monthDays[next]?.date ?? null);
  };
  const hasPrevDays = dayStart > 0;
  const hasNextDays = dayStart + DAYS_PER_VIEW < monthDays.length;

  return (
    <div
      className={`${styles.slotPicker} ${active ? "" : styles.slotPickerDone}`}
      aria-disabled={disabled || undefined}
      data-slot-active={active || undefined}
    >
      <div className={styles.monthHeader}>
        {months.length > 1 ? (
          <>
            <button
              type="button"
              className={styles.slotArrow}
              onClick={() => goMonth(-1)}
              disabled={disabled || monthIndex === 0}
              aria-label="Previous month"
            >
              <BoxedArrow dir="left" />
            </button>
            <span className={styles.monthLabel}>{monthLabel}</span>
            <button
              type="button"
              className={styles.slotArrow}
              onClick={() => goMonth(1)}
              disabled={disabled || monthIndex >= months.length - 1}
              aria-label="Next month"
            >
              <BoxedArrow dir="right" />
            </button>
          </>
        ) : (
          <span className={styles.monthLabel}>{monthLabel}</span>
        )}
      </div>

      <div className={styles.dayRow}>
        <button type="button" className={styles.slotArrow} onClick={() => goDays(-1)} disabled={disabled || !hasPrevDays} aria-label="Earlier days">
          <Arrowhead dir="left" />
        </button>
        <div className={styles.dayList}>
          {visible.map((day) => {
            const isSelected = day.date === selectedDay?.date;
            return (
              <button
                key={day.date}
                type="button"
                className={`${styles.dayChip} ${isSelected ? styles.dayChipSelected : ""}`}
                onClick={() => setSelected(day.date)}
                disabled={disabled}
                aria-pressed={isSelected}
              >
                <span className={styles.dayName}>{day.day}</span>
                <span className={styles.dayNumber}>{day.dateNumber}</span>
              </button>
            );
          })}
        </div>
        <button type="button" className={styles.slotArrow} onClick={() => goDays(1)} disabled={disabled || !hasNextDays} aria-label="Later days">
          <Arrowhead dir="right" />
        </button>
      </div>

      {/* `data-lenis-prevent`: the page's smooth scroll would otherwise take the wheel. */}
      <div className={styles.timeGrid} role="group" aria-label={`Times on ${selectedDay?.day} ${selectedDay?.dateNumber}`} data-lenis-prevent>
        {selectedDay?.times.map((time) => (
          <button
            key={time}
            type="button"
            className={styles.timeSlot}
            data-slot-time
            onClick={() => onPick(selectedDay.date, time)}
            disabled={disabled}
          >
            {time}
          </button>
        ))}
      </div>

      <div className={styles.slotFoot}>
        <button type="button" className={styles.chip} onClick={onSkip} disabled={disabled}>
          {CHAT_COPY.skipForNow}
        </button>
      </div>
    </div>
  );
}
