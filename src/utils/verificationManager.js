const crypto = require('crypto')

const initUserSeguridad = () => {
  const cryptoToken = crypto.randomBytes(16).toString('hex')
  const verified = false
  const restorePassword = false

  return { verified, cryptoToken, restorePassword }
}

const verifyUser = (user) => {
  const security = user.security || {}; // Si user.security es nulo o indefinido, establecer security como un objeto vacío

  return {
    verified: true,
    cryptoToken: null,
    restorePassword: security.restorePassword || false // Establecer restorePassword como false si security.restorePassword es nulo o indefinido
  }
}


const buildForgotPassword = (user) => {
  const cryptoToken = crypto.randomBytes(16).toString('hex')

  return {
    verified: user.security?.verified,
    cryptoToken,
    restorePassword: true
  }
}

const passwordReset = (user) => {
  return {
    verified: user.security?.verified,
    cryptoToken: null,
    restorePassword: false
  }
}

module.exports = { initUserSeguridad, verifyUser, buildForgotPassword, passwordReset }
