import { Typography } from "@mui/joy";
import { Link } from "react-router-dom";
import { ModelDataTypes } from "../types/types";

export const InventoryCard: React.FC<{ model: ModelDataTypes }> = ({ model }) => (
  <Link to={`/analysis/${model.model_name}`}>
    <div className="flex flex-row justify-between items-center  bg-white p-4 m-4 rounded-lg shadow-md transition duration-300 ease-in-out transform hover:shadow-none border-2 hover:bg-[#f0f0fc] border-transparent hover:border-[#69aaff]">
      <Typography
        level="body-lg"
        sx={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
        }}
        width="20%"
      >
        <span>{model.model_name}</span>
        <span className="font-bold text-[#8E98FF] rounded-lg border-[3px] border-[#8E98FF] px-2 py-1 hidden sm:inline">
          v{model.model_version}
        </span>
      </Typography>
      <Typography
        level="body-md"
        sx={{
          padding: "4px 10px",
          borderRadius: "20px",
          border: "2px solid #8E98FF",
        }}
      >
        {model.model_type}
      </Typography>
    </div>
  </Link>
);
