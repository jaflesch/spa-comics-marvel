import React from 'react'

const projectContext = React.createContext({
    author: 'Jean Flesch',
    title: 'SoftDesign React Challenge',
    emailJs: {
        serviceId: '23g3lpb',
        templateId: 'marvelcomic',
        userId: 'user_t6yHlRRXjluyONK5MfslZ',
        replyTo: 'jean.flesch93@gmail.com'
    },
    selectedCards: []
})

export default projectContext