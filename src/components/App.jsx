import { useState } from 'react';
import { Statistics } from './Statistics/Statistics';
import { FeedbackOptions } from './FeedbackOptions/FeedbackOptions';
import { Section } from './Section/Section';
import { Notification } from './Notification/Notification';
import { Container } from './App.styled';

export const App = () => {
  const [good, setGood] = useState(0);
  const [neutral, setNeutral] = useState(0);
  const [bad, setBad] = useState(0);

  const onButtonClick = mark => {
    switch (mark) {
      case 'good':
        setGood(prev => prev + 1);
        break;
      case 'neutral':
        setNeutral(prev => prev + 1);
        break;
      case 'bad':
        setBad(prev => prev + 1);
        break;
      default:
        return;
    }
  };

  let total = good + neutral + bad;

  const mark = { good, neutral, bad };

  const positivePercentageCalc = () => {
    return Math.round((good / total) * 100) || 0;
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
            good={good}
            neutral={neutral}
            bad={bad}
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
