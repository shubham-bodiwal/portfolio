import styled from "styled-components";
import vectorBg from "../assets/Vector.svg";

interface GalleryItemProps {
  isWhite: boolean;
}

interface GalleryData {
  title: string;
  number: string;
  image: string;
}

const GalleryWrapper = styled.section`
  display: flex;
  justify-content: center;
  align-items: center;
  padding: 4rem;
  text-align: center;
  background: url(${vectorBg});
  background-repeat: no-repeat;
  background-position: center;
  background-size: cover;
  height: 100%;
  width: 100%;
`;

const GalleryContainer = styled.div`
  padding: 2rem;
  border: 1px solid #e0e0e0;
  backdrop-filter: blur(4px);
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  gap: 2rem;
  height: 30rem;
  align-items: center;
`;

const GalleryItem = styled.div<GalleryItemProps>`
  position: relative;
  padding: 2rem;
  border-radius: 0.2rem;
  height: 15rem;
  display: flex;
  flex-direction: column;
  justify-content: space-around;
  transition: all 0.6s cubic-bezier(0.16, 1, 0.3, 1);
  border: 1px solid ${props => props.isWhite ? '#000000' : '#ffffff'};
  background: ${props => props.isWhite ? '#ffffff' : '#000000'};

  &::after {
    content: "";
    position: absolute;
    bottom: 0rem;
    left: 50%;
    transform: translateX(-50%);
    width: 10%;
    height: 3px;
    background-color: ${props => props.isWhite ? '#000000' : '#ffffff'};
    opacity: 0.6;
    border-radius: 1px;
    transition: all 0.6s cubic-bezier(0.16, 1, 0.3, 1);
  }

  &:hover {
    height: 25rem;
    background: ${props => props.isWhite ? '#f5f5f5' : '#111111'};
    transform: translateY(-5px);
    box-shadow: ${props => props.isWhite 
      ? '0 10px 20px rgba(0,0,0,0.1)' 
      : '0 10px 20px rgba(255,255,255,0.05)'};
    
    &::after {
      width: 50%;
      opacity: 0.9;
    }
  }
`;

const GalleryImage = styled.img`
  width: 100%;
  height: auto;
  max-height: 200px;
  object-fit: cover;
  opacity: 0;
  transform: scale(0.95);
  transition: all 0.6s cubic-bezier(0.16, 1, 0.3, 1);
  border-radius: 0.2rem;
  margin-top: 1rem;
  filter: grayscale(100%) contrast(110%);
  display: none;

  ${GalleryItem}:hover & {
    opacity: 1;
    transform: scale(1) translateY(-10px);
    display: block;
  }
`;

const Title = styled.h3<GalleryItemProps>`
  font-size: 1.25rem;
  font-weight: 500;
  letter-spacing: 1rem;
  color: ${props => props.isWhite ? '#000000' : '#ffffff'};
  transition: transform 0.6s cubic-bezier(0.16, 1, 0.3, 1);
  
  ${GalleryItem}:hover & {
    transform: translateY(-5px);
  }
`;

const Number = styled.span`
  color: #aaaaaa;
  font-size: 0.875rem;
  display: block;
  margin-top: 0.5rem;
  transition: all 0.6s cubic-bezier(0.16, 1, 0.3, 1);
  
  ${GalleryItem}:hover & {
    transform: translateY(-5px);
    letter-spacing: 0.2rem;
  }
`;

const galleries: GalleryData[] = [
  { title: "STUDIO 74", number: "01", image: "/images/gallery1.jpg" },
  { title: "GLOSTER", number: "02", image: "/images/gallery2.jpg" },
  { title: "LINEA VOL.1", number: "03", image: "/images/gallery3.jpg" },
  { title: "CUBE 2.0", number: "04", image: "/images/gallery4.jpg" },
];

export default function Gallery() {
  return (
    <GalleryWrapper>
      <GalleryContainer>
        {galleries.map((g, i) => (
          <GalleryItem key={i} isWhite={i % 2 === 0}>
            <Title isWhite={i % 2 === 0}>{g.title}</Title>
            <Number>{g.number}</Number>
            <GalleryImage src={g.image} alt={g.title} />
          </GalleryItem>
        ))}
      </GalleryContainer>
    </GalleryWrapper>
  );
}