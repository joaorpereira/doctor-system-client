import { colors } from "../../styles/variables";

export const Hamburger = () => {
  return (
    <svg viewBox="0 0 120 80" width="36" height="36">
      <rect width="120" height="15" fill={colors.text} />
      <rect y="30" width="120" height="15" fill={colors.text} />
      <rect y="60" width="120" height="15" fill={colors.text} />
    </svg>
  );
};
