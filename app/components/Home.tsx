import * as React from 'react';
import { Link } from 'react-router';
import * as styles from './Home.css';

export class Home extends React.Component<void, void> {
  render() {
    return (
      <div>
        <div className={styles.container}>
          <h2>Home</h2>
          <Link to="/counter">to Counter</Link>
        </div>
      </div>
    );
  }
}
