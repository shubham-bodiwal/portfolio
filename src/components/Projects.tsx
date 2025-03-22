import styled from "styled-components";
import tnqImg from "../assets/react.svg";
import dreamsImg from "../assets/react.svg";
import escapeImg from "../assets/react.svg";

const ProjectsWrapper = styled.section`
  padding: 4rem;
`;

const Title = styled.h2`
  font-size: 2rem;
  margin-bottom: 2rem;
`;

const Grid = styled.div`
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 2rem;
`;

const Card = styled.div`
  background-color: #14172a;
  border-radius: 1rem;
  overflow: hidden;
`;

const Image = styled.img`
  width: 100%;
  display: block;
`;

const CardTitle = styled.h4`
  padding: 1rem;
  font-size: 1.25rem;
`;

const projects = [
  { title: "TNQ Project", img: tnqImg },
  { title: "Dreams", img: dreamsImg },
  { title: "Escape", img: escapeImg },
];

export default function Projects() {
  return (
    <ProjectsWrapper>
      <Title>Live Events</Title>
      <Grid>
        {projects.map((p, i) => (
          <Card key={i}>
            <Image src={p.img} alt={p.title} />
            <CardTitle>{p.title}</CardTitle>
          </Card>
        ))}
      </Grid>
    </ProjectsWrapper>
  );
}
