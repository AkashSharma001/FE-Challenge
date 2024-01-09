import { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import { getAnalysis } from "../../api/getAnalysis";
import { Breadcrumbs, CircularProgress, Container, Typography } from "@mui/joy";
import {
  AnalysisArray,
  InterfaceAnalysisDataItemType,
} from "../../types/types";
import {AnalysisCard} from "../../components/AnalysisCard";

const AnalysisPage = () => {
  const { MODEL_NAME } = useParams<string>();
  const [analysis, setAnalysis] = useState<InterfaceAnalysisDataItemType>({
    data: [],
    loading: true,
  });

  useEffect(() => {
    const fetchData = async () => {
      try {
        if (MODEL_NAME) {
          const { data, loading } = await getAnalysis(MODEL_NAME);
          setAnalysis({ data: data as unknown as AnalysisArray[], loading });
          console.log(data);
        }
      } catch (error) {
        console.error("Error fetching analysis data:", error);
      }
    };

    fetchData();
  }, [MODEL_NAME]);

  return (
    <Container>
      <Breadcrumbs aria-label="breadcrumbs">
        <Link to="/inventory">Inventory</Link>

        <Typography textColor={"neutral.400"}>
          {MODEL_NAME} Analysis
        </Typography>
      </Breadcrumbs>

      <Typography level="h3" fontWeight={600} marginLeft={1}>
        {MODEL_NAME} Analysis
      </Typography>
      {!analysis.loading &&
        analysis.data!.map((data) => (
          <AnalysisCard analysisData={data as AnalysisArray} />
        ))}
      {analysis.loading && (
        <div className="flex justify-center m-auto h-[75vh] items-center w-full">
          <CircularProgress variant="solid" />
        </div>
      )}
    </Container>
  );
};

export default AnalysisPage;