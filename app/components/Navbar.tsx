import { Link } from 'react-router';

const Navbar = () => {
  return (
    <nav className="navbar">
          <Link to="/">
              <h6 className='text-2xl font-bold text-gradient'>
                  SynchHire
              </h6>
          </Link>
          <Link to="/upload" className='primary-button w-fit'>
              Upload Resume
          </Link>
    </nav>
  )
}

export default Navbar
