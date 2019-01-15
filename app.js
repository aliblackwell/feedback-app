var db = new PouchDB('my_database');
console.log('Hello world')
console.log(db)

var doc = {
  "_id": "messages",
  "messages": [
    "I'm a test message hard-coded in the app",
    "I'm another hard-coded message and I'm a bit longer than the first message to make sure we create a stylesheet that works for long messages as well as short ones.",
    "I'm another",
    "And another"
  ]
};


db.get('messages').then(function (doc) {
  console.log(doc);
});

const form = document.querySelector('form')
form.addEventListener('submit', event => {
  event.preventDefault()
  console.log(event)
  const newMessage = document.querySelector('textarea').value
  console.log(newMessage)
  db.get('messages').then(doc => {
    doc.messages.push(newMessage)
    return db.put(doc)
  }).catch(err => {
    console.log(err)
  })
})

