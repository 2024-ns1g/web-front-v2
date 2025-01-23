import { Doughnut } from 'react-chartjs-2';
import { FC } from "react";
import { VoteChoice } from '@/types/audience/vote-choice';

type VoteStatsType = {
  choiceId: string;
  count: number;
};

interface VoteDrawerBodyProps {
  voteTitle: string;
  voteSummary: string;

  choices: VoteChoice[];

  stats: VoteStatsType[];
};

export const VoteDrawerBody: FC<VoteDrawerBodyProps> = ({
  voteTitle,
  voteSummary,
  choices,
  stats,
}) => {
  // Generate and set color when it is not set
  choices.forEach((c) => {
    if (!c.backgroundColor || !c.borderColor) {
      const { background, border } = generateRandomColorPair();
      c.backgroundColor = background;
      c.borderColor = border;
    }
  });

  const data = {
    labels: choices.map((c) => c.title),
    datasets: [{
      data: stats.map((s) => s.count),
      backgroundColor: choices.map((c) => c.backgroundColor!),
      borderColor: choices.map((c) => c.borderColor!),
      borderWidth: 1,
    }],
  };

  return (
    <>
      <p className="text-lg font-bold">{voteTitle}</p>
      <Doughnut data={data} />
    </>
  );
};
