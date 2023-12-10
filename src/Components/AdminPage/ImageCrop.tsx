import React, {FunctionComponent, useEffect, useState} from "react";
import Cropper from "react-easy-crop";
import getCroppedImg from './CropImage'
import Button from "../StyledComponents/Button";
import {ISize} from "../../Domain/ISize";

interface IProps {
  image: File | undefined;
  size: ISize;
  saveImage: (image: File | null) => void;
}


const ImageCrop: FunctionComponent<IProps> = (props) => {

  const [crop, setCrop] = useState({x: 0, y: 0});
  const [zoom, setZoom] = useState(1);
  const [cropArea, setCropArea] = useState(null);
  const [image, setImage] = useState<string>('');

  useEffect(() => {
    setupImage().catch(e => console.error(e));
  }, []);

  const onCropChange = (crop: any) => {
    setCrop(crop);
  };

  const onCropComplete = (croppedArea: any, croppedAreaPixels: any) => {
    setCropArea(croppedAreaPixels);
  };

  const onZoomChange = (zoom: number) => {
    setZoom(zoom);
  };


  function readFile(file: File): Promise<string> {
    return new Promise((resolve) => {
      const reader = new FileReader();
      reader.addEventListener('load', () => resolve(reader.result as string), false);
      reader.readAsDataURL(file);
    });
  }

  const setupImage = async () => {
    if (props.image) {

      let imageDataUrl = await readFile(props.image)

        setImage(imageDataUrl);

    }
  }

  const handleCropImage = async () => {
    try {
      if (cropArea) {
        const croppedImage = await getCroppedImg(
          image,
          cropArea
        );
        props.saveImage(croppedImage);
      }


    } catch (e) {
      console.error(e)
    }
  }


  return (
    <div style={{position: 'relative', height: 622, width: 800}}>
      {image && (
        <Cropper
          style={{containerStyle: {height: 570, width: '100%'}}}
          image={image}
          crop={crop}
          zoom={zoom}
          aspect={4 / 3}
          onCropChange={onCropChange}
          onZoomChange={onZoomChange}
          onCropComplete={onCropComplete}
          //cropSize={{width: 790, height: 520}}
          cropSize={{width: props.size.width, height: props.size.height}}
        />
      )}
      <Button style={{position:'absolute', bottom:0, left:320}} onClick={handleCropImage} text='Crop Image'/>
    </div>
  );
}

export default ImageCrop;
