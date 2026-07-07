import { contacts, images } from '../data/assets';
import { Checklist } from './Checklist';

export function ContactsSection({ checklist }: { checklist: readonly string[] }) {
  return (
    <div className="final-section">
      <div className="contacts-card card">
        <img className="contacts-card__logo" src={images.logo} alt="ПластФактор" />
        <dl className="contacts-list">
          <div className="contacts-list__row">
            <dt>Сайт</dt>
            <dd>
              <a href={contacts.site}>{contacts.site}</a>
            </dd>
          </div>
          <div className="contacts-list__row">
            <dt>Телефон</dt>
            <dd>
              <a href="tel:88007758409">{contacts.phone}</a>
            </dd>
          </div>
          <div className="contacts-list__row">
            <dt>Адрес</dt>
            <dd>{contacts.address}</dd>
          </div>
          <div className="contacts-list__row">
            <dt>Режим работы</dt>
            <dd>{contacts.hours}</dd>
          </div>
          <div className="contacts-list__row print-only">
            <dt>Инструкция</dt>
            <dd>
              <a href={contacts.electronicGuide}>Электронная инструкция</a>
            </dd>
          </div>
        </dl>
      </div>

      <div className="card final-checklist">
        <Checklist title="Чек-лист перед сдачей работ" items={checklist} compact />
      </div>
    </div>
  );
}
