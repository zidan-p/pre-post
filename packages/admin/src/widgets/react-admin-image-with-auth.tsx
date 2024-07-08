import { useRecordContext } from "react-admin";
import { ImageWithAuth } from "../shared/components/image-with-auth";
import { CSSProperties } from "react";

interface ReactAdminImageWithAuthProps {
  source: string;
  style?: CSSProperties;
  imageSrc?: string | undefined;
}


export function ReactAdminImageWithAuth(props : ReactAdminImageWithAuthProps){
  const record = useRecordContext();

  if(record[props.source] === undefined) return null
  return (
    <ImageWithAuth 
      style={props.style} 
      url={
        props.imageSrc 
        ? record[props.source][props.imageSrc] 
        : record[props.source]} 
      />
    )
}