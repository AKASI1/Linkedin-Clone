import styled from "styled-components";

/*________________________________________________________________________________*/

const Rightside = (props) => {
  return (
    <Container>
      <FollowCard>
        <Title>
          <h2>Add to your feed</h2>
          <img src="/Images/feed-icon.svg" alt="" />
        </Title>

        <FeedList>
          <li>
            <a href="/feed">
              <Avatar />
            </a>
            <div>
              <span>#Linkedin</span>
              <button>
                <img src="/Images/plus-icon.svg" alt="plus" />
                Follow
              </button>
            </div>
          </li>
          <li>
            <a href="/feed">
              <Avatar />
            </a>
            <div>
              <span>#Video</span>
              <button>
                <img src="/Images/plus-icon.svg" alt="plus" /> Follow
              </button>
            </div>
          </li>
        </FeedList>

        <Recommendation>
          View all recommendations
          <img src="/Images/right-icon.svg" alt="" />
        </Recommendation>
      </FollowCard>
      <BannerCard>
        <img src="/Images/ads.png" alt="" />
      </BannerCard>
    </Container>
  );
};
export default Rightside;

/*________________________________________________________________________________*/

const Container = styled.div`
  grid-area: rightside;
`;
/*_________________________________________*/
const FollowCard = styled.div`
  text-align: center;
  overflow: hidden;
  margin-bottom: 8px;
  background-color: #fff;
  border-radius: 5px;
  position: relative;
  border: none;
  box-shadow: 0 0 0 1px rgb(0 0 0 / 15%), 0 0 0 rgb(0 0 0 / 20%);
  padding: 12px;
`;
/*_________________________________________*/
const Title = styled.div`
  display: inline-flex;
  align-items: center;
  justify-content: space-between;
  font-size: 16.5px;
  width: 100%;
  h2 {
    color: #333;
    font-weight: 700;
  }
`;
/*_________________________________________*/
const FeedList = styled.ul`
  margin-top: 16px;
  li {
    display: flex;
    align-items: center;
    margin: 12px 0;
    position: relative;
    font-size: 14px;
    & > div {
      display: flex;
      flex-direction: column;
      text-align: start;
      gap: 4px;
    }
    button {
      background-color: transparent;
      color: rgba(0, 0, 0, 0.6);
      border: none;
      box-shadow: inset 0 0 0 1px rgba(0, 0, 0, 0.6);
      padding: 16px;
      align-items: center;
      border-radius: 15px;
      box-sizing: border-box;
      font-weight: 600;
      display: inline-flex;
      justify-content: center;
      max-height: 32px;
      max-width: 480px;
      text-align: center;
      outline: none;
      font-size: 16px;
      transition: 0.2s;
      cursor: pointer;
      img {
        margin-right: 5px;
      }
      &:hover {
        background-color: rgba(0, 0, 0, 0.08);
        box-shadow: inset 0 0 0 2px rgba(0, 0, 0, 0.6);
      }
    }
  }
`;
/*_________________________________________*/
const Avatar = styled.div`
  background-image: url("https://static-exp1.licdn.com/sc/h/1b4vl1r54ijmrmcyxzoidwmxs");
  background-size: contain;
  background-position: center;
  background-repeat: no-repeat;
  width: 45px;
  height: 45px;
  margin-right: 8px;
`;
/*_________________________________________*/
const Recommendation = styled.a`
  color: #0a66c2;
  display: flex;
  align-items: center;
  font-size: 14px;
  cursor: pointer;
`;
/*_________________________________________*/
const BannerCard = styled(FollowCard)`
  position: sticky;
  top: 75px;
  img {
    width: 100%;
    height: 100%;
  }
`;
/*________________________________________________________________________________*/
