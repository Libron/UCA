import React, {Component, Fragment} from 'react';
import {connect} from "react-redux";
import Spinner from "../../components/UI/Spinner/Spinner";
import ZoomTable from "../../components/ZoomTable";
import dateFns from "date-fns";
import {fetchMeetings, fetchMeetingsById} from "../../store/actions/zoomActions";

const COLUMNS = [
    { title: 'Date', field: 'date' },
    { title: 'Start time', field: 'startTime' },
    { title: 'End time', field: 'endTime' },
    { title: 'Topic', field: 'topic' },
    { title: 'URL', field: 'url' },
    { title: 'Recursive', field: 'recursive' }];

class Zoom extends Component {
    componentDidMount() {
        if (this.props.match.params.id) {
            this.props.fetchMeetingsById(this.props.match.params.id);
        } else  {
            this.props.fetchMeetings();
        }
    }

    componentDidUpdate(prevProps) {
        if (prevProps.match.params.id !== this.props.match.params.id) {
            if (this.props.match.params.id) {
                this.props.fetchMeetingsById(this.props.match.params.id);
            } else {
                this.props.fetchMeetings();
            }
        }
    }

    render() {
        if (this.props.loading) {
            return <Spinner />
        }

        const tables = this.props.zoomMeetings.map((account, idx) => {
            const meetings = account.meetings.map(meeting => {
                const end_time = dateFns.addMinutes(meeting.start_time, meeting.duration);

                let date = dateFns.format(meeting.start_time, 'MMM D');

                if (dateFns.isTomorrow(meeting.start_time)) {
                   date = 'Tommorow';
                } else if (dateFns.isToday(meeting.start_time)) {
                   date = 'Today';
                }

                return {
                    date: date,
                    startTime: dateFns.format(meeting.start_time, 'HH:mm'),
                    endTime: dateFns.format(end_time, 'HH:mm'),
                    topic: meeting.topic,
                    url: meeting.join_url,
                    recursive: meeting.type === 2 ? "no" : "yes"
                };
            });

            return <ZoomTable
                key={idx}
                title={account.email}
                meetings={meetings}
                columns={COLUMNS}
            />
        });
      return <Fragment>
          {tables}
      </Fragment>
    }
}

const mapStateToProps = state => ({
    zoomMeetings: state.zoom.zoomMeetings,
    loading: state.zoom.loading
});

const mapDispatchToProps = dispatch => ({
    fetchMeetings: () => dispatch(fetchMeetings()),
    fetchMeetingsById: (id) => dispatch(fetchMeetingsById(id))
});

export default connect(mapStateToProps, mapDispatchToProps)(Zoom);