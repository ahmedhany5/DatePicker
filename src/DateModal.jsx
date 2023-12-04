import {
  addMonths,
  eachDayOfInterval,
  endOfMonth,
  endOfWeek,
  format,
  isToday,
  startOfMonth,
  startOfWeek,
  isSameMonth,
  isSameDay,
} from "date-fns";
import { useState } from "react";

export default function DateModal() {
  const [date, setDate] = useState(null || new Date());
  const [isOpen, setOpen] = useState(false);

  const dates = eachDayOfInterval({
    start: startOfWeek(startOfMonth(date)),
    end: endOfWeek(endOfMonth(date)),
  });
  return (
    <div>
      <button
        className="date-picker-button"
        onClick={() => setOpen((open) => !open)}
      >
        {isOpen == false ? "Select a date" : format(date, "MM do yyyy")}
      </button>

      {isOpen ? (
        <div className="date-picker">
          <div className="date-picker-header">
            <button
              className="prev-month-button month-button"
              onClick={() => setDate((c) => addMonths(c, -1))}
            >
              &larr;
            </button>
            <div className="current-month">{format(date, "MMM - yyyy")}</div>
            <button
              className="next-month-button month-button"
              onClick={() => setDate((c) => addMonths(c, 1))}
            >
              &rarr;
            </button>
          </div>
          <div className="date-picker-grid-header date-picker-grid">
            <div>Sun</div>
            <div>Mon</div>
            <div>Tue</div>
            <div>Wed</div>
            <div>Thu</div>
            <div>Fri</div>
            <div>Sat</div>
          </div>
          <div className="date-picker-grid-dates date-picker-grid">
            {dates.map((d, i) => (
              <button
                className={`${
                  !isSameMonth(d, date) && "date-picker-other-month-date"
                } date ${isToday(d) && "today"} ${
                  isSameDay(d, date) && "selected"
                }`}
                key={i}
                onClick={() => setDate(d)}
              >
                {d.getDate()}
              </button>
            ))}
          </div>
        </div>
      ) : (
        ""
      )}
    </div>
  );
}
