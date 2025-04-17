import { useSelector } from "react-redux";
import { useCalendarStore } from "../../hooks/useCalendarStore";

export const FabDelete = () => {

  const { startdeleteEvent, hasEventSelected } = useCalendarStore();
  const {isDateModalOpen} = useSelector(state => state.ui);
  const handleClickDelete = () => {
    startdeleteEvent();
  }
  // console.log(isDateModalOpen);
  // console.log(hasEventSelected);
  
  return (
    <button
      className="btn btn-danger fab-danger"
      onClick={ handleClickDelete }
      style={{
        display: (hasEventSelected && !isDateModalOpen )  ? '' : 'none'
      }}
    >
        <i className="fas fa-trash-alt"></i>
    </button>
  );
};
