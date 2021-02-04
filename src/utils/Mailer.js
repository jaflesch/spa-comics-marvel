import emailjs from 'emailjs-com'
import Project from './Project'

class Mailer {
    constructor(params) {
        this.serviceId = Project.emailJs.serviceId
        this.templateId = Project.emailJs.templateId
        this.userId = Project.emailJs.userId
        this.replyTo = Project.emailJs.replyTo
        this.templateParams = params
    }

    setParams(params) {
        /*
            subject: ..
            message: ..
            sendTo: ..
        */
        this.params = params
    }

    send(callbackSuccess, callbackError) {
        return emailjs.send(
            this.serviceId, 
            this.templateId, 
            this.params, 
            this.userId
        )
        .then((response) => {
            if(typeof callbackSuccess === "function") callbackSuccess(response)
        }, (error) => {
            if(typeof callbackError === "function") callbackError(error)
        })
    }
}

export default Mailer