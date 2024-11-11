import fetch from "node-fetch";

export async function GET(req, res) {
  try {
    // GitHub API endpoint for searching users in Tanzania
    const response = await fetch(
      "https://api.github.com/search/users?q=location:tanzania&per_page=100"
    );

    if (!response.ok) {
      throw new Error("GitHub API request failed");
    }

    const data = await response.json();

    // Format the data to include rank and contributions (if available)
    const developers = data.items.map((user, index) => ({
      rank: index + 1,
      username: user.login,
      contributions: Math.floor(Math.random() * 1500 + 100), // Placeholder for contributions count
    }));

    return res.status(200).json(developers);
  } catch (error) {
    console.error("Failed to fetch GitHub data:", error);
    return res.status(500).json({ error: "Failed to fetch data" });
  }
}
