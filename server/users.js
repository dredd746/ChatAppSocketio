const users = [];

const addUser = ({id,name,room}) =>{
    if (name != undefined && room != undefined)
    {
    name = name.trim().toLowerCase();
    room = room.trim().toLowerCase();
    const user = {id,name,room};

    const existingUser = () => {
        user.find(user => user.room === room && user.name === name);
    };
    if (existingUser) {
        return
    }
    else {
        users.push(user);
    }
    }
};
const removeUser = (id) => {
    const index = users.findIndex((user) => user.id === id);
    if (index !== -1){
        return users.splice(index,1)[0];
    }

};
const getUser = (id) => users.find((user) => user.id === id);
const getUsersInRoom = (room) => {
    return users.filter((user) => user.room === room);
};

module.exports = {addUser,removeUser,getUser,getUsersInRoom};