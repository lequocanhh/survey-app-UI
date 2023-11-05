import MenuIcon from '@mui/icons-material/Menu'
import { IconButton } from '@mui/material'
import SearchIcon from '@mui/icons-material/Search'
import AppsIcon from '@mui/icons-material/Apps';
import classNames from 'classnames/bind';
import styles from './Header.module.scss';

const cx = classNames.bind(styles);

const Header = () => {
  return (
   <div className={cx('header')}>
      <div className={cx('menu')}>
        <IconButton>
        <MenuIcon/>
        </IconButton>
        <span className={cx('title')}>SURVEY APP</span>
      </div>
      <div className={cx('search-bar')}>
        <IconButton>
        <SearchIcon/>
        </IconButton>
        <input type='text' name='search' placeholder='Search...'/>
      </div>
      <div className='individual'>
        <IconButton>
          <AppsIcon/>
        </IconButton>
      </div>
   </div>
  )
}

export default Header