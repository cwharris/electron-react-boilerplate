import * as React from 'react';

export interface Props {
	children: HTMLElement
}

export default class App extends React.Component<Props, void> {
  render() {
    return (
      <div>
        {this.props.children}
      </div>
    );
  }
}
