import styled, { keyframes } from "styled-components";
import { motion } from "framer-motion";

interface GalleryItemProps {
  isWhite: boolean;
  "data-index"?: string;
}

interface GalleryData {
  title: string;
  number: string;
  content: string;
}

const boxAnimation = keyframes`
  0% {
		animation-timing-function: ease-in;
		opacity: 0;
		transform: translateY(-250px);
	}

	38% {
		animation-timing-function: ease-out;
		opacity: 1;
		transform: translateY(0);
	}

	55% {
		animation-timing-function: ease-in;
		transform: translateY(-65px);
	}

	72% {
		animation-timing-function: ease-out;
		transform: translateY(0);
	}

	81% {
		animation-timing-function: ease-in;
		transform: translateY(-28px);
	}

	90% {
		animation-timing-function: ease-out;
		transform: translateY(0);
	}

	95% {
		animation-timing-function: ease-in;
		transform: translateY(-8px);
	}

	100% {
		animation-timing-function: ease-out;
		transform: translateY(0);
	}
`;


const headerAnimation = keyframes`
  0% {
letter-spacing: 12rem
	}

	100% {
	letter-spacing: 6rem

	}`
const GalleryWrapper = styled.section`
  display: flex;
  justify-content: center;
  align-items: center;
  padding: 4rem;
  text-align: center;
  background: linear-gradient(to bottom,#0f1827,#3a4965, #03050b);
  background-repeat: no-repeat;
  background-position: center;
  background-size: cover;
  height: 100%;
  width: 100%;
  flex-direction: column;
`;

// border: 1px solid rgba(255, 255, 255, 0.56);
const GalleryContainer = styled.div`
  padding: 2rem;
  backdrop-filter: blur(4px);
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  gap: 2rem;
  height: 30rem;
  align-items: center;
`;



const GalleryItem = styled(motion.div) <GalleryItemProps>`
  position: relative;
  padding: 2rem;
  border-radius: 0.2rem;
  height: 15rem;
  display: flex;
  flex-direction: column;
  justify-content: space-around;
  transition: all 0.6s cubic-bezier(0.16, 1, 0.3, 1);
  border: 1px solid ${(props) => (props.isWhite ? "#000000" : "#ffffff")};
  background: ${(props) => (props.isWhite ? "#ffffff" : "#000000")};
  box-shadow: 0 0 0 transparent;
  cursor: pointer;
  animation: ${boxAnimation} 2s ease 0s 1 normal forwards;

   -webkit-box-reflect: below 1rem
    linear-gradient(to top, rgba(255, 255, 255, 0.4), transparent 20%);


  &::after {
    content: "";
    position: absolute;
    bottom: 0rem;
    left: 50%;
    transform: translateX(-50%);
    width: 10%;
    height: 4px;
      transition: all 0.6s cubic-bezier(0.16, 1, 0.3, 1);

    background-color: ${(props) => (props.isWhite ? "#000000" : "#ffffff")};
    opacity: 0.6;
    border-radius: 1px;
    transition: all 0.6s cubic-bezier(0.16, 1, 0.3, 1);
  }

  &:hover {
    height: 25rem;
    transform: translateY(-5px);
    box-shadow: 0 20px 40px rgba(0, 0, 0, 0.2);

    &::after {
      width: 50%;
      opacity: 0.9;
    }

    &::before {
     font-size: 30rem;
    }
  }

  &::before {
    content: "${(props) => props["data-index"]}";
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    font-size: 22rem;
    font-weight: 900;
      transition: all 0.6s cubic-bezier(0.16, 1, 0.3, 1);
    color: ${(props) => (props.isWhite ? "#bdbdbd28" : "#ffffff18")};
    pointer-events: none;
    z-index: 0;
    user-select: none;
    white-space: nowrap;
}

`;

const Title = styled.h3<GalleryItemProps>`
  font-size: 1.5rem;
  font-weight: 500;
  letter-spacing: 1rem;
  color: ${(props) => (props.isWhite ? "#000000" : "#ffffff")};
  transition: transform 0.6s cubic-bezier(0.16, 1, 0.3, 1);
  font-weight: 600;

  ${GalleryItem}:hover & {
    transform: translateY(-5px);
  }
    z-index:1;
`;

// const Number = styled.span<GalleryItemProps>`
//   font-size: 0.875rem;
//   font-weight: 600;
//   color: ${(props) => (props.isWhite ? "#000000" : "#ffffff")};
//   display: block;
//   margin-top: 0.5rem;
//   transition: all 0.6s cubic-bezier(0.16, 1, 0.3, 1);
//     z-index:1;

//   ${GalleryItem}:hover & {
//     transform: translateY(-5px);
//     letter-spacing: 0.2rem;
//   }
// `;

const Subtitle = styled.p`
  color: #ffaa33;
  text-decoration: none;
  letter-spacing: 6rem;
  padding-left: 6rem;
  line-height: 2rem;
  font-weight: 900;
  font-size: 3rem;
  margin-bottom: 8rem;
  text-transform: uppercase;
  animation: ${headerAnimation} 2s ease 0s 1 normal forwards;
    z-index:1;

  `;
// -webkit-box-reflect: below 0px
//   linear-gradient(to top, rgba(255, 255, 255, 0.4), transparent 80%);


const Content = styled.span<GalleryItemProps>`
  font-size: 1rem;
  letter-spacing: 0.2rem;
  font-weight: 600;
  line-height: 1.5;
  color: ${(props) => (props.isWhite ? "#000000" : "#ffffff")};
  display: block;
  margin-top: 0.5rem;
  transition: all 0.6s cubic-bezier(0.16, 1, 0.3, 1);
  display: none;

  ${GalleryItem}:hover & {
    opacity: 1;
    transform: scale(1) translateY(-10px);
    display: block;
  }
`;

const Line = styled.span<{ isWhite: boolean }>`
  position: absolute;
  width: 100%;
  height: 3rem;
  background: ${(props) => (props.isWhite ? "#ffffff" : "#000000")};
  left: 0;
top: 50%;
transform: translateY(-50%);


`;

const galleries: GalleryData[] = [
  {
    title: "Resume.io",
    number: "1",
    content:
      "Built ATS-friendly resume templates with responsive design. Improved parsing accuracy and customization for cross-platform use.",
  },
  {
    title: "Gulf-HR",
    number: "2",
    content:
      "Developed modular HRMS features like onboarding, payroll, and dynamic form generation tailored to user needs.",
  },
  {
    title: "Twilio Segment",
    number: "3",
    content:
      "Engineered a fraud detection and validation system. Reduced manual effort by 40% and ensured better compliance.",
  },
  {
    title: "SHS Homeopathy",
    number: "4",
    content:
      "Built an Electron app for medical records. Improved search by 30% and reduced DB size by 50% through optimization.",
  },
  // {
  //   title: "AI Interview System",
  //   number: "05",
  //   content:
  //     "AI-powered platform with real-time analytics, object detection, and interview recording. Provides smart candidate feedback.",
  // },
  // {
  //   title: "Quiz Reminder App",
  //   number: "06",
  //   content:
  //     "Created a quiz & notification app tailored to user learning styles. Boosted engagement and retention through personalization.",
  // },
  // {
  //   title: "Gamers Box",
  //   number: "07",
  //   content:
  //     "Built a real-time gaming news platform with personalized feeds. Focused on responsive UI and integrated complex APIs.",
  // },
  // {
  //   title: "WhatsApp Clone",
  //   number: "08",
  //   content:
  //     "Real-time secure messaging app with group chats, media sharing, offline sync, and E2E encryption.",
  // },
];

export default function Gallery() {
  return (
    <GalleryWrapper>
      <Subtitle>
        Projects
      </Subtitle>
      <GalleryContainer>

        {galleries.map((g, i) => (
          <GalleryItem
            key={i}
            isWhite={i % 2 === 0}
            data-index={g.number}
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: i * 0.2, duration: 0.8, ease: "easeOut" }}
          >
            <Line isWhite={i % 2 === 0}></Line>
            <Title isWhite={i % 2 === 0}>{g.title}</Title>
            {/* <Number isWhite={i % 2 === 0}>{g.number}</Number> */}
            <Content isWhite={i % 2 === 0}>{g.content}</Content>
          </GalleryItem>
        ))}
      </GalleryContainer>
    </GalleryWrapper>
  );
}
