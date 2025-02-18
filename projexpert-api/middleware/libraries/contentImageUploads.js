import multer from "multer";
import path from 'path';
import CustomError from "../../helpers/Error/CustomError.js";

//Storage
const storage = multer.diskStorage({
    destination: function (req, file, cb) { //Yüklenecek dosya yolunu verdik
        const destination = path.join(process.cwd(), 'public/uploads/content'); //ana dizin ile yüklenecek olan klasörü birleştirdik
        cb(null, destination);
    },
    filename: function (req, file, cb) { //Yüklenecek dosyaya isimlendirme yaptık
        //File/Mimetype => image/png
        const extension = file.mimetype.split("/")[1];
        let num = String(Math.floor(Math.random() * 10000000000000)) //req.user.id
        //req.savedContentImage = "image_" + req.user.id + "." + extension;
        req.savedContentImage = `image_${req.user.id}_${num}.${extension}`
        cb(null, req.savedContentImage);
    }
})

//Filter : dosya türüne göre filtreleme yapar aşağıda geçerli mimetype ları verdik eğer onlardan biri değilse yükleme yapmaz 
const fileFilter = (req, file, cb) => {
    let allowedMimeTypes = ["image/jpg", "image/gif", "image/jpeg", "image/png"];

    if (!allowedMimeTypes.includes(file.mimetype)) {
        return cb(new CustomError("Please provide a valid image file", 400), false)
    }
    return cb(null, true);
}
//Yaptığımız tüm bu işlemleri multer içerisine dahil ettik ve profileImageUPloads adı altında bir middleware e dönüştürdük.
export const contentImageUpload = multer({ storage, fileFilter });