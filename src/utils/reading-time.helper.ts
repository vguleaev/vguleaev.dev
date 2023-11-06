import { readingTime } from 'reading-time-estimator';
import { toString } from 'mdast-util-to-string';

export function remarkReadingTime() {
  return function (tree: unknown, { data }: any) {
    const textOnPage = toString(tree);
    const readingTimeText = readingTime(textOnPage).text;
    data.astro.frontmatter.minutesRead = readingTimeText;
  };
}
