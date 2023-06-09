const { readFile, writeFile } = require('fs/promises');
const path = require('path');
const shortid = require('shortid');

const contactsPath = path.join(__dirname, 'db', 'contacts.json');

// TODO: задокументувати кожну функцію
async function listContacts() {
    try{
        return JSON.parse(await readFile(contactsPath));
    } catch (error) {
        return error.message;
    }
}

async function getContactById(contactId) {
    try {
        const contacts = await listContacts();
        return contacts.find((contact) => contact.id == contactId) || null;
    } catch (error) {
        return error.message;
    }
}

async function removeContact(contactId) {
    try {
        const contacts = await listContacts();
    
        const removeContactIndex = contacts.findIndex((contact) => contact.id == contactId);

        if (removeContactIndex == -1) {
            return null;
        }

        const removeContact = contacts.splice(removeContactIndex, 1);

        await writeFile(contactsPath, JSON.stringify(contacts, null, 2));

        return removeContact;
    } catch (error) {
        return error.message;
    }
}

async function addContact({ name, email, phone }) {
    try {
        const contacts = await listContacts();

        const newContacts = {
            id: shortid.generate(),
            name,
            email,
            phone
        }

        contacts.push(newContacts);

        await writeFile(contactsPath, JSON.stringify(contacts, null, 2));

        return newContacts;
    } catch (error) {
        return error.message;
    }
}

module.exports = {
    listContacts,
    getContactById,
    removeContact,
    addContact
}
