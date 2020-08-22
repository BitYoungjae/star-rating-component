import React, { useState, ChangeEvent, useRef, useEffect } from 'react';
import StarRating from './StarRating';
import styled from 'styled-components';

const numberRegex = /^[0-9]*$/;

const App = () => {
  const [formData, setFormData] = useState({
    now: '45',
    max: '100',
    starCount: '10',
  });

  const starBoxRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const starBoxElement = starBoxRef.current;
    if (!starBoxElement) return;

    const starBoxWidth = starBoxElement.offsetWidth;
    let isSelected = false;

    starBoxElement.addEventListener('mousedown', () => {
      isSelected = true;
    });

    starBoxElement.addEventListener('mouseup', () => {
      isSelected = false;
    });

    starBoxElement.addEventListener('mouseleave', () => {
      isSelected = false;
    });

    starBoxElement.addEventListener('mousemove', (e) => {
      const { offsetX } = e;
      if (isSelected && e.target === e.currentTarget) {
        const rate = offsetX / starBoxWidth;

        setFormData((prevFormData) => ({
          ...prevFormData,
          now: `${Math.round(+prevFormData.max * rate)}`,
        }));
      }
    });
  }, [setFormData]);

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
        sStarSize='3rem'
        sStarColor='red'
        sBackgroundColor='#ddd'
        ref={starBoxRef}
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
