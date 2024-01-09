
export interface InterfaceAnalysisDataItemType {
    data: AnalysisDataArray | null[];
    loading: boolean;
  }
  
export  type AnalysisArray = InterfaceAnalysisData[];
  
export  type AnalysisDataArray = AnalysisArray[];
  
export interface InterfaceAnalysisData {
    origin: string;
    value:
      | {
          PetalWidthCm: number;
          SepalWidthCm: number;
          PetalLengthCm: number;
          SepalLengthCm: number;
        }
      | string[];
    insight_name: string;
    name: string;
  }
  

 export type ModelsType = {
    data: ModelDataTypes[];
    loading: boolean;
  };
  
  export type ModelDataTypes = {
    job_id: string;
    model_name: string;
    model_type: string;
    model_version: number;
    num_categorical: number;
    num_continuous: number;
    pk: string;
    sk: string;
    ts_end: number;
    ts_start: number;
    ts_updated: number;
  };

  export interface AnalysisCardProps {
    analysisData: AnalysisArray;
  }
  
  export interface BarData {
    [key: string]: string | number;
  }