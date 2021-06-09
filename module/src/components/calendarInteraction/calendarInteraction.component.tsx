import * as React from 'react';

import { Calendar } from '../..';
import { Dates } from '../../utils/dates';
import { CalendarView } from '../calendarVIew/calendarView.component';

export interface ICalendarInteractionProps extends Calendar.IConfig {
  /**
   * (number) An optional "day of the week" index to be the first day of the week.
   * - By default, weeks will start on Sunday (index 0)
   * - Indexes range from Sunday = 0 to Saturday = 6
   */
  weekdayStartIndex?: number;
  /**
   * ((date: Date, dateString: string) => void) An optional function to call when a date is clicked.
   * @param date The date object of the date that has been clicked.
   * @param dateString A formatted string representation of the date that has been clicked (will use the `formatString` prop if passed, or fall back to strict ISO.)
   */
  onDateClicked?: (date: Date, dateString: string) => void;
}

export const CalendarInteraction = React.forwardRef<HTMLDivElement, ICalendarInteractionProps>(
  ({ selectedDate, min, max, weekdayStartIndex, formatString, onDateClicked, locale, rangeTo, highlights }, ref) => {
    const { days, months, years, monthYearFormProp, stepMonth } = Calendar.use({
      formatString,
      min,
      highlights,
      locale,
      max,
      rangeTo,
      selectedDate,
    });

    // Click event listeners
    const onBackClicked = React.useCallback(() => {
      stepMonth('back');
    }, [stepMonth]);

    const onForwardClicked = React.useCallback(() => {
      stepMonth('forward');
    }, [stepMonth]);

    const onDayClicked = React.useCallback(
      (day: Calendar.IDay) => {
        onDateClicked?.(day.date, Dates.dateToString(day.date, formatString, locale));
      },
      [onDateClicked, formatString, locale]
    );

    return (
      <CalendarView
        ref={ref}
        days={days}
        months={months}
        years={years}
        currentMonthBinding={monthYearFormProp('viewingMonth').bind()}
        currentYearBinding={monthYearFormProp('viewingYear').bind()}
        weekdayStartIndex={weekdayStartIndex!}
        locale={locale}
        onBackClicked={onBackClicked}
        onForwardClicked={onForwardClicked}
        onDayClicked={onDayClicked}
      />
    );
  }
);

CalendarInteraction.defaultProps = {
  selectedDate: new Date(),
  weekdayStartIndex: 0,
};
