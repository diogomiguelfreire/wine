// GENERIC IMPORTS_____________________________________________________________
import type { NextPage } from "next";
import Head from "next/head";
import styled from "styled-components";
import { useRouter } from "next/router";

// DATA RELATED IMPORTS_____________________________________________________________
import { useQuery } from "react-query";
import axios from "axios";

// COMPONENTS STYLE_____________________________________________________________
const Title = styled.h1`
  font-size: 3rem;
  color: black;
`;

const MainSection = styled.main`
  min-height: 100vh;
  padding: 4rem 0;
  flex: 1;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
`;

const Container = styled.div`
  background-color: #f9f9f9;
`;

// GRID STYLE________________________________________________________
const Grid = styled.div`
  display: grid;
  width: 100%;
  grid-template-columns: repeat(auto-fill, 25rem);
  justify-content: center;
  grid-gap: 2rem;
`;

const Item = ({
  gridTitle,
  imgUrl,
  year,
  id,
  vineyard,
  className,
}: {
  gridTitle: string;
  imgUrl: string;
  year: number;
  id: number;
  vineyard: string;
  className?: any;
}) => {
  const router = useRouter();
  return (
    <div
      className={className}
      onClick={() =>
        router.push({
          pathname: "/wine-details",
          query: { id },
        })
      }
    >
      <img src={imgUrl} alt="wine image" />
      <h1>{gridTitle}</h1>
      <label>{year}</label>
      <label className="vineyard">{vineyard}</label>
      <div className="hoverDiv">DETAILS</div>
    </div>
  );
};

const GridItem = styled(Item)`
  display: flex;
  flex-direction: column;
  justify-content: center;
  padding: 1rem;
  background-color: #ffffff;
  height: 25rem;
  width: 20rem;
  position: relative;
  cursor: pointer;
  img {
    width: 100%;
    height: 55%;
    margin-top: 1rem;
    display: block;
    object-fit: contain;
  }
  label {
    text-align: right;
    font-size: 1.2rem;
    color: #667db2;
    margin-top: auto;
  }
  h1 {
    text-align: center;
    font-size: 1rem;
    color: black;
    text-align: left;
    font-weight: bold;
    margin-top: 1.5rem;
  }

  .vineyard {
    color: #f848a2;
  }

  .hoverDiv {
    background-color: black;
    height: 5rem;
    width: 20rem;
    left: 0;
    bottom: 0;
    position: absolute;
    line-height: 5rem;
    text-align: center;
    font-weight: bold;
    display: none;
  }

  &:hover {
    .hoverDiv {
      display: block;
    }
  }
`;

// MAIN RENDER________________________________________________________________
const Home: NextPage = () => {
  const { data } = useQuery(["repoData"], () =>
    axios.get("http://localhost:3001/wines/").then((res) => res.data)
  );
  console.log(data);
  return (
    <Container>
      <Head>
        <title>Wine cellar</title>
        <script src="http://code.jquery.com/jquery-1.11.0.min.js"></script>
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <MainSection>
        <Title>Wine Cellar</Title>
        <Grid>
          {data?.map((item: any) => (
            <GridItem
              id={item.id}
              key={item.title}
              gridTitle={item.name}
              imgUrl={item.imgUrl}
              year={item.year}
              vineyard={item.vineyard}
            />
          ))}
        </Grid>
      </MainSection>

      <footer></footer>
    </Container>
  );
};

export default Home;
