import React, { useContext } from 'react';

import TokenGenerator from 'uuid-token-generator';

import { CalendarContext } from '../../Providers/CalendarContext';
import { ReactComponent as RightChevron } from '../../assets/img/keyboard_arrow_right.svg';
import { ReactComponent as LeftChevron } from '../../assets/img/keyboard_arrow_left.svg';
import { ReactComponent as Crop } from '../../assets/img/crop.svg';
import CalendarDay from '../CalendarDay';
import ActionButton from '../../Atoms/ActionButton';

import styles from './Calendar.module.scss';

const tokgen = new TokenGenerator();

const Calendar = () => {
  const [calendarState, calendarActions] = useContext(CalendarContext);

  const getMonthYearLabel = (s) => (
    <div>
      <h1 className={styles.header__date}>
        <span>{s.month}</span>
        {' '}
        {s.year}
      </h1>
    </div>
  );

  console.log('STATE', calendarState);
  console.log('ACTIONS', calendarActions);

  return (
    <div className={styles.calendar}>
      <div className={styles.header}>
        <>{getMonthYearLabel(calendarState)}</>
        <div className={styles.header__calendarActions}>
          <ActionButton onClick={() => calendarActions.getPrevMonth()}>
            <LeftChevron />
          </ActionButton>
          <ActionButton onClick={() => calendarActions.setDate(new Date())}>
            <Crop />
          </ActionButton>
          <ActionButton onClick={() => calendarActions.getNextMonth()}>
            <RightChevron />
          </ActionButton>
        </div>
      </div>
      <div className={styles.week}>
        {calendarState.days.map((day) => (
          <div className={styles.week__day} key={day}>
            {day}
          </div>
        ))}
      </div>
      <div className={styles.days}>
        {calendarState.weeks.map((week) => week.map((day) => <CalendarDay day={day} key={tokgen.generate()} />))}
      </div>
    </div>
  );
};

export default Calendar;
