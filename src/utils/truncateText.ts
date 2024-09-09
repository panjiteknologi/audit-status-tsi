export default function truncateText(text: string, long: number) {
  if (text !== null && text !== undefined) {
    if (text.length > long) return text.substring(0, long) + "...";
    else return text;
  }
}

