const savedSession = require("../../models/saveSession");

const saveSession = async (web, location, id) => {
  try {
    let data = await savedSession.findOne({ _id: id });
    if (data == null) {
      const newUser = new savedSession({
        _id: id,
        sessions: [
          {
            web: web,
            time: Date.now(),
            location: location,
          },
        ],
      });
      data = await newUser.save();
    } else {
      const object = {
        web: web,
        time: Date.now(),
        location: location,
      };
      data.sessions = data.sessions.concat(object);
      await data.save();
    }
  } catch (err) {
    console.log(err);
  }
};

module.exports = saveSession;
