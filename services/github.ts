import axios from 'axios';

interface ContributionData {
  total: number;
  contributions: {
    date: string;
    count: number;
  }[];
}

async function getUserContributions(username: string, days: number): Promise<ContributionData> {
  const today = new Date();
  const fromDate = new Date(today.getTime() - days * 24 * 60 * 60 * 1000);

  const url = `https://api.github.com/search/commits?q=author:${username}+committer-date:${fromDate.toISOString()}..${today.toISOString()}`;

  const response = await axios.get(url);
  const totalCount = response.data.total_count;
  const contributions = response.data.items.map((item: any) => ({
    date: item.commit.committer.date,
    count: 1,
  }));

  // Aggregate contributions by date
  const aggregated: { [key: string]: number } = {};
  contributions.forEach((c: { date: string | any[]; count: number }) => {
    const date = c.date.slice(0, 10) as string;
    if (aggregated[date]) {
      aggregated[date] += c.count;
    } else {
      aggregated[date] = c.count;
    }
  });

  // Convert aggregated contributions to array of {date, count} objects
  const contributionArray = Object.entries(aggregated).map(([date, count]) => ({
    date,
    count,
  }));

  return {
    total: totalCount,
    contributions: contributionArray,
  };
}

module.exports = { getUserContributions };
