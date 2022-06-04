import styled from "styled-components";
import Leftside from "./Leftside";
import Main from "./Main";
import Rightside from "./Rightside";

/*________________________________________________________________________________*/

const Home = (props) => {
  document.title = "Feed | Linkedin";
  return (
    <Container>
      <Layout>
        <Leftside />
        <Main />
        <Rightside />
      </Layout>
    </Container>
  );
};
export default Home;

/*________________________________________________________________________________*/

const Container = styled.div`
  padding-top: 52px;
  max-width: 100%;
  background-color: #f5f5f5;
`;
/*__________________________________________*/

const Layout = styled.div`
  display: grid;
  grid-template-areas: "leftside main rightside";
  grid-template-columns: minmax(0, 5fr) minmax(0, 12fr) minmax(300px, 7fr);
  column-gap: 25px;
  row-gap: 25px;
  max-width: 1128px;
  margin: 20px auto;
  @media (max-width: 768px) {
    display: flex;
    flex-direction: column;
    padding: 0 5px;
  }
`;
/*________________________________________________________________________________*/
