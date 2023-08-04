import { useQuery } from "@tanstack/react-query";
import { BiLoaderAlt } from "react-icons/bi";
import { z, ZodType } from "zod";

const CatFactZod = () => {
  type Fact = ZodType<{
    fact: string;
    length: number;
  }>;
  const FactSchema: Fact = z.object({
    fact: z.string(),
    length: z.number(),
  });

  const getFacts = async () => {
    try {
      const res = await fetch("https://catfact.ninja/fact");
      const data = (await res.json()) as Fact;
      try {
        const parsedData = FactSchema.parse(data);
        return parsedData;
      } catch (error) {
        console.log("Data parsing error:", error);
        return null;
      }
    } catch (error) {
      console.log(error);
    }
  };
  const {
    isFetching,
    isSuccess,
    data: fact = null,
    refetch,
  } = useQuery({
    queryKey: ["fact"],
    queryFn: getFacts,
    refetchOnWindowFocus: false,
    enabled: false,
  });

  return (
    <div className="container">
      <div className="sub-container">
        <h1>Random Fact</h1>
        {isFetching ? <BiLoaderAlt size={20} /> : null}
        <p>{isSuccess ? fact?.fact : null}</p>
        <button onClick={() => refetch()}>Randomize</button>
      </div>
    </div>
  );
};

export default CatFactZod;
