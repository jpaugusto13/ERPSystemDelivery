import FullCalendar from '@fullcalendar/react'
import dayGridPlugin from '@fullcalendar/daygrid'
import interactionPlugin from "@fullcalendar/interaction";
import listPlugin from '@fullcalendar/list';
import timeGridPlugin from '@fullcalendar/timegrid'
import ptLocale from '@fullcalendar/core/locales/pt-br';

export default function Agendamentos() {
  const handleDateClick = (arg) => { // bind with an arrow function
    alert(arg.dateStr)
  }

  return (
    <div className="w-full h-full bg-gray-100">
      <nav className="flex relative z-30 justify-around h-[8vh] items-center shadow-md bg-gray-800 text-white w-full">
        <div className="px-5 xl:px-12 py-6 flex w-full items-center">
          <p className="text-3xl font-bold font-heading">Ponto de venda</p>
        </div>
      </nav>
      <div className='p-2'>
        <div className='p-4 bg-white rounded-2xl shadow-md shadow-slate-300'>
          <FullCalendar

            locale={ptLocale}
            height={"84vh"}
            plugins={[ timeGridPlugin, dayGridPlugin, interactionPlugin, listPlugin ]}
            initialView="dayGridMonth"
            headerToolbar={{
              left: 'prev,next today',
              center: 'title',
              right: 'dayGridMonth,timeGridWeek,timeGridDay',
            }}
            views={{
             
            }}
            dateClick={handleDateClick}
            
            events={[
              {
                title: 'Meeting',
                start: '2024-02-12T14:30:00',
                extendedProps: {
                  status: 'done'
                }
              },
              {
                title: 'Birthday Party',
                start: '2024-02-13T07:00:00',
                backgroundColor: 'green',
                borderColor: 'green'
              }
            ]}
          />
        </div>
      </div>
    </div>
  )
}
