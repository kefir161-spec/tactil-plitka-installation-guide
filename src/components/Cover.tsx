import { meta } from '../data/instruction';
import { images } from '../data/assets';

export function Cover() {
  return (
    <header className="cover section">
      <div className="cover__bg">
        <img src={images.cover} alt="Тактильная плитка у входа в общественное здание" />
        <div className="cover__overlay" />
      </div>
      <div className="cover__content container">
        <img className="cover__logo" src={images.logo} alt="ПластФактор" />
        <h1 className="cover__title">{meta.title}</h1>
        <span className="cover__badge">{meta.badge}</span>
      </div>
    </header>
  );
}
