import React, { useState, ChangeEvent } from 'react';
import StarRating from './StarRating';
import styled from 'styled-components';

const numberRegex = /^[0-9]*$/;

const App = () => {
  const [formData, setFormData] = useState({
    now: '45',
    max: '100',
    starCount: '10',
  });

  const changeHandler = (e: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;

    if (!numberRegex.test(value)) return;

    setFormData((prevData) => ({ ...prevData, [name]: value }));
  };

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
      <StarRating
        now={+formData.now}
        max={+formData.max}
        maximumStars={+formData.starCount}
        sStarColor='red'
        sBackgroundColor='#ddd'
      />
    </Container>
  );
};

const Container = styled.main`
  display: flex;
  flex-direction: column;

  height: 100vh;

  justify-content: center;
  align-items: center;
`;

export default App;
