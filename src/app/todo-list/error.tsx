'use client';

import { useEffect } from 'react';

export default function Error({
  error,
  reset,
}: {
  error: Error;
  reset: () => void;
}) {
  useEffect(() => {
    console.error(error);
  }, [error]);

  return (
    <div>
      <h2>문제가 발생했습니다!</h2>
      <p>{error.message}</p>
      <button onClick={() => reset()}>다시 시도하기</button>
    </div>
  );
}
