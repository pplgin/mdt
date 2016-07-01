import React ,{Component} from 'react';

export default class App extends Component {
  constructor(porps) {
    super(porps);
  }
  render(){
    const { children } = this.props;
    return(
      <section className="views">
        {children}
      </section>
    )
  }
}
