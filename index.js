const { addContact, getContactById, listContacts, removeContact } = require('./contacts.js');
const { program } = require('commander');

async function invokeAction({ action, id, name, email, phone }) {
  switch (action) {
      case "list":
          const contactsList = await listContacts();
          console.table(contactsList);
          break;

      case "get":
          const contactsById = await getContactById(id);
          console.log(contactsById);
          break;

      case "add":
          const contactsAdd = await addContact({ name, email, phone });
          console.log(contactsAdd);
          break;

      case "remove":
          const contactsRemove = await removeContact(id);
          console.log(contactsRemove);
          break;

      default:
          console.warn("\x1B[31m Unknown action type!");
    }
}

// invokeAction({ action: 'list' })
// invokeAction({ action: 'get', id: 'AeHIrLTr6JkxGE6SN-0Rw' })
// invokeAction({ action: 'add', name: 'Balik', email: 'balik@gmail.com', phone: '11-111-11' })
// invokeAction({ action: 'remove', id: 'tj3t5vdCgNEAzpMP-QHhN' });

program
    .option("-a, --action <type>", "choose action")
    .option("-i, --id <type>", "user id")
    .option("-n, --name <type>", "user name")
    .option("-e, --email <type>", "user email")
    .option("-p, --phone <type>", "user phone");

program.parse();

const { action, id, name, email, phone } = program.opts();
invokeAction({action, id, name, email, phone})
