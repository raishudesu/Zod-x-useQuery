import { useQuery } from "@tanstack/react-query";
import { BiLoaderAlt } from "react-icons/bi";
import { z, ZodType } from "zod";
import "../App.css";

const CatFactsZod = () => {
  type FactSchemaType = ZodType<{
    data: {
      fact: string;
      length: number;
    }[];
  }>;
  const FactSchema: FactSchemaType = z.object({
    data: z.array(z.object({ fact: z.string(), length: z.number() })),
  });
  const getFacts = async () => {
    try {
      const res = await fetch("https://catfact.ninja/facts");
      const data = (await res.json()) as FactSchemaType;
      try {
        const parsedData = FactSchema.parse(data);
        return parsedData.data;
      } catch (error) {
        console.log("Data parsing error:", error);
        return null;
      }
    } catch (error) {
      console.log(error);
      return null;
    }
  };
  const {
    isLoading,
    isSuccess,
    data: facts = [],
  } = useQuery({
    queryKey: ["facts"],
    queryFn: getFacts,
    refetchOnWindowFocus: false,
  });

  return (
    <div className="container">
      <div className="sub-container">
        <h1>10 Facts</h1>
        {isLoading ? <BiLoaderAlt size={30} /> : null}
        <div className="list">
          {isSuccess
            ? facts?.map(({ fact }, index) => {
                return (
                  <div key={index}>
                    <p>
                      <span className="fact">Fact#{index + 1}:</span> {fact}
                    </p>
                  </div>
                );
              })
            : null}
        </div>
      </div>
    </div>
  );
};

export default CatFactsZod;
