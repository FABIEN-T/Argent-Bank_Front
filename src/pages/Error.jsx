import { Link } from 'react-router-dom'
import PropTypes from 'prop-types'
import Header from '../components/Header.jsx'
import Footer from '../components/Footer.jsx'

function Error({ errorNumber }) {
  const text = errorNumber === 404 ? 'Page not found' : 'API is not available.'
  return (
    <>
      <Header />
      <main className="error">
        <h2 className="titleError">{errorNumber}</h2>
        <p className="paragraph">{text}</p>
        <Link to="/" className="errorLink">
          Return to the home page
        </Link>
      </main>
      <Footer />
    </>
  )
}

Error.propTypes = {
  errorNumber: PropTypes.number,
}

export default Error
