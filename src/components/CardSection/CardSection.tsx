import classNames from 'classnames/bind';
import styles from './CardSection.module.scss'
import Card from './Card/Card';

const cx = classNames.bind(styles);

const CardSection = () => {
  return (
    <div className={cx('container')}>
      <div className={cx('header')}>
        <span>Latest form</span>
      </div>
      <div>
       <Card/>
      </div>
    </div>
  )
}

export default CardSection