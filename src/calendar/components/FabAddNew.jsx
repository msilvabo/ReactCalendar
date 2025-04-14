import { addDays } from "date-fns";
import { useUiStore } from "../../hooks";
import { useCalendarStore } from "../../hooks/useCalendarStore";

export const FabAddNew = () => {

    const {openDateModal} = useUiStore();

    const {setActiveEvent} = useCalendarStore();

    const handelClicNew = () => {
        setActiveEvent({
          title: '',
          notes: '',
          start: addDays(new Date(),2),
          end: addDays(new Date(),3),
          bgColor: '#fafafa',
          user:{
            id:'123',
            name: 'Carlos'
          }
        })
        openDateModal();
    }

  return (
    <button
        className="btn btn-primary fab"
        onClick={handelClicNew}
    >
        <i className="fas fa-plus"></i>
    </button>
  );
};
