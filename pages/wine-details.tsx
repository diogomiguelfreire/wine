// GENERIC IMPORTS__________________________________________________________________
import type { NextPage } from "next";
import styled from "styled-components";
import { useRouter } from "next/router";

// DATA RELATED IMPORTS_____________________________________________________________
import { useQuery } from "react-query";
import axios from "axios";

const Title = styled.h1`
  font-size: 3rem;
  color: black;
  width: 100%;
  text-align: center;
`;

const StyledButton = styled.button`
  background-color: black;
  font-size: 32px;
  color: white;
`;

const Section = ({
  className,
  name,
  year,
  description,
  vineyard,
  imgUrl,
}: {
  className?: any;
  name: string;
  year: number;
  description: string;
  vineyard: string;
  imgUrl: string;
}) => {
  return (
    <div className={className}>
      <label className="title">{name}</label>
      <label className="year">{year}</label>
      <label className="vineyard">{vineyard}</label>
      <div className="container">
        <img className="image" src={imgUrl} alt="wine image" />
        <label className="description">{description}</label>
      </div>
    </div>
  );
};

const Container = styled.div`
  background-color: #f9f9f9;
  min-height: 100vh;
  padding: 4rem 10rem;
`;

const DetailSection = styled(Section)`
  color: black;
  label {
    display: block;
  }
  .title {
    font-weight: bold;
    font-size: 2.5rem;
  }
  .year {
    font-size: 1.5rem;
    color: #667db2;
  }
  .vineyard {
    font-size: 1.5rem;
    color: #f848a2;
  }
  .description {
    color: #667db2;
    display: flex;
    align-items: center;
  }
  .container {
    margin-top: 4rem;
    display: grid;
    grid-template-columns: 30rem 50%;
    grid-gap: 2rem;
    justify-content: center;
  }
  .image {
    width: 15rem;
    margin-top: 1rem;
    object-fit: contain;
  }
`;

const Details: NextPage = () => {
  const router = useRouter();
  const { id } = router.query;
  const { data } = useQuery(["wineDetails"], () =>
    axios.get("http://localhost:3001/wines/" + id).then((res) => res.data)
  );

  console.log(data);
  return (
    <div>
      <Container>
        <script src="http://code.jquery.com/jquery-1.11.0.min.js"></script>
        <StyledButton onClick={() => router.push("/")}> Back</StyledButton>
        <Title>Wine Details</Title>
        <DetailSection
          name={data?.name}
          year={data?.year}
          vineyard={data?.vineyard}
          imgUrl={data?.imgUrl}
          description={data?.description}
        ></DetailSection>
      </Container>

      <footer></footer>
    </div>
  );
};

export default Details;
