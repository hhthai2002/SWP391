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

import Header from "../../components/Header";
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
      alert('Please Add Link Google Meet.');
    }
  };

  return (
    
    <LocalizationProvider dateAdapter={AdapterDayjs}>
      <Header />
      <div className="schedule-container"> 
        
        <div>
          <h1 className='schedule-title'>Lịch Học Của Học Viên</h1>
          <div className="calendar"> 
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
              views={{ month: true, week: true, day: true }}
              defaultView={Views.MONTH}
              eventPropGetter={eventStyleGetter}
              style={{ height: 600 }}
            />
          </div>

          {/* Dialog for booking new appointment */}
          <Dialog open={openSlot} onClose={() => setOpenSlot(false)}>
            <div className="dialog-content">
              <h2>Đặt lịch hẹn</h2>
              <TextField label="Tiêu đề" onChange={handleTitleChange} fullWidth />
              <TextField label="Mô tả" onChange={handleDescChange} fullWidth />
              <TextField label="Link Google Meet" onChange={handleGoogleMeetChange} fullWidth />
              <TimePicker
                label="Thời gian bắt đầu"
                value={currentEvent.start}
                onChange={handleStartTimeChange}
                fullWidth
              />
              <TimePicker
                label="Thời gian kết thúc"
                value={currentEvent.end}
                onChange={handleEndTimeChange}
                fullWidth
              />
              <Button onClick={handleNewAppointment}
                className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded border border-blue-500">
                Xác nhận
              </Button>
              <Button onClick={() => setOpenSlot(false)}
                className="bg-gray-500 hover:bg-gray-700 text-white font-bold py-2 px-4 rounded border border-gray-500 ml-2">
                Hủy
              </Button>
            </div>
          </Dialog>

          {/* Dialog for viewing/editing existing event */}
          <Dialog open={openEvent} onClose={() => setOpenEvent(false)}>
            <div className="dialog-content">
              <h2>Chỉnh sửa lịch hẹn</h2>
              <TextField label="Tiêu đề" value={currentEvent.title} onChange={handleTitleChange} fullWidth />
              <TextField label="Mô tả" value={currentEvent.desc} onChange={handleDescChange} fullWidth />
              <TextField label="Link Google Meet" value={currentEvent.googleMeetLink} onChange={handleGoogleMeetChange} fullWidth />
              <TimePicker
                label="Thời gian bắt đầu"
                value={currentEvent.start}
                onChange={handleStartTimeChange}
                fullWidth
              />
              <TimePicker
                label="Thời gian kết thúc"
                value={currentEvent.end}
                onChange={handleEndTimeChange}
                fullWidth
              />
              <Button
                onClick={handleUpdateEvent}
                className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded border border-gray-500">
                Xác nhận
              </Button>

              <Button
                onClick={handleDeleteEvent}
                className="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded border border-red-500 ml-2">
                Xóa
              </Button>

              <Button
                onClick={handleOpenGoogleMeet}
                className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded border border-blue-500 ml-2">
                Mở Google Meet
              </Button>

              <Button
                onClick={() => setOpenEvent(false)}
                className="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded border border-red-500 ml-2">
                Hủy
              </Button>
            </div>
          </Dialog>
        </div>
      </div>
    </LocalizationProvider>
  );

};

export default Schedule;
