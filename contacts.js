import { readFile, writeFile } from 'fs/promises'
import path from 'path';
import { fileURLToPath } from 'url';
import { nanoid } from 'nanoid';

const contactsPath = path.join(fileURLToPath(import.meta.url), '..', 'db', 'contacts.json');

// TODO: задокументувати кожну функцію
export async function listContacts() {
    return JSON.parse(await readFile(contactsPath));
}

export async function getContactById(contactId) {
    const contacts = await listContacts();
    return contacts.find((contact) => contact.id == contactId) || null;
}

export async function removeContact(contactId) {
    const contacts = await listContacts();
    
    const removeContactIndex = contacts.findIndex((contact) => contact.id == contactId);

    if (removeContactIndex == -1) {
        return null;
    }

    const removeContact = contacts.splice(removeContactIndex, 1);

    await writeFile(contactsPath, JSON.stringify(contacts, null, 2));

    return removeContact;
}

export async function addContact({name, email, phone}) {
    const contacts = await listContacts();

    const newContacts = {
        id: nanoid(),
        name,
        email,
        phone
    }

    contacts.push(newContacts);

    await writeFile(contactsPath, JSON.stringify(contacts, null, 2));

    return newContacts;
}
