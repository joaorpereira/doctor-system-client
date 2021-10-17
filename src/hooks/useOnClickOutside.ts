import React, { useEffect } from "react";

type OnClickOutSideProps = {
  ref: React.MutableRefObject<HTMLDivElement | null>;
  handler: (value: MouseEvent | TouchEvent) => void;
};

const useOnClickOutside = ({ ref, handler }: OnClickOutSideProps) => {
  useEffect(() => {
    const listener = (event: MouseEvent | TouchEvent) => {
      if (!ref.current || ref.current.contains(event.target as Node)) {
        return;
      }
      handler(event);
    };
    document.addEventListener("mousedown", listener);
    document.addEventListener("touchstart", listener);
    return () => {
      document.removeEventListener("mousedown", listener);
      document.removeEventListener("touchstart", listener);
    };
  }, [ref, handler]);
};

export default useOnClickOutside;
