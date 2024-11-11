import { NextResponse } from "next/server";

interface GitHubUser {
  login: string;
  // Add other fields from the GitHub API response if needed
}

interface Developer {
  rank: number;
  username: string;
  contributions: number;
}

export async function GET() {
  try {
    // GitHub API endpoint for searching users in Tanzania
    const response = await fetch(
      "https://api.github.com/search/users?q=location:tanzania&per_page=100"
    );

    if (!response.ok) {
      throw new Error("GitHub API request failed");
    }

    const data: { items: GitHubUser[] } = await response.json();

    // Format the data to include rank and contributions (if available) and sort by contributions
    const developers: Developer[] = data.items
      .map((user: GitHubUser): Developer => ({
        username: user.login,
        contributions: Math.floor(Math.random() * 1500 + 100), // Placeholder for contributions count
        rank: 0, // Temporary placeholder for rank; will be reassigned after sorting
      }))
      .sort((a, b) => b.contributions - a.contributions) // Sort in descending order by contributions
      .map((dev, index) => ({
        ...dev,
        rank: index + 1, // Assign rank based on sorted order
      }));

    return NextResponse.json(developers, { status: 200 });
  } catch (error) {
    console.error("Failed to fetch GitHub data:", error);
    return NextResponse.json({ error: "Failed to fetch data" }, { status: 500 });
  }
}
