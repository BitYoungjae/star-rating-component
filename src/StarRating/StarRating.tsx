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

type ICalculatedStarList = {
  rate: number;
  sStarColor: string | undefined;
  sBackgroundColor: string | undefined;
}[];

const StarRating: React.FC<StarRatingProps> = React.forwardRef<
  HTMLDivElement,
  StarRatingProps
>(
  (
    {
      now,
      max,
      sStarSize = '2rem',
      sStarColor = 'red',
      sBackgroundColor = '#ddd',
      maximumStars = 5,
    },
    ref
  ) => {
    const perStar = max / maximumStars;
    const filledStars = Math.floor(now / perStar);
    const blankStars = maximumStars - filledStars - 1;
    const remain = ((now % perStar) / perStar) * 100;
    let calculatedStarList: ICalculatedStarList = [];

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

      calculatedStarList = getStarList({
        rate: 0,
        count: maximumStars,
        sStarColor,
        sBackgroundColor,
      });
    } else if (now > max || blankStars < 0) {
      calculatedStarList = getStarList({
        rate: 100,
        count: maximumStars,
        sStarColor,
        sBackgroundColor,
      });
    } else {
      calculatedStarList = [
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
    }

    return (
      <StarBox ref={ref}>
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
  }
);

const isInInvalidNumber = (list: number[]) => {
  return list.some((v) => Number.isNaN(v) || !Number.isFinite(v));
};

export default StarRating;
