import { useEffect } from "react";

type OnClickOutSideProps = {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  ref: any;
  handler: (value: MouseEvent | TouchEvent) => void;
};

const useOnClickOutside = ({ ref, handler }: OnClickOutSideProps) => {
  useEffect(() => {
    const listener = (event: MouseEvent | TouchEvent) => {
      if (!ref.current || ref.current.contains(event.target)) {
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
