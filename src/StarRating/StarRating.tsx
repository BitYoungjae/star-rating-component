import React from 'react';
import Star, { StarProps } from './Star';
import StarBox from './StarBox';
import { getStarList } from './getStarList';

interface StarRatingProps
  extends Pick<StarProps, 'sBackgroundColor' | 'sStarColor' | 'sStarSize'> {
  now: number;
  max: number;
  maximumStars?: number;
}

const StarRating: React.FC<StarRatingProps> = ({
  now,
  max,
  sStarSize = '2rem',
  sStarColor = 'red',
  sBackgroundColor = '#ddd',
  maximumStars = 5,
}) => {
  const perStar = max / maximumStars;
  const filledStars = Math.floor(now / perStar);
  const blankStars = maximumStars - filledStars - 1;
  const remain = ((now % perStar) / perStar) * 100;

  if (
    isInInvalidNumber([
      now,
      max,
      maximumStars,
      perStar,
      filledStars,
      blankStars,
      remain,
    ])
  ) {
    console.warn(`잘 못된 값이 입력되고 있습니다.`);
    console.warn({ now, max, maximumStars });

    return (
      <StarBox>
        {Array(maximumStars)
          .fill(null)
          .map((_, index) => (
            <Star
              key={index}
              rate={0}
              sStarColor={sStarColor}
              sBackgroundColor={sBackgroundColor}
              sStarSize={sStarSize}
            />
          ))}
      </StarBox>
    );
  }

  if (now > max || blankStars < 0) {
    return (
      <StarBox>
        {Array(maximumStars)
          .fill(null)
          .map((_, index) => (
            <Star
              key={index}
              rate={100}
              sStarColor={sStarColor}
              sBackgroundColor={sBackgroundColor}
              sStarSize={sStarSize}
            />
          ))}
      </StarBox>
    );
  }

  console.log({ now, max, filledStars, remain, blankStars });

  const calculatedStarList = [
    ...getStarList({
      count: filledStars,
      rate: 100,
      sStarColor,
      sBackgroundColor,
    }),
    {
      rate: remain,
      sStarColor,
      sBackgroundColor,
    },
    ...getStarList({
      count: blankStars,
      rate: 0,
      sStarColor,
      sBackgroundColor,
    }),
  ];

  return (
    <StarBox>
      {calculatedStarList.map(
        ({ rate, sBackgroundColor, sStarColor }, index) => (
          <Star
            key={index}
            rate={rate}
            sStarColor={sStarColor}
            sBackgroundColor={sBackgroundColor}
            sStarSize={sStarSize}
          />
        )
      )}
    </StarBox>
  );
};

const isInInvalidNumber = (list: number[]) => {
  return list.some((v) => Number.isNaN(v) || !Number.isFinite(v));
};

export default StarRating;
