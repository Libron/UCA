import React, {Component, Fragment} from 'react';
import {connect} from "react-redux";
import dateFns from "date-fns";
import {fetchMeetings} from "../../store/actions/zoomActions";
import Spinner from "../../components/UI/Spinner/Spinner";
import ZoomTable from "../../components/ZoomTable";

const COLUMNS = [
    { title: 'Date', field: 'date' },
    { title: 'Email', field: 'email' },
    { title: 'Start time', field: 'startTime' },
    { title: 'End time', field: 'endTime' },
    { title: 'Topic', field: 'topic' },
    { title: 'URL', field: 'url' }
    ];

class ZoomSoon extends Component {
    componentDidMount() {
        this.props.fetchMeetings();
    }

    render() {
        if (this.props.loading) {
            return <Spinner />
        }

        const today = [];
        const tommorow = [];

        this.props.zoomMeetings.map((account) => {
            account.meetings.map(meeting => {
                const end_time = dateFns.addMinutes(meeting.start_time, meeting.duration);
                let date = dateFns.format(meeting.start_time, 'MMM D');
                if (dateFns.isTomorrow(meeting.start_time)) {
                    date = 'Tommorow';
                    tommorow.push({
                        date: date + '\n' + dateFns.format(meeting.start_time, 'MMM D'),
                        email: account.email,
                        startTime: dateFns.format(meeting.start_time, 'HH:mm'),
                        endTime: dateFns.format(end_time, 'HH:mm'),
                        topic: meeting.topic,
                        url: meeting.join_url
                    });
                } else if (dateFns.isToday(meeting.start_time)) {
                    date = 'Today';
                    today.push({
                        date: date + '\n' + dateFns.format(meeting.start_time, 'MMM D'),
                        email: account.email,
                        startTime: dateFns.format(meeting.start_time, 'HH:mm'),
                        endTime: dateFns.format(end_time, 'HH:mm'),
                        topic: meeting.topic,
                        url: meeting.join_url
                    });
                }

                return null;
            });

            return null;
        });

        return <Fragment>

            <ZoomTable
                title={'Today'}
                meetings={today}
                columns={COLUMNS}
            />

            <ZoomTable
                title={'Tommorow'}
                meetings={tommorow}
                columns={COLUMNS}
            />

        </Fragment>
    }
}

const mapStateToProps = state => ({
    zoomMeetings: state.zoom.zoomMeetings,
    loading: state.zoom.loading
});

const mapDispatchToProps = dispatch => ({
    fetchMeetings: () => dispatch(fetchMeetings())
});

export default connect(mapStateToProps, mapDispatchToProps)(ZoomSoon);