import {
  SectionContainer,
  ImageContainer,
  SectionContent,
  LeftPanel,
  RightPanel,
  Title,
  Description,
  ShowButton,
  QuizImageContainer,
  QuizImage,
  QuizText,
  QuoteText,
  QuizGuide,
  DownArrow,
} from "./QuizSection.styled";
import sectionBackground from "../assets/section-bg.png";


const QuizSection = () => {
  return (
    <SectionContainer>
      {/* Image Section */}
      <ImageContainer>
        <img
          src={sectionBackground} // Replace with the actual image URL
          alt="Section Header"
        />
      </ImageContainer>

      {/* Section Content */}
      <SectionContent>
        <LeftPanel>
          <Title>Discover Interactive Quizzes</Title>
          <Description>
            Dive into an engaging learning experience with quizzes that are fun,
            challenging, and educational. With our carefully curated questions,
            you can explore a range of topics designed to enhance your knowledge
            and skills.
            <br />
            <br />
            Take the challenge to learn interactively and track your progress as
            you master topics, one step at a time.
          </Description>
          <ShowButton>Show All Topics</ShowButton>
        </LeftPanel>

        <RightPanel>
          <QuizImageContainer>
            <QuizImage src="https://via.placeholder.com/300" alt="Quiz Image" />
            <QuizText>
              <QuoteText>
                "Join us on a journey of interactive learning. Every quiz is an
                opportunity to challenge yourself and grow."
              </QuoteText>
              <QuizGuide>
                <strong>Richard Zong</strong>
                <br />
                Quiz App Guide
              </QuizGuide>
            </QuizText>
          </QuizImageContainer>
        </RightPanel>
      </SectionContent>

      <DownArrow>↓</DownArrow>
    </SectionContainer>
  );
};

export default QuizSection;
