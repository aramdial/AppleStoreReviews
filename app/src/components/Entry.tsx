import { IEntry } from '../interfaces/Feed';
import '../styles/Entry.css';

interface IProp {
  entry: IEntry;
}

const Entry = (props: IProp) => {
  return (
    <div className="container">
      {Array.from(Array(parseInt(props.entry['im:rating'].label ?? 0))).map((_, index) => {
        return <div key={index} className="star" />;
      })}
      <div className="star" />
      <div className="row">
        <div className="left">{props.entry.author.name.label}</div>
        <p className="right" style={{ margin: 0 }}>
          {new Date(props.entry.updated.label).toLocaleString()}
        </p>
      </div>
      <div className="space">{props.entry.content.label}</div>
    </div>
  );
};

export default Entry;
