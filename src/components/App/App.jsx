import { Component } from "react";
import { useState } from "react";

import Section from "../Feedback/Section/Section";
import Statistics from "../Feedback/Statistics/Statistics";
import FeedbackOptions from "../Feedback/FeedbackOptions/FeedbackOptions";
import Notification from "../Feedback/Notification/Notification";
import { Container } from "./App.styled";

     
export default function App() {

  const [good, setGood] = useState(0);
  const [neutral, setNeutral] = useState(0);
  const [bad, setBad] = useState(0);

  const options = ['good', 'neutral', 'bad'];

  const onLeaveFeedback = (event) => {
    let option = event.currentTarget.id;
    
    switch (option) {
      case 'good':
        setGood(prevState => prevState + 1);
        break;
      
      case 'neutral':
        setNeutral(prevState => prevState + 1);
        break;
      
      case 'bad':
        setBad(prevState => prevState + 1);
        break;
      
      default:
        return;         
    }
  }

  function countTotalFeedback() {
    const total = good + neutral + bad; 
    return total; 
  }

  function countPositivePercentage(total) {
    return Math.round(good * 100 / total) || 0;     
  }

  const totalFeedbacks = countTotalFeedback();
  const positiveFeedbacks = countPositivePercentage(totalFeedbacks);
  
  return (
      <Container>           
        <Section title="Please Leave Feedback">
          <FeedbackOptions
            options={options}
            onLeaveFeedback={onLeaveFeedback}
          />            
        </Section> 
        <Section title="Statistics">
          {totalFeedbacks > 0 ? (
            <Statistics
              total={totalFeedbacks}
              good={good}
              neutral={neutral}
              bad={bad}
              percentage={positiveFeedbacks}
            />) :
            (<Notification message="There is no feedback" />)
          }          
        </Section>  
      </Container>
    )
}


