import styled from "styled-components";


export const SectionContainer = styled.section`
  display: flex;
  flex-wrap: wrap;
  justify-content: space-between;
  align-items: center;
  padding: 50px;
  background: linear-gradient(to bottom, #050b11 60%, #0c0e16 100%);
  color: white;
  position: relative;
  height: 70vh;
`;


export const LeftPanel = styled.div`
  width: 40%;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
`;

export const ProgressDetails = styled.div`
  font-size: 1rem;

  h2 {
    font-size: 2rem;
    margin: 10px 0;
  }

  p {
    margin: 5px 0;
    color: #b0b0b0;
  }
`;

export const NavButtons = styled.div`
  margin-top: 20px;
  display: flex;
  gap: 10px;

  button {
    background: none;
    border: 1px solid white;
    color: white;
    padding: 5px 10px;
    cursor: pointer;
    font-size: 1rem;

    &:hover {
      background: white;
      color: #060f16;
    }
  }
`;

export const QuizStats = styled.div`
  margin-top: 40px;

  .stat {
    display: flex;
    align-items: center;
    gap: 10px;

    .dot {
      width: 10px;
      height: 10px;
      background: #526d84;
      border-radius: 50%;
    }

    p {
      color: #b0b0b0;
    }
  }
`;

export const RightPanel = styled.div`
  width: 55%;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
`;

export const Title = styled.h2`
  font-size: 2rem;
  margin-bottom: 20px;
`;

export const Description = styled.p`
  line-height: 1.5;
  color: #b0b0b0;
`;

export const ImagesContainer = styled.div`
  display: flex;
  gap: 20px;
  margin-top: 30px;
`;

export const Image = styled.img`
  width: 150px;
  height: 150px;
  border-radius: 10px;
  object-fit: cover;
`;
