import {
  Card,
  CardContent,
  CardDescription,
  // CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

type repoListProps = {
  githubUsername: string;
  repoList: {
    name: string;
    language: string;
    githubLink: string;
    stars?: number;
    forks?: number;
    description?: string;
  }[];
};

const RepoList = ({ githubUsername, repoList }: repoListProps) => {
  return (
    <>
    
    <div className="mb-8">
      {/* <hr className=" mb-4"></hr> */}
      <div className="font-normal text-stone-300 text-3xl mt-20 mb-12">
        Repository List of {githubUsername}
        <hr className="mt-2 w-1/2 mx-auto"></hr>
      </div>

      {/* repos grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-3 gap-x-10 gap-y-10 mt-4">
        {repoList.map((item, idx) => {
          return (
            <Card key={idx}>
              <CardHeader>
                <CardTitle>
                  <a
                    href={item.githubLink}
                    target="_blank"
                    className="hover:underline text-blue-500"
                  >
                    {item.name}
                  </a>
                </CardTitle>

                {item.language !== null ? (
                  <CardDescription>
                    Languages used: {item.language}
                  </CardDescription>
                ) : null}
                {item.description !== null ? (
                  <CardDescription>
                    {item.description?.substring(0, 120) + "..."}
                  </CardDescription>
                ) : (
                  <></>
                )}
              </CardHeader>

              <CardContent>
                <div className="flex justify-between">
                  <span className={item.stars == 0 ? "text-gray-400" : ""}>
                    Stars⭐ {item.stars}
                  </span>{" "}
                  <span className={item.forks == 0 ? "text-gray-400" : ""}>
                    Forks🍴 {item.forks}
                  </span>
                </div>
              </CardContent>
            </Card>
          );
        })}
      </div>
      <hr className="mt-10"></hr>
    </div>
    </>
  );
};

export default RepoList;
