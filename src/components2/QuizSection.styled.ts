import styled from "styled-components";

export const SectionContainer = styled.section`
  display: flex;
  flex-direction: column;
  align-items: center;
  background-color: #292528;
  color: white;
  position: relative;
`;

export const ImageContainer = styled.div`
  width: 100%;
  height: auto;

  img {
    width: 100%;
    height: auto;
    object-fit: cover;
  }
`;

export const SectionContent = styled.div`
  padding: 50px;
  display: flex;
  flex-direction: column;
  align-items: center;
`;

export const LeftPanel = styled.div`
  text-align: center;
  max-width: 600px;
  margin-bottom: 30px;
`;

export const Title = styled.h1`
  font-size: 2.5rem;
  margin-bottom: 20px;
`;

export const Description = styled.p`
  line-height: 1.5;
  font-size: 1rem;
  margin-bottom: 30px;
  color: #b0b0b0;
`;

export const ShowButton = styled.button`
  padding: 10px 20px;
  background: white;
  color: black;
  border: none;
  border-radius: 50px;
  cursor: pointer;
  font-size: 1rem;

  &:hover {
    background: #f0f0f0;
  }
`;

export const RightPanel = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  margin-top: 20px;
`;

export const QuizImageContainer = styled.div`
  position: relative;
  display: flex;
  flex-direction: row;
  align-items: center;
`;

export const QuizImage = styled.img`
  width: 300px;
  height: auto;
  border-radius: 15px;
`;

export const QuizText = styled.div`
  max-width: 300px;
  background: rgba(0, 0, 0, 0.5);
  padding: 20px;
  margin-left: 20px;
  border-radius: 15px;
`;

export const QuoteText = styled.p`
  font-style: italic;
  font-size: 1rem;
  margin-bottom: 20px;
  color: #e0e0e0;
`;

export const QuizGuide = styled.div`
  font-size: 0.9rem;
  color: #b0b0b0;
`;

export const DownArrow = styled.div`
  font-size: 2rem;
  margin-top: 30px;
  color: #b0b0b0;
`;
