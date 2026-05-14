import { getMediaKey, type SharedMediaItem } from "./mediaTypes";

type MediaDotsProps = {
  activeIndex: number;
  className: string;
  items: SharedMediaItem[];
  label?: string;
  onSelect: (index: number) => void;
};

export function MediaDots({ activeIndex, className, items, label = "Show media", onSelect }: MediaDotsProps) {
  return (
    <div className={className}>
      {items.map((item, index) => (
        <button
          key={getMediaKey(item, index)}
          type="button"
          aria-label={`${label} ${index + 1}`}
          aria-pressed={index === activeIndex}
          onClick={() => onSelect(index)}
        />
      ))}
    </div>
  );
}

