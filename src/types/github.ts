export interface GitHubUser {
  username: string;
  name: string;
  publicRepositories: number;
  followers: number;
  totalContributions: number;
}

export interface GitHubRepository {
  name: string;
  description: string;
  url: string;
  stargazers_count: number;
  language: string;
}

export interface ContributionDay {
  date: string;
  count: number;
}

export interface GitHubActivity {
  user: GitHubUser;
  repositories: GitHubRepository[];
  contributionData: ContributionDay[];
  lastUpdated: string;
}

export interface UseGitHubReturn {
  activity: GitHubActivity | null;
  isLoading: boolean;
  error: string | null;
  refetch: () => Promise<void>;
}
