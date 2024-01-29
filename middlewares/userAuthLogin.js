const DatabaseSingleton = require("../config/ConfigDB");
const databaseInstance = new DatabaseSingleton();

async function userLogin (email, senha) {

     try {
        sqlConsultaCad = 'SELECT ID, Nome FROM usuarios WHERE email = ? AND senha = ?';
        
        let verificador;

        const login = await new Promise((resolve, reject) => { databaseInstance.db.get(sqlConsultaCad, [email, senha], (err, row) => {
            if (err) {
                reject(err);
            } else {
                verificador = row;
                resolve(row);
            }
        });

        });
        
        if(verificador){
            db.close();
            return true;
        }

        db.close();
        return false;
    } catch (err) {
        console.error(err);
        db.close();
        return false;
    }
 }

module.exports = userAuthLogin;