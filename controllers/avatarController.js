const shortid = require('shortid');
const multer = require('multer');


 const newAvatar = async (req, res, next) => {

    const multerConfig = {
        limits: {
            fileSize:  (1024 * 1024 * 3)
        },
        storage: multer.diskStorage({
            destination: (req, file, cb) => {
                cb(null, 'avatar')
            },
            filename: (req, file, cb) => {
                // const extension = file.mimetype.split('/')[1]; //erros on pdf files mimetype
                const extension = file.originalname.substring(file.originalname.lastIndexOf('.'), file.originalname.length);
                cb(null, `${shortid.generate()}${extension}`)
            }
        })
    }

    const upload = multer(multerConfig).single('file');

    upload(req, res, async (error) => {
        if (!error) {
            res.status(200).json({
                file: req.file?.filename
            })
            
        } else {
            console.log(error)
            return next()
        }
    });
}

module.exports = newAvatar;