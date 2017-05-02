import Image from "../models/image";

function saveCommandImage(command, url) {
    return Image.create(command, url);
}

function getCommandImage(command) {
    return Image.get(command);
}

function listCommandImages() {
    return Image.all();
}

function deleteCommandImage(command) {
    return Image.delete(command);
}

export default { saveCommandImage, getCommandImage, listCommandImages, deleteCommandImage };
