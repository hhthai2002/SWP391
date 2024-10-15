import React, { useState } from 'react';
import { Calendar, momentLocalizer, Views } from 'react-big-calendar';
import moment from 'moment';
import 'react-big-calendar/lib/css/react-big-calendar.css';
import Dialog from '@mui/material/Dialog';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import { LocalizationProvider, TimePicker } from '@mui/x-date-pickers';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs'; 
import dayjs from 'dayjs';

import './schedule.css';

moment.locale('en'); // Lịch bằng tiếng Anh

const localizer = momentLocalizer(moment);

const Schedule = () => {
  const [events, setEvents] = useState([]);
  const [openSlot, setOpenSlot] = useState(false);
  const [openEvent, setOpenEvent] = useState(false);
  const [currentEvent, setCurrentEvent] = useState({
    title: '',
    start: dayjs(), // Khởi tạo là dayjs
    end: dayjs(),
    desc: '',
    googleMeetLink: '', // Trạng thái cho liên kết Google Meet
  });

  const handleSelectSlot = (slotInfo) => {
    setCurrentEvent({
      ...currentEvent,
      start: dayjs(slotInfo.start), 
      end: dayjs(slotInfo.end),       
    });
    setOpenSlot(true);
  };

  const handleEventSelected = (event) => {
    setCurrentEvent({
      ...event,
      start: dayjs(event.start),
      end: dayjs(event.end),
    });
    setOpenEvent(true);
  };

  const handleTitleChange = (e) => {
    setCurrentEvent({ ...currentEvent, title: e.target.value });
  };

  const handleDescChange = (e) => {
    setCurrentEvent({ ...currentEvent, desc: e.target.value });
  };

  const handleGoogleMeetChange = (e) => {
    setCurrentEvent({ ...currentEvent, googleMeetLink: e.target.value });
  };

  const handleStartTimeChange = (date) => {
    setCurrentEvent({ ...currentEvent, start: date });
  };

  const handleEndTimeChange = (date) => {
    setCurrentEvent({ ...currentEvent, end: date });
  };

  const handleNewAppointment = () => {
    setEvents((prevEvents) => [...prevEvents, currentEvent]);
    setOpenSlot(false);
  };

  const handleUpdateEvent = () => {
    const updatedEvents = events.map((event) =>
      event.start.isSame(currentEvent.start) ? currentEvent : event 
    );
    setEvents(updatedEvents);
    setOpenEvent(false);
  };

  const handleDeleteEvent = () => {
    const updatedEvents = events.filter((event) => !event.start.isSame(currentEvent.start)); 
    setEvents(updatedEvents);
    setOpenEvent(false);
  };

  const eventStyleGetter = (event) => {
    const start = dayjs(event.start);
    const end = dayjs(event.end);
    const timeDiffInHours = end.diff(start, 'hour'); 
    const height = timeDiffInHours * 60; 

    const style = {
      height: `${height}px`, 
      backgroundColor: '#3174ad',
      border: 'none',
      color: 'white',
      textAlign: 'center',
      padding: '4px',
      borderRadius: '5px',
    };
    return {
      style,
    };
  };

  const handleOpenGoogleMeet = () => {
    if (currentEvent.googleMeetLink) {
      window.open(currentEvent.googleMeetLink, '_blank');
    } else {
      alert('Vui lòng thêm liên kết Google Meet.');
    }
  };

  return (
    <LocalizationProvider dateAdapter={AdapterDayjs}>
      <div className="schedule-container"> {/* Thêm lớp này để căn giữa */}
        <div>
          <h1 className='schedule-title'>Lịch Học Của Học Viên</h1>
          <div className="calendar"> {/* Thêm lớp này cho lịch */}
            <Calendar
              localizer={localizer}
              events={events.map(event => ({
                ...event,
                start: event.start.toDate(), 
                end: event.end.toDate(),     
              }))}
              startAccessor="start"
              endAccessor="end"
              selectable
              onSelectSlot={handleSelectSlot}
              onSelectEvent={handleEventSelected}
              views={{ month: true, week: true, day: true }} // Thêm chế độ xem theo ngày
              defaultView={Views.MONTH}
              eventPropGetter={eventStyleGetter} // Sử dụng hàm để lấy thuộc tính sự kiện
              style={{ height: 600 }} // Có thể điều chỉnh chiều cao ở đây nếu cần
            />
          </div>

          {/* Dialog for booking new appointment */}
          <Dialog open={openSlot} onClose={() => setOpenSlot(false)}>
            <div className="dialog-content">
              <h2>Đặt lịch hẹn</h2>
              <TextField label="Title" onChange={handleTitleChange} fullWidth />
              <TextField label="Description" onChange={handleDescChange} fullWidth />
              <TextField label="Link Google Meet" onChange={handleGoogleMeetChange} fullWidth />
              <TimePicker
                label="Start Time"
                value={currentEvent.start}
                onChange={handleStartTimeChange}
                fullWidth
              />
              <TimePicker
                label="End Time"
                value={currentEvent.end}
                onChange={handleEndTimeChange}
                fullWidth
              />
              <Button onClick={handleNewAppointment} color="primary">Confirm</Button>
              <Button onClick={() => setOpenSlot(false)} color="secondary">Cancel</Button>
            </div>
          </Dialog>

          {/* Dialog for viewing/editing existing event */}
          <Dialog open={openEvent} onClose={() => setOpenEvent(false)}>
            <div className="dialog-content">
              <h2>Chỉnh sửa lịch hẹn</h2>
              <TextField label="Title" value={currentEvent.title} onChange={handleTitleChange} fullWidth />
              <TextField label="Description" value={currentEvent.desc} onChange={handleDescChange} fullWidth />
              <TextField label="Link Google Meet" value={currentEvent.googleMeetLink} onChange={handleGoogleMeetChange} fullWidth />
              <TimePicker
                label="Start Time"
                value={currentEvent.start}
                onChange={handleStartTimeChange}
                fullWidth
              />
              <TimePicker
                label="End Time"
                value={currentEvent.end}
                onChange={handleEndTimeChange}
                fullWidth
              />
              <Button onClick={handleUpdateEvent} color="primary">Confirm</Button>
              <Button onClick={handleDeleteEvent} color="secondary">Delete</Button>
              <Button onClick={handleOpenGoogleMeet} color="default">Open Google Meet</Button>
              <Button onClick={() => setOpenEvent(false)} color="default">Cancel</Button>
            </div>
          </Dialog>
        </div>
      </div>
    </LocalizationProvider>
);

};

export default Schedule;
