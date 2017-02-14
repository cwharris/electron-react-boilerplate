import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { Counter } from '../components/Counter';
import * as CounterActions from '../actions/counter';

function mapStateToProps(state: any) {
  return {
    counter: state.counter
  };
}

function mapDispatchToProps(dispatch: any) {
  return bindActionCreators(CounterActions as any, dispatch);
}

export default connect(mapStateToProps, mapDispatchToProps)(Counter as any);
