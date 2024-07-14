import { requestor } from "@services/prepost.backend/requestor";
import React, { CSSProperties, useEffect, useState } from "react"

interface ImageWithAuthProps {
  url: string;
  style?: CSSProperties;
}

const ImageWithAuthStyle: React.CSSProperties = {
  maxWidth: '100px',
}

/**
 * ad auth to image request
 * @param param0 
 * @returns 
 */
export const ImageWithAuth: React.FC<ImageWithAuthProps> = ({ url, style }) => {

  const [fetchedImage, setFetchedImage] = useState<string | undefined>()
  const img: React.Ref<HTMLImageElement> = React.createRef()

  useEffect(() => {
    requestor
      .get(`${url}`, {
        responseType: 'arraybuffer',
        headers: {
          Accept: 'image/jpeg',
        },
      })
      .then((res) => {
        const blob = new Blob([res.data], {
          type: 'image/jpeg',
        })

        const objectURL = URL.createObjectURL(blob)
        setFetchedImage(objectURL)
      })
  }, [url])


  useEffect(() => {
  // Make sure img.current is not null and image is fetched
    if (img.current && fetchedImage) {
      img.current.src = fetchedImage
    }
  }, [fetchedImage])

  return <img src={''} alt={'Loading...'} style={ style ?? ImageWithAuthStyle} ref={img} />
}