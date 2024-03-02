import React from 'react';
import { useRecoilState } from 'recoil';

import { roundsArrayState, selectedRoundState, selectedSessionState } from '@/utils/recoilState';

const RoundFilter: React.FC = () => {
  const [roundArrays] = useRecoilState<number[] | undefined>(roundsArrayState);
  const [selectedRound, setSelectedRound] = useRecoilState<Number | null>(selectedRoundState);

  const handleRoundChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    const selectedValue = parseInt(event.target.value, 10);
    setSelectedRound(selectedValue);
  };

  console.log(selectedRound);

  return (
    <div className="mt-2">
      <select
        id="subject"
        name="subject"
        value={selectedRound !== null ? selectedRound.toString() : ''}
        onChange={handleRoundChange}
        className="w-[100%] mx-auto mt-1 text-h4 font-bold block p-3 bg-white rounded-xl shadow-sm focus:outline-none focus:ring focus:border-blue-300 sm:text-sm">
        {roundArrays?.map((round, index) => (
          <option key={index} value={round}>
            {round}회
          </option>
        ))}
      </select>
    </div>
  );
};

export default RoundFilter;
