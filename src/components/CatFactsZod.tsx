import { useQuery } from "@tanstack/react-query";
import { BiLoaderAlt } from "react-icons/bi";
import { z } from "zod";

const CatFactsZod = () => {
  type Facts = {
    fact: string;
    length: number;
  };
  const FactSchema = z.object({
    fact: z.string(),
    length: z.number(),
  });

  const getFacts = async () => {
    try {
      const res = await fetch("https://catfact.ninja/fact");
      const data = await res.json();
      try {
        const parsedData = FactSchema.parse(data) as Facts;
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
    isLoading,
    isSuccess,
    data: fact = null,
    refetch,
  } = useQuery({
    queryKey: ["fact"],
    queryFn: getFacts,
    refetchOnWindowFocus: false,
  });

  return (
    <div>
      {isLoading ? <BiLoaderAlt size={20} /> : null}
      <p>{isSuccess ? fact?.fact : null}</p>
      <button onClick={() => refetch()}>Next</button>
    </div>
  );
};

export default CatFactsZod;
