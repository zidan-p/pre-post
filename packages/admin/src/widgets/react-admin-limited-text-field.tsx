import { useRecordContext } from "react-admin";

interface ReactAdminLimitedTextFieldProps {
  source: string;
  maxChar?: number;
}

const DEFAULT_MAX_CHAR = 20;

export function ReactAdminLimitedTextField (props: ReactAdminLimitedTextFieldProps) {
  const record = useRecordContext();

  if(!record[props.source]) return null
  let str = record[props.source];
  return (
    <span>{str.length > 20 ?  str.slice(0, props?.maxChar ? props?.maxChar : DEFAULT_MAX_CHAR) + "..." : str}</span>
  ) 
};