import styled from "styled-components";

const GalleryWrapper = styled.section`
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  gap: 2rem;
  padding: 4rem;
  text-align: center;
`;

const GalleryItem = styled.div`
  background-color: #14172a;
  padding: 2rem;
  border-radius: 1rem;
`;

const Title = styled.h3`
  font-size: 1.25rem;
  font-weight: 500;
`;

const Number = styled.span`
  color: #00f5d4;
  font-size: 0.875rem;
  display: block;
  margin-top: 0.5rem;
`;

const galleries = [
  { title: "STUDIO 74", number: "01" },
  { title: "GLOSTER", number: "02" },
  { title: "LINEA VOL.1", number: "03" },
  { title: "CUBE 2.0", number: "04" },
];

export default function Gallery() {
  return (
    <GalleryWrapper>
      {galleries.map((g, i) => (
        <GalleryItem key={i}>
          <Title>{g.title}</Title>
          <Number>{g.number}</Number>
        </GalleryItem>
      ))}
    </GalleryWrapper>
  );
}
