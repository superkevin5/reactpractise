import React,{ Component } from 'react';
import './App.css'
import { Form, FormControl, Button } from 'react-bootstrap';


class App extends Component {


    constructor(props) {
        super(props);
        this.state= {
            deadline:'December 25, 2017',
            newDeadline:''
        }
    }

    changeDeadline() {
        this.setState({
            deadline: this.state.newDeadline
        });
    }

    render() {
        return (
            <div className="App">
                <div className="App-title">Count down to {this.state.deadline}</div>
                <Clock deadline={this.state.deadline}/>

                <Form inline>
                    <FormControl
                        className="Deadline-input"
                        placeholder='new date'
                        onChange={event => this.setState({newDeadline: event.target.value})}
                    />
                    <Button onClick={() => this.changeDeadline()}>
                        Submit
                    </Button>
                </Form>
            </div>
        )
    }
}


class Clock extends Component {
    constructor(props) {
        super(props);
        this.state = {
            days: 0,
            hours: 0,
            minutes: 0,
            seconds: 0
        };

        console.log(this.props);
    }

    getTimeUntil(deadline) {
        const time = Date.parse(deadline) - Date.parse(new Date());
        const seconds = Math.floor((time / 1000) % 60);
        const minutes = Math.floor((time / 1000 / 60) % 60);
        const hours = Math.floor(time / (1000 * 60 * 60) % 24);
        const days = Math.floor(time / (1000 * 60 * 60 * 24));
        console.log(seconds,minutes,hours,days);
        this.setState({days: days, hours: hours, minutes: minutes, seconds: seconds});
    }
    componentWillMount() {
        this.getTimeUntil(this.props.deadline);
    }
    componentDidMount() {
        setInterval(()=>  this.getTimeUntil(this.props.deadline),1000);
    }
    render() {

        return (
            <div>
                <div>{this.state.days} days</div>
                <div>{this.state.hours} hours</div>
                <div>{this.state.minutes} minutes</div>
                <div>{this.state.seconds} seconds</div>
            </div>
        )
    }
}

export default App;