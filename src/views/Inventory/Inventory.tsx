import { getModels } from "../../api/getModels";
import { useCallback, useEffect, useState } from "react";
import CircularProgress from "@mui/joy/CircularProgress";
import { InventoryCard } from "../../components/InventoryCard";
import { Button, ButtonGroup, Container, Input, } from "@mui/joy";
import { ModelDataTypes, ModelsType } from "../../types/types";

const InventoryPage = () => {
  const [models, setModels] = useState<ModelsType>({ data: [], loading: true });
  const [searchTerm, setSearchTerm] = useState<string>("");
  const [sortOrder, setSortOrder] = useState<"asc" | "desc">("asc");

  const applyFilters = useCallback(
    (data: ModelDataTypes[]): ModelDataTypes[] => {
      return searchTerm.trim()
        ? data.filter((model) =>
            model.model_name.toLowerCase().includes(searchTerm.toLowerCase())
          )
        : data;
    },
    [searchTerm]
  );

  const sortModels = useCallback(
    (data: ModelDataTypes[]): ModelDataTypes[] => {
      const sortedData = [...data];
      sortedData.sort((a, b) => {
        const nameA = a.model_name.toLowerCase();
        const nameB = b.model_name.toLowerCase();
        return sortOrder === "asc"
          ? nameA.localeCompare(nameB)
          : nameB.localeCompare(nameA);
      });
      return sortedData;
    },
    [sortOrder]
  );

  const fetchModels = useCallback(async () => {
    try {
      const modelsData = await getModels();
      const filteredModels = applyFilters(modelsData.data as ModelDataTypes[]);
      setModels({
        data: sortModels(filteredModels),
        loading: modelsData.loading,
      });
    } catch (error) {
      console.error("Error fetching models:", error);
      setModels({ data: [], loading: false });
    }
  }, [applyFilters, setModels, sortModels]);

  useEffect(() => {
    fetchModels();
  }, [sortOrder, fetchModels]);

  const handleSearchButtonClick = () => {
    if (searchTerm.trim()) {
      setModels({ data: [], loading: true });
      fetchModels();
    }
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchTerm(() => e.target.value);
  };

  return (
    <Container>
      <div className="flex flex-col mt-4">
        <div className="flex items-center justify-end gap-4 w-full mb-4  px-4">
          <div className="flex overflow-hidden rounded-[12px_12px_0_0] shadow-custom bg-white">
            <Input
              placeholder="Search model..."
              value={searchTerm}
              onChange={(e) => handleInputChange(e)}
              sx={{
                "--Input-focusedThickness": "0px",
                "--Input-radius": "0px",
                "--Input-placeholderOpacity": 0.3,
                backgroundColor: "#f0f0fc",

                "&:hover": {
                  boxShadow: "none",
                  border: "2px solid transparent",
                  borderTopLeftRadius: "12px",
                  borderColor: "#69aaff",
                },
              }}
              variant="plain"
            />

            <Button
              variant="plain"
              size="lg"
              onClick={handleSearchButtonClick}
              sx={{
                backgroundColor: "#8E98FF",
                color: "#fff",
                borderRadius: "12px 12px 0 12px",
                margin: "1px",
                "&:hover": {
                  backgroundColor: "#7a86ff",
                },
              }}
            >
              Go
            </Button>
          </div>
          <ButtonGroup
            variant="plain"
            sx={{
              borderRadius: "12px 12px 0 0",
              boxShadow:
                "rgba(0, 0, 0, 0.12) 0px 1px 3px, rgba(0, 0, 0, 0.24) 0px 1px 2px",
            }}
          >
            <Button
              variant="plain"
              size="lg"
              onClick={() => setSortOrder("asc")}
              sx={{
                backgroundColor: sortOrder === "asc" ? "#8E98FF" : "#FFF",
                borderRadius: "12px 0 0 0",
                color: sortOrder !== "asc" ? "#8E98FF" : "#FFF",
                "&:hover": {
                  backgroundColor: sortOrder === "asc" ? "#8E98FF" : "#d4d8fc",
                  color: "#FFF",
                  fontSize:"24px"
                },
                textWrap:"nowrap"
              }}
            >
              A-Z
            </Button>
            <Button
              variant="plain"
              size="lg"
              onClick={() => setSortOrder("desc")}
              sx={{
                backgroundColor: sortOrder === "desc" ? "#8E98FF" : "#FFF",
                borderRadius: "0 12px 0 0",
                color: sortOrder !== "desc" ? "#8E98FF" : "#FFF",
                "&:hover": {
                  backgroundColor: sortOrder === "desc" ? "#8E98FF" : "#d4d8fc",
                  color: "#FFF",
                },
                textWrap:"nowrap"
              }}
            >
              Z-A
            </Button>
          </ButtonGroup>
        </div>
        <div className="">
          <div className="flex flex-row justify-between items-center bg-white font-bold p-4 m-4 rounded-lg shadow-custom border border-none">
            <span className="capitalize">Model</span>
            <span className="capitalize">Type</span>
          </div>
          {models &&
            models.data.map((model: ModelDataTypes) => (
              <InventoryCard key={model.model_name} model={model} />
            ))}

          {models.loading && (
            <div className="flex justify-center items-center w-full h-[50vh]">
              <CircularProgress variant="solid" />
            </div>
          )}
        </div>
      </div>
    </Container>
  );
};

export default InventoryPage;
