import { useEffect } from "react";

type OnClickOutSideProps = {
  ref: any;
  handler: (value: React.SetStateAction<boolean>) => void;
};

export const useOnClickOutside = ({ ref, handler }: OnClickOutSideProps) => {
  useEffect(() => {
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
