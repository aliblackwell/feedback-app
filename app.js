var db = new PouchDB('app_database')


db.get('messages').then(function (doc) {
  renderMessages(doc);
}).catch(function (e) {
  if (e.message == 'missing') {
    db.put({
      "_id": "messages",
      "messages": [
        "I'm a test message hard-coded in the app"
      ]
    }).then(function (response) {
      db.get('messages').then(function (doc) {
        renderMessages(doc)
      })
    })
  }
})

function renderMessages(doc) {
  const formattedMessages = doc.messages.map(msg => `<p class="message-item">${msg}</p>`).join('')
  document.querySelector('#messages-container').innerHTML = formattedMessages
}


const form = document.querySelector('form')
form.addEventListener('submit', event => {
  event.preventDefault()

  const newMessage = document.querySelector('textarea').value

  db.get('messages').then(doc => {
    doc.messages.push(newMessage)
    renderMessages(doc)
    document.querySelector('textarea').value = ''
    return db.put(doc)
  }).catch(err => {
    console.log(err)
  })
})

db.replicate.to('https://feedback-app-db-server.aliblackwell.me:6984')

