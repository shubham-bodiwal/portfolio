import {
  SectionContainer,
  LeftPanel,
  RightPanel,
  ProgressDetails,
  NavButtons,
  QuizStats,
  Description,
  ImagesContainer,
  Image,
  Title,
} from "./QuizLearningSection.styled";

const QuizLearningSection = () => {
  return (
    <SectionContainer>
      <LeftPanel>
        <ProgressDetails>
          <p>Quiz 04 / 12</p>
          <h2>Understanding Basics of React</h2>
          <p>Learning Objective: State Management</p>
        </ProgressDetails>
        <NavButtons>
          <button>&larr;</button>
          <button>&rarr;</button>
        </NavButtons>
        <QuizStats>
          <div className="stat">
            <span className="dot"></span>
            <p>Current Score: 8/10</p>
          </div>
          <div className="stat">
            <span className="dot"></span>
            <p>Time Spent: 12 mins</p>
          </div>
        </QuizStats>
      </LeftPanel>
      <RightPanel>
        <Title>Enhance Your Learning Curve</Title>
        <Description>
          Dive deeper into concepts with our interactive quizzes designed to
          solidify your understanding. Each question is curated to reinforce
          your knowledge and push your learning boundaries.
          <br />
          <br />
          Track your progress, identify areas for improvement, and gain the
          confidence needed to excel in your learning journey.
        </Description>
        <ImagesContainer>
          <Image
            src="https://via.placeholder.com/150" // Replace with actual image
            alt="Quiz Insight 1"
          />
          <Image
            src="https://via.placeholder.com/150" // Replace with actual image
            alt="Quiz Insight 2"
          />
        </ImagesContainer>
      </RightPanel>
    </SectionContainer>
  );
};

export default QuizLearningSection;
