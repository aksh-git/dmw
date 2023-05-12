const MONGO_URI = 'mongodb://0.0.0.0:27017/DesignMyWear'
const DEBUG = true
const JWT_SECRET = "THIS_IS_A_SECRET"
const ADMIN_EMAIL = 'admin@demo.com'
const ADMIN_PASS = 'admin'

export default{
    MONGO_URI,
    DEBUG,
    JWT_SECRET,
    ADMIN : {
        email : ADMIN_EMAIL,
        pass : ADMIN_PASS
    }    
}