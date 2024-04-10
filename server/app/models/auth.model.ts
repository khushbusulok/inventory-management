import db from "../schema/index.schema";

const checkUserIsExist = async (email: String) => {
    try {
      const result = await db.user.findOne({email});
      return result;
    } catch (error) {
      return null;
    }
  };

  const addUser = async (reqData: any) => {
    const user =  db.user
    const data = new user(reqData)
    try {
        const result = await data.save();
        return result;
    } catch (error) {
        return null;
    }
  }

  export {
    checkUserIsExist,
    addUser
  }