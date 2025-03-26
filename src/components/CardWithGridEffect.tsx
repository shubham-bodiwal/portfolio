import styled from "styled-components";

const CardWrapper = styled.div`
  height: 100vh;
  width: 100vw;
  background: linear-gradient(to bottom, #0f1827, #3a4965, #03050b);
  background-size: 100% 100%;
  display: flex;
  align-items: center;
  justify-content: center;
`;

const Card = styled.div`
  border-radius: 2rem;
  overflow: hidden;
`;

const CardImage = styled.div`
  position: relative;
  height: 30rem;
  width: 30rem;
  display: flex;
  align-items: center;
  justify-content: center;

  > img {
    width: 10rem;
    position: relative;
    z-index: 1;
    pointer-events: none;
  }
`;

const GridEffect = styled.div`
  position: absolute;
  z-index: 0;
  inset: 0;
  display: grid;
  grid-template-columns: repeat(10, 1fr);
  grid-template-rows: repeat(10, 1fr);
`;

const Tile = styled.a`
  position: relative;

  &::before {
    content: "";
    position: absolute;
    top: 50%;
    left: 50%;
    color: rgb(112, 112, 112);
    transform: translate(-50%, -50%);
    height: 0.3rem;
    width: 0.3rem;
    border-radius: 50%;
    background: rgb(112, 112, 112);
    transition: 500ms linear all;
    box-shadow: 3rem 0 0 -0.3rem, -3rem 0 0 -0.3rem, 0 -3rem 0 -0.3rem,
      0 3rem 0 -0.3rem, 3rem 3rem 0 -1.35rem, 3rem -3rem 0 -1.35rem,
      -3rem 3rem 0 -1.35rem, -3rem -3rem 0 -1.35rem, 6rem 0 0 -0.6rem,
      -6rem 0 0 -0.6rem, 0 -6rem 0 -0.6rem, 0 6rem 0 -0.6rem,
      6rem 3rem 0 -2.7rem, 6rem -3rem 0 -2.7rem, -6rem 3rem 0 -2.7rem,
      -6rem -3rem 0 -2.7rem, 9rem 0 0 -0.9rem, -9rem 0 0 -0.9rem,
      0 -9rem 0 -0.9rem, 0 9rem 0 -0.9rem, 9rem 3rem 0 -4.05rem,
      9rem -3rem 0 -4.05rem, -9rem 3rem 0 -4.05rem, -9rem -3rem 0 -4.05rem,
      12rem 0 0 -1.2rem, -12rem 0 0 -1.2rem, 0 -12rem 0 -1.2rem,
      0 12rem 0 -1.2rem, 12rem 3rem 0 -5.4rem, 12rem -3rem 0 -5.4rem,
      -12rem 3rem 0 -5.4rem, -12rem -3rem 0 -5.4rem;
  }

  &:hover::before {
    height: 3rem;
    width: 3rem;
    transition: 70ms linear all;
  }
`;

const CardWithGridEffect = () => {
  const totalTiles = 100;

  return (
    <CardWrapper>
      <Card>
        <CardImage>
          <GridEffect>
            {Array.from({ length: totalTiles }).map((_, i) => (
              <Tile href="#" key={i} />
            ))}
          </GridEffect>
        </CardImage>
      </Card>
    </CardWrapper>
  );
};

export default CardWithGridEffect;
