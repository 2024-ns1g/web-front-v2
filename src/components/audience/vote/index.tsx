import 'chart.js/auto';
import { Doughnut } from 'react-chartjs-2';
import { FC, useEffect, useState } from "react";
import { VoteChoice } from '@/types/audience/vote-choice';
import { Radio, RadioGroup } from '@nextui-org/react';

type VoteStatsType = {
  choiceId: string;
  count: number;
};

interface VoteDrawerBodyProps {
  voteTitle: string;
  voteQuestion: string;
  choices: VoteChoice[];
  stats: VoteStatsType[];
  votedHandler: (voteId: string, choiceId: string) => void;
};

export const VoteDrawerBody: FC<VoteDrawerBodyProps> = ({
  voteTitle,
  voteQuestion: voteSummary,
  choices,
  stats,
  votedHandler
}) => {

  const [selected, setSelected] = useState<string | null>(null);

  const [summary, setSummary] = useState([]);

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
      {/* <p className="text-lg font-bold">{voteTitle}</p> */}
      {/* <Doughnut data={data} /> */}
      <RadioGroup
        name="vote"
        value={selected}
        onValueChange={(value) => setSelected(value)}
      >
        {choices.map((c) => (
          <Radio key={c.choiceId} value={c.choiceId}>
            {c.title}
          </Radio>
        ))}
      </RadioGroup>
    </>
  );
};
