import classNames from 'classnames/bind';
import styles from './Card.module.scss'
import MoreVertIcon from '@mui/icons-material/MoreVert';
import StorageIcon from '@mui/icons-material/Storage';
import { IconButton } from '@mui/material';

const cx = classNames.bind(styles);

const Card = () => {
  return (
    <div className={cx('container')}>
        <img src='' className={cx('image')}/>
        <div className={cx('content')}>
            <h4>mau khong co tieu desd fmsdfkkl</h4>
            <div className={cx('more-info')}>
                <div className={cx('content-left')}>
                    <StorageIcon/>
                    <p className={cx('description')}>day la descriptionkl ksdmflmadslnjnmsdfksdksmdfmsmf</p>
                </div>
                <IconButton>
                     <MoreVertIcon/>
                </IconButton>
            </div>
        </div>
    </div>
  ) 
}

export default Card