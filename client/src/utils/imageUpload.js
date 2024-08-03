// imageUpload.js

export const checkImage = (file) => {
    let err = ""
    if(!file) return err = "File does not exist."

    if(file.size > 1024 * 1024) // 1mb
    err = "The largest image size is 1mb."

    if(file.type !== 'image/jpeg' && file.type !== 'image/png' )
    err = "Image format is incorrect."
    
    return err;
}

export const imageUpload = async (images) => {
    let imgArr = [];
    for(const item of images){
        const formData = new FormData()

        if(item.camera){
            formData.append("file", item.camera)
        }else{
            formData.append("file", item)
        }
        
        const cloudName = "dvys5ctd6"; // Replace with your actual Cloudinary cloud name
        const uploadPreset = "my_upload_preset"; // Replace with your actual upload preset

        formData.append("upload_preset", uploadPreset);

        try {
            const res = await fetch(`https://api.cloudinary.com/v1_1/${cloudName}/image/upload`, {
                method: "POST",
                body: formData
            });
            
            const data = await res.json();
            imgArr.push({public_id: data.public_id, url: data.secure_url});
        } catch (error) {
            console.error("Error uploading image:", error);
        }
    }
    return imgArr;
}
