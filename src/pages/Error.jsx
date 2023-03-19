// import { Link } from 'react-router-dom'
// import PropTypes from 'prop-types'

// import './_error.scss'

// /**
//  * Component displaying a page indicating
//  * that a web page does not exist (404) or a server error (503).
//  * @param { Number } errorNumber
//  * @returns { JSX.Element } Error page with a link redirecting to the Home page
//  */

// function Error({ errorNumber }) {
//   const text = "Oups! La page que vous demandez n'existe pas"
//   // errorNumber === 404
//   //   ? "Oups! La page que vous demandez n'existe pas"
//   //   : "Oups! L'API n'est pas disponible."
//   return (
//     <>
//       <main className="error">
//         <h2 className="error__titleError">404</h2>
//         <p className="error__paragraph">{text}</p>
//         <Link to="/" className="error__errorLink">
//           Retourner sur la page d’accueil
//         </Link>
//       </main>
//     </>
//   )
// }

// Error.propTypes = {
//   errorNumber: PropTypes.number,
// }

// export default Error

import { Link } from 'react-router-dom'
import Header from '../components/Header.jsx'
import PropTypes from 'prop-types'
import './_error.scss'

/**
 * Component displaying a page indicating
 * that a web page does not exist (404) or a server error (503).
 * @param { Number } errorNumber
 * @returns { JSX.Element } Error page with a link redirecting to the Home page
 */

function Error({ errorNumber }) {
  const text =
    errorNumber === 404
      ? "Oups! La page que vous demandez n'existe pas"
      : "Oups! L'API n'est pas disponible."
  return (
    <>
      <Header />
      <main className="error">
        <h2 className="error__titleError">{errorNumber}</h2>
        <p className="error__paragraph">{text}</p>
        <Link to="/" className="error__errorLink">
          Retourner sur la page d’accueil
        </Link>
      </main>
    </>
  )
}

Error.propTypes = {
  errorNumber: PropTypes.number,
}

export default Error
