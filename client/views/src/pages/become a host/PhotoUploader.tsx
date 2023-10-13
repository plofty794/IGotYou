/* eslint-disable @typescript-eslint/ban-ts-comment */
import { Dispatch } from "react";
import { FilePond, registerPlugin } from "react-filepond";
import "filepond/dist/filepond.min.css";
import "filepond-plugin-image-preview/dist/filepond-plugin-image-preview.css";
import "filepond/dist/filepond.min.css";
import FilePondPluginImageExifOrientation from "filepond-plugin-image-exif-orientation";
import FilePondPluginImagePreview from "filepond-plugin-image-preview";
import FilePondPluginFileValidateType from "filepond-plugin-file-validate-type";
import FilePondPluginFileEncode from "filepond-plugin-file-encode";

import { useOutletContext } from "react-router-dom";
registerPlugin(
  FilePondPluginImageExifOrientation,
  FilePondPluginImagePreview,
  FilePondPluginFileValidateType,
  FilePondPluginFileEncode
);

type TFileType = {
  name: string;
  id: string;
};

type TListing = {
  serviceType: string;
  serviceDescription?: string;
  listingPhotos: TFileType[];
};

type TSetServiceProps = {
  setService: Dispatch<React.SetStateAction<TListing>>;
  service: TListing;
};

function PhotoUploader() {
  const { setService } = useOutletContext<TSetServiceProps>();

  return (
    <FilePond
      name="filepond"
      allowFileEncode
      onaddfile={(_, file) => {
        setService((prev) => ({
          ...prev,
          listingPhotos: [
            ...prev.listingPhotos,
            { name: file.getFileEncodeDataURL(), id: file.id },
          ],
        }));
      }}
      onremovefile={(_, file) =>
        setService((prev) => ({
          ...prev,
          listingPhotos: prev.listingPhotos.filter((v) => v.id != file.id),
        }))
      }
      credits={false}
      acceptedFileTypes={["image/*"]}
      required
      allowMultiple={true}
      maxFiles={5}
    />
  );
}

export default PhotoUploader;
