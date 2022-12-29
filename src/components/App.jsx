import { useState } from 'react';
import { Statistics } from './Statistics/Statistics';
import { FeedbackOptions } from './FeedbackOptions/FeedbackOptions';
import { Section } from './Section/Section';
import { Notification } from './Notification/Notification';
import { Container } from './App.styled';

export const App = () => {
  const [mark, setMark] = useState({
    good: 0,
    neutral: 0,
    bad: 0,
  });

  const onButtonClick = mark => {
    setMark(prevState => {
      return {
        ...prevState,
        [mark]: prevState[mark] + 1,
      };
    });
  };

  const totalValCalc = () => {
    return Object.values(mark).reduce((value, acc) => acc + value, 0);
  };
  let total = totalValCalc();

  const positivePercentageCalc = () => {
    return Math.round((mark.good / total) * 100) || 0;
  };
  let positivePercentage = positivePercentageCalc();

  return (
    <Container>
      <h1>Cafe Expresso</h1>
      <Section title="Please leave a feedback">
        <FeedbackOptions
          options={Object.keys(mark)}
          onLeaveFeedback={onButtonClick}
        />
      </Section>

      <Section title="Statitics">
        {total ? (
          <Statistics
            good={mark.good}
            neutral={mark.neutral}
            bad={mark.bad}
            total={total}
            positivePercentage={positivePercentage}
          />
        ) : (
          <Notification message="There is no feedback" />
        )}
      </Section>
    </Container>
  );
};
