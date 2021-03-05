const mongoose = require('mongoose')
const express = require('express')
const cors = require('cors')
const bodyParser = require('body-parser')
const fileUpload = require('express-fileupload')
const path = require('path')

async function main () {
  await mongoose.connect('mongodb+srv://root:wOMd9dfxvtKbdWZNW9pj@cluster0.lgcde.mongodb.net/oxouno?retryWrites=true&w=majority',
    {
      useFindAndModify: false,
      useNewUrlParser: true,
      useUnifiedTopology: true
    }
  )

  const Schema = mongoose.Schema

  const Page = mongoose.model('pages', new Schema({
    name: {
      type: String,
      default: ''
    },
    author: {
      type: String,
      default: ''
    },
    html: {
      type: String,
      default: ''
    },
    date: {
      type: Number,
      required: true
    }
  }))

  const app = express()
  app.use(cors())
  app.use(bodyParser.json())
  app.use(fileUpload({
    limits: { fileSize: 8 * 1024 * 1024 }
  }))

  app.get('/society/page', async (request, response) => {
    if (request.query.id) {
      response.json(await Page.findById(request.query.id))
    } else {
      response.json(await Page.find({}).select({ 'html': 0 }))
    }
  })

  app.post('/society/page', async (request, response) => {
    const page = new Page({
      name: request.body.name,
      author: request.body.author,
      html: request.body.html,
      date: Date.now()
    })
    await page.save()
    response.sendStatus(200)
  })

  app.delete('/society/page', async (request, response) => {
    await Page.deleteOne({ _id: request.query.id })
    response.sendStatus(200)
  })

  app.post('/society/save-image', async (request, response) => {
    const file = request.files.file;

    const newFileName = (new Date(Date.now()).toLocaleString()).replace(/\D/g, 'x') +
      '-' +
      Math.random().toString(32).substring(2, 8) +
      '-' +
      file.name

    const uploadPath = path.join(__dirname, '../app/static/society-resource/', newFileName)

    console.log(uploadPath)

    file.mv(uploadPath, err => {
      if (err) {
        console.log(err)
        response.sendStatus(500)
        return
      }
    })

    response.json({ location: '/society-resource/' + newFileName  })
  })

  app.listen(6020)
}

main()
