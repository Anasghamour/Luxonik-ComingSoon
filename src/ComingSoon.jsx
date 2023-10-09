import React, { useState, useEffect } from 'react';

import './style2.css';
class Countdown extends React.Component {
    state = {
        days: undefined,
        hours: undefined,
        minutes: undefined,
        seconds: undefined
    }

    componentDidMount() {
        this.interval = setInterval(() => {
            const { timeTillDate, timeFormat } = this.props;
            const then = moment(timeTillDate, timeFormat);
            const now = moment();
            const countdown = moment(then - now);
            const days = countdown.format('D');
            const hours = countdown.format('HH');
            const minutes = countdown.format('mm');
            const seconds = countdown.format('ss');

            this.setState({ days, hours, minutes, seconds });
        }, 1000);
    }

    componentWillUnmount() {
        if(this.interval) {
            clearInterval(this.interval);
        }
    }



    render() {
        const { days, hours, minutes, seconds } = this.state;
        const daysRadius = mapNumber(days, 30, 0, 0, 360);
        const hoursRadius = mapNumber(hours, 24, 0, 0, 360);
        const minutesRadius = mapNumber(minutes, 60, 0, 0, 360);
        const secondsRadius = mapNumber(seconds, 60, 0, 0, 360);

        if(!seconds) {
            return null;
        }

        return (
            <div>
                <h1>Countdown</h1>
                <div className='countdown-wrapper'>
                    {days && (
                        <div className='countdown-item'>
                            <SVGCircle radius={daysRadius} />
                            {days}
                            <span>days</span>
                        </div>
                    )}
                    {hours && (
                        <div className='countdown-item'>
                            <SVGCircle radius={hoursRadius} />
                            {hours}
                            <span>hours</span>
                        </div>
                    )}
                    {minutes && (
                        <div className='countdown-item'>
                            <SVGCircle radius={minutesRadius} />
                            {minutes}
                            <span>minutes</span>
                        </div>
                    )}
                    {seconds && (
                        <div className='countdown-item'>
                            <SVGCircle radius={secondsRadius} />
                            {seconds}
                            <span>seconds</span>
                        </div>
                    )}
                </div>
            </div>
        );
    }
}

const SVGCircle = ({ radius }) => (
    <svg className='countdown-svg'>
        <path fill="none" stroke="#333" stroke-width="4" d={describeArc(50, 50, 48, 0, radius)}/>
    </svg>
);



// From stackoverflow: https://stackoverflow.com/questions/5736398/how-to-calculate-the-svg-path-for-an-arc-of-a-circle
function polarToCartesian(centerX, centerY, radius, angleInDegrees) {
    var angleInRadians = (angleInDegrees-90) * Math.PI / 180.0;

    return {
        x: centerX + (radius * Math.cos(angleInRadians)),
        y: centerY + (radius * Math.sin(angleInRadians))
    };
}

function describeArc(x, y, radius, startAngle, endAngle){

    var start = polarToCartesian(x, y, radius, endAngle);
    var end = polarToCartesian(x, y, radius, startAngle);

    var largeArcFlag = endAngle - startAngle <= 180 ? "0" : "1";

    var d = [
        "M", start.x, start.y,
        "A", radius, radius, 0, largeArcFlag, 0, end.x, end.y
    ].join(" ");

    return d;
}

// Stackoverflow: https://stackoverflow.com/questions/10756313/javascript-jquery-map-a-range-of-numbers-to-another-range-of-numbers
function mapNumber(number, in_min, in_max, out_min, out_max) {
    return (number - in_min) * (out_max - out_min) / (in_max - in_min) + out_min;
}
function CountdownTimer() {
    const [secValue, setSecValue] = useState(11);
    const [minValue, setMinValue] = useState(2);
    const [hourValue, setHourValue] = useState(2);
    const [dayValue, setDayValue] = useState(29);

    useEffect(() => {
        const timeFunction = setInterval(() => {
            setSecValue((prevSecValue) => {
                if (prevSecValue === 0) {
                    setMinValue((prevMinValue) => {
                        if (prevMinValue === 0) {
                            setHourValue((prevHourValue) => {
                                if (prevHourValue === 0) {
                                    setDayValue((prevDayValue) => {
                                        if (prevDayValue === 0) {
                                            clearInterval(timeFunction);
                                            return 0;
                                        }
                                        return prevDayValue - 1;
                                    });
                                    return 23;
                                }
                                return prevHourValue - 1;
                            });
                            return 59;
                        }
                        return prevMinValue - 1;
                    });
                    return 59;
                }
                return prevSecValue - 1;
            });
        }, 1000);

        // Clear the interval when the component unmounts
        return () => clearInterval(timeFunction);
    }, []);

    return (
        <section className="container">
            <video autoPlay loop muted playsInline className="video-bg">
                <source src="../public/LUXONIKVIDEO1.mp4" type="video/mp4"/>
            </video>
            <Countdown
                timeTillDate="05 26 2019, 6:00 am"
                timeFormat="MM DD YYYY, h:mm a"
            />,
            <div className="email-content">
                <p>Get notify when the Luxonik get launch!</p>
                <div className="input-box">
                    <input type="email" placeholder="Enter your email..." />
                    <button>Notify Me</button>
                </div>
            </div>
        </section>
    );
}

export default CountdownTimer;
