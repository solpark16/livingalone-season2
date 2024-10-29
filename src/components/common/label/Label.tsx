interface LabelProps {
  color: string;
  textColor: string;
  name: string;
}
function Label({ color, textColor, name }: LabelProps) {
  const defaultProps =
    "rounded-full px-[7px] py-[3px] text-[10px] md:px-[10px] md:py-[4px] md:text-[12px] font-semibold";

  return <span className={`${color} ${textColor} ${defaultProps}`}>{name}</span>;
}

export default Label;
