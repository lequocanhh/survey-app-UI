import classNames from 'classnames/bind';
import styles from './Template.module.scss';
import Create from './Create/Create';

const cx = classNames.bind(styles);

const Template = () => {

  const handleCreateNewSurvey = (e) => {
    console.log(123);
    
  }

  return (
    <div className={cx('template')}>
        <div className={cx('container')}>
        <div className={cx('header')}>
            <span className={cx('title')}>Start a new survey</span>
        </div>
        <div onClick={handleCreateNewSurvey} className={cx('create-btn')}>
          <Create />
       </div>
        </div>
    </div>
  )
}

export default Template