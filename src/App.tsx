import React from 'react';
import StarRating from './StarRating';
import styled from 'styled-components';
import { useDemoApp } from './hooks/useDemoApp';

const App = () => {
  const { formData, changeHandler, starBoxRef } = useDemoApp();

  return (
    <Container>
      <label htmlFor='now'>현재 값 : </label>
      <input
        type='text'
        name='now'
        id='now'
        value={+formData.now}
        onChange={changeHandler}
      />
      <br />
      <label htmlFor='max'>최대 값 : </label>
      <input
        type='text'
        name='max'
        id='max'
        value={+formData.max}
        onChange={changeHandler}
      />
      <br />
      <label htmlFor='starCount'>별 갯수 : </label>
      <input
        type='text'
        name='starCount'
        id='starCount'
        value={+formData.starCount}
        onChange={changeHandler}
      />
      <br />
      <StarRatingWrapper ref={starBoxRef}>
        <StarRating
          now={+formData.now}
          max={+formData.max}
          maximumStars={+formData.starCount}
          sStarSize='8.5vmin'
          sStarColor='red'
          sBackgroundColor='#ddd'
        />
      </StarRatingWrapper>
      <InfoMSG>별점 위에서 좌우로 슬라이드 해보세요!</InfoMSG>
    </Container>
  );
};

const InfoMSG = styled.p`
  font-size: 1rem;
  font-weight: bold;
  color: #555;
`;

const StarRatingWrapper = styled.div`
  padding: 1.5rem;
`;

const Container = styled.main`
  display: flex;
  flex-direction: column;

  height: 100vh;

  justify-content: center;
  align-items: center;
`;

export default App;
