/** "1 PROJECT" / "4 PROJECTS" — shared by the build-time markup and the filter script. */
export const formatProjectCount = (count: number) =>
  `${count} PROJECT${count === 1 ? '' : 'S'}`;
