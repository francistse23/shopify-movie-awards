import React, { useEffect, useState } from "react";

function useDebounce(value, delay = 500) {
  const [debouncedValue, setDebouncedValue] = useState(value);
  const [typing, setTyping] = useState(false);

  useEffect(() => {
    setTyping(true);
    const handler = setTimeout(() => {
      setDebouncedValue(value);
      setTyping(false);
    }, delay);

    return () => {
      clearTimeout(handler);
    };
  }, [value, delay]);

  return {
    debouncedValue,
    typing,
  };
}

export default useDebounce;
