import { addHours, differenceInSeconds } from "date-fns";
import { useEffect, useMemo, useState } from "react";
import Modal from "react-modal";
import DateTimePicker from "react-datetime-picker";
import 'react-datetime-picker/dist/DateTimePicker.css';
import 'react-calendar/dist/Calendar.css';
import 'react-clock/dist/Clock.css';
import Swal from "sweetalert2";
import 'sweetalert2/dist/sweetalert2.min.css'
import { useUiStore } from "../../hooks";
import { useCalendarStore } from "../../hooks/useCalendarStore";

const customStyles = {
    content: {
      top: '50%',
      left: '50%',
      right: 'auto',
      bottom: 'auto',
      marginRight: '-50%',
      transform: 'translate(-50%, -50%)',
      backgroundColor: "#ffffff",
      zIndex: "9999"
    },
  };
  
  export const CalendarModal = () => {

    const {isDateModalOpen, closeDateModal} = useUiStore();
    const {activeEvent, startSavingEvent} = useCalendarStore();
    const [formSubmitted, setformSubmitted] = useState(false);
    
    Modal.setAppElement('#root');

    function oncloseModal() {
        console.log('Cerrando Modal');
        closeDateModal();
      }

    const [formValues, setformValues] = useState({});  

    const titleClass = useMemo(() => {
        if(!formSubmitted) return '';
        return ( formValues.title.length > 0)
            ? 'is-valid' 
            : 'is-invalid'
    }, [formValues.title, formSubmitted])

    const notesClass = useMemo(() => {
        if(!formSubmitted) return '';
        return ( formValues.notes.length > 0)
            ? 'is-valid' 
            : 'is-invalid'
    }, [formValues.notes, formSubmitted])

    useEffect(() => {
       if (activeEvent !== null){
            setformValues(activeEvent);
       } 
    }, [activeEvent]);

    const onInputChanged = ({target}) => {
        setformValues({
            ...formValues,
            [target.name]: target.value
        })
    }

    const onDateChanged = (event, changing) => {
        setformValues({
            ...formValues,
            [changing]:event
        })
    }

    const onSubmit = async(event) => {
        setformSubmitted(true);
        event.preventDefault();
        const difference = differenceInSeconds(formValues.end, formValues.start);
        if (isNaN(formValues.start) || isNaN(formValues.end)) {
            Swal.fire('Fechas Incorrectas', 'Revisar las fechas ingresadas','error');
            return;
        }
        if (difference <= 0) {
            Swal.fire('Fechas Incorrectas', 'Fecha Final debe ser mayor a Fecha Inicial','error');
            return;
        }
        
        //todo
        // cerrar modal
        // remover errores pantalla
        await startSavingEvent(formValues);
        closeDateModal();
        setformSubmitted(false);
    }

  return (
    <Modal
        isOpen={isDateModalOpen}
        onRequestClose={oncloseModal}
        style={customStyles}
        className="modal"
        overlayClassName="modal-fondo"
        closeTimeoutMS={200}
        >
            
            <h1> Nuevo evento </h1>
            <hr />
            <form className="container" onSubmit={onSubmit}>

                <div className="form-group mb-2">
                    <label>Fecha y hora inicio</label>
                    <DateTimePicker 
                        value = {formValues.start}
                        name="start"
                        onChange={ (event) => onDateChanged(event,'start') }
                        className="form-control"
                        format="dd-MM-yyyy HH:mm"
                    />
                </div>

                <div className="form-group mb-2">
                    <label>Fecha y hora fin</label>
                    <DateTimePicker 
                        minDate={formValues.start}
                        value = {formValues.end}
                        name="end"
                        onChange={ (event) => onDateChanged(event,'end') }
                        className="form-control"
                        format="dd-MM-yyyy HH:mm"
                    />
                </div>

                <hr />
                <div className="form-group mb-2">
                    <label>Titulo y notas</label>
                    <input 
                        type="text" 
                        className={`form-control ${notesClass}`}
                        placeholder="Título del evento"
                        name="title"
                        autoComplete="off"
                        value = {formValues.title}
                        onChange={onInputChanged}
                    />
                    <small id="emailHelp" className="form-text text-muted">Una descripción corta</small>
                </div>

                <div className="form-group mb-2">
                    <textarea 
                        type="text" 
                        className={`form-control ${titleClass}`}
                        placeholder="Notas"
                        rows="5"
                        name="notes"
                        value = {formValues.notes}
                        onChange={onInputChanged}
                    ></textarea>
                    <small id="emailHelp" className="form-text text-muted">Información adicional</small>
                </div>
                <div className="text-center">
                    <button
                        type="submit"
                        className="btn btn-outline-primary btn-block"
                        >
                        <i className="far fa-save"></i>
                        <span> Guardar</span>
                    </button>
                </div>

            </form>

    </Modal>
  );
};
