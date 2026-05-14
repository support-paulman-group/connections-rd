import { ChevronLeft, ChevronRight } from "lucide-react";

type MediaControlsProps = {
  className: string;
  iconSize?: number;
  nextClassName: string;
  nextLabel?: string;
  onNext: () => void;
  onPrevious: () => void;
  previousClassName: string;
  previousLabel?: string;
  strokeWidth?: number;
};

export function MediaControls({
  className,
  iconSize = 22,
  nextClassName,
  nextLabel = "Next media",
  onNext,
  onPrevious,
  previousClassName,
  previousLabel = "Previous media",
  strokeWidth,
}: MediaControlsProps) {
  return (
    <>
      <button className={`${className} ${previousClassName}`} type="button" onClick={onPrevious} aria-label={previousLabel}>
        <ChevronLeft size={iconSize} strokeWidth={strokeWidth} />
      </button>
      <button className={`${className} ${nextClassName}`} type="button" onClick={onNext} aria-label={nextLabel}>
        <ChevronRight size={iconSize} strokeWidth={strokeWidth} />
      </button>
    </>
  );
}

