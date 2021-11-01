import { CLOUDINARY_CLOUD_NAME, CLOUDINARY_PRESET } from '@env';

const uploadImages = async function (images) {
    const imageUploads = await Promise.all(
        images.map(async (image) => {
            const data = new FormData();
            data.append('file', image);
            data.append('upload_preset', CLOUDINARY_PRESET);
            data.append('cloud_name', CLOUDINARY_CLOUD_NAME);
            const response = await fetch(`https://api.cloudinary.com/v1_1/${CLOUDINARY_CLOUD_NAME}/image/upload`, {
                method: 'post',
                body: data,
            });

            return response.json();
        }),
    );
    const imagesUrls = [];
    imageUploads.map((imageUpload) => {
        imagesUrls.push(imageUpload.url);
        return {};
    });
    return imagesUrls;
};

export default uploadImages;
