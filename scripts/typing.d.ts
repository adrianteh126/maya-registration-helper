export interface RunProcessResponse {
  processMode:
    | 'CHECK_GLOBAL_MODULE'
    | 'GET_AVAILABLE_SMES'
    | 'SELECT_MODULE'
    | 'REMOVE_SELECTION'
  processResults: {
    noOfSmes?: number
    moduleCode?: string
    availableCount?: number
    selectIsValid?: 'Y' | 'N'
    [property: string]: any
  }
  [property: string]: any
}
