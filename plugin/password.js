const bcrypt = require('bcrypt');
const saltRounds = 10; // ise baadmein .env mein daal diyo
const password = async (str1 , pass , str2 ) => {

    const hash = await bcrypt.hashSync(str1+pass+str2, saltRounds);
    const hash15 = hash.slice(0,15);
    return hash15;

}

export default password ;