import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Loader2 } from "lucide-react";
import { useEffect, useState } from "react";
import RepoList from "./RepoList";

const SearchBar = () => {
  interface repoListObject {
    name: string;
    language: string;
    githubLink: string;
    stars?: number;
    forks?: number;
    description?: string;
  }

  const [githubUsername, setGithubUsername] = useState("");
  const [repoList, setRepoList] = useState<repoListObject[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [error, setError] = useState<boolean>(false);

  useEffect(() => {
    setRepoList([]);
    setError(false);
  }, [githubUsername]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    handleClick();
  };

  const handleClick = async () => {
    if (githubUsername) {
      setIsLoading(true);
      try {
        const response = await fetch(
          `https://api.github.com/users/${githubUsername}/repos`
        );
        const res = await response.json();
        setIsLoading(false);

        if (response.status !== 200) {
          setRepoList([]);
          setError(true);
          return;
        }

        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        const repoListArr: repoListObject[] = res.map((item: any) => ({
          name: item.name,
          language: item.language,
          githubLink: item.html_url,
          stars: item.stargazers_count,
          forks: item.forks_count,
          description: item.description,
        }));

        setRepoList(repoListArr);
      } catch (err) {
        console.log(err);
      }
    }
  };

  return (
    <>
      <form onSubmit={(e) => handleSubmit(e)}>
        <div className="flex flex-col items-center mx-auto gap-4 mt-4 w-7/8 sm:w-3/4 sm:flex-row">
          <Input
            placeholder="Enter Github Username"
            onChange={(e) => setGithubUsername(e.target.value)}
          />
          <Button onClick={handleClick} className="cursor-pointer">
            Get Public Repo!
          </Button>
        </div>
      </form>

      <div className="mt-4">
        {isLoading ? (
          <div className="flex justify-center items-center py-10">
            <Loader2 className="h-10 w-10 animate-spin text-muted-foreground" />
          </div>
        ) : repoList.length !== 0 ? (
          <RepoList githubUsername={githubUsername} repoList={repoList} />
        ) : (
          error && (
            <span className="text-gray-400">
              Data not found for this user :(
            </span>
          )
        )}
      </div>
    </>
  );
};

export default SearchBar;
