import './button.scss';

function ButtonToggleSidebar() {
  return (
    <div className="container-btn">
      <button className={'toggle-sidebar'}>
        <div className="line1"></div>
        <div className="line2"></div>
        <div className="line3"></div>
      </button>
    </div>
  );
}

export default ButtonToggleSidebar;
