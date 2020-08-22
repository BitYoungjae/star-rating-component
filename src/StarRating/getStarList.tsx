import { StarProps } from './Star';

interface getStarListProps
  extends Pick<StarProps, 'sBackgroundColor' | 'sStarColor'> {
  count: number;
  rate: number;
}

const getStarList = ({
  count,
  rate,
  sBackgroundColor,
  sStarColor,
}: getStarListProps) => {
  if (count < 0) return [];

  return Array(count)
    .fill(null)
    .map((_) => ({
      rate,
      sStarColor,
      sBackgroundColor,
    }));
};

export { getStarList };
