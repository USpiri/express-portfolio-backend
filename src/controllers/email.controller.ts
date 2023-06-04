import { SendMailOptions, createTransport } from 'nodemailer'
import { findUser } from '../services/user'
import { handleHttp } from '../utils/error.handle'
import { Request, Response } from 'express'
import { Email } from '../interfaces/email.interface'
import { HTML_TEMPLATE } from '../utils/email.handle'

const MAIL = process.env.NODEMAILER_EMAIL
const PASS = process.env.NODEMAILER_PASS

const transporter = createTransport({
  service: 'gmail',
  host: 'smtp.gmail.com',
  port: 587,
  secure: false,
  auth: {
    user: MAIL,
    pass: PASS
  }
})

const sendEmail = async ({ body, params }: Request, res: Response): Promise<void> => {
  try {
    const { id } = params
    const { name, email, subject, message }: Email = body
    const user = await findUser(id)
    if (user === null) {
      handleHttp(res, 'ERROR_USER_NOT_FOUND', { code: 404 })
      return
    }

    const mailOptions: SendMailOptions = {
      from: MAIL,
      to: user.email,
      subject,
      text: message,
      html: HTML_TEMPLATE(name, email, message)
    }

    transporter.sendMail(mailOptions, (err, _info) => {
      if (err != null) {
        handleHttp(res, 'ERROR_SENDING_EMAIL', { code: 500, errorRaw: err })
      } else {
        res.send({ status: 'Mail sended' })
      }
    })
  } catch (error) {
    handleHttp(res, 'ERROR_MAIL_SENDER', { errorRaw: error })
  }
}

export { sendEmail }
