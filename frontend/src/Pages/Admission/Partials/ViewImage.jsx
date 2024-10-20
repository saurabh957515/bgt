import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { classNames } from '../../../provider';

const ViewImage = ({ imageDoc ,className}) => {
    const [photoPreview, setPhotoPreview] = useState('')
    useEffect(() => {
        if (imageDoc) {
            const fetchFile = async (id, type) => {
                try {
                    const response = await axios.get(
                        `/api/file/${id}`,
                        {
                            responseType: "blob",
                        }
                    );
                    return URL.createObjectURL(response.data);
                } catch (error) {
                    console.error("Error fetching file:", error);
                }
            };

            const fetchFiles = async () => {
                if (imageDoc) {
                    const photoUrl = await fetchFile(
                        imageDoc,
                        "photo"
                    );
                    setPhotoPreview(photoUrl);
                }
            };
            fetchFiles(imageDoc)

        }
    }, [
        imageDoc
    ]);
    return (
        <div>
            <img
                src={photoPreview || "data:image/gif;base64,R0lGODlhAQABAIAAAAUEBA=="}
                alt="Photo Preview"
                className={classNames("object-cover w-full bg-gray-100  ",className)}
            />
        </div>
    );
}

export default ViewImage;
