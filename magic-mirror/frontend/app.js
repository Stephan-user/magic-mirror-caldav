document.addEventListener('DOMContentLoaded', function () {
  const calendarEl = document.getElementById('calendar');
  const calendar = new FullCalendar.Calendar(calendarEl, {
    initialView: 'dayGridMonth',
    events: '/api/events',
    editable: true,
    selectable: true,
    dateClick: function(info) {
      const title = prompt("Event titel:");
      if (title) {
        fetch('/api/events', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            title: title,
            start: info.dateStr
          })
        }).then(() => calendar.refetchEvents());
      }
    },
    eventClick: function(info) {
      if (confirm(`Verwijder "${info.event.title}"?`)) {
        fetch(`/api/events/${info.event.id}`, { method: 'DELETE' })
          .then(() => calendar.refetchEvents());
      }
    }
  });
  calendar.render();
});
