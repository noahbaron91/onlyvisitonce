import React, { createContext, useContext, useState } from 'react';

export const AmountOfAdviceLeftContext = createContext<{
  amountOfAdviceLeft: number;
  leaveAdvice: () => void;
}>({ amountOfAdviceLeft: 0, leaveAdvice: () => null });

export const AmountOfAdviceLeftProvider = ({
  children,
}: {
  children: React.ReactNode;
}) => {
  const [amountOfAdviceLeft, setAmountOfAdviceLeft] = useState(0);

  const leaveAdvice = () => {
    setAmountOfAdviceLeft((prev) => prev + 1);
  };

  return (
    <AmountOfAdviceLeftContext.Provider
      value={{ amountOfAdviceLeft, leaveAdvice }}
    >
      {children}
    </AmountOfAdviceLeftContext.Provider>
  );
};

export const useAmountOfAdviceLeft = () => {
  const { amountOfAdviceLeft, leaveAdvice } = useContext(
    AmountOfAdviceLeftContext
  );

  return { amountOfAdviceLeft, leaveAdvice };
};
