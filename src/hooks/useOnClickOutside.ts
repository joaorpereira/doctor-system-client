import { useEffect } from "react";

type OnClickOutSideProps = {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  ref: any;
  handler: (value: React.SetStateAction<boolean>) => void;
};

export const useOnClickOutside = ({ ref, handler }: OnClickOutSideProps) => {
  useEffect(() => {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const listener = (event: any) => {
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
