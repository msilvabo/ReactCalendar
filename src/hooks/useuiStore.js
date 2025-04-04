import { useDispatch, useSelector } from "react-redux";
import { onOpenDateModal, onCloseDateModal } from "../store/ui/uiSlice";

export const useUiStore = () => {
    const dispath = useDispatch();
    const {isDateModalOpen} = useSelector(state => state.ui);

    const openDateModal= () => {
        dispath(onOpenDateModal());
    }
    
    const closeDateModal= () => {
        dispath(onCloseDateModal());
    }

    const toogleDateModal = () => {
        (isDateModalOpen)
        ? openDateModal
        : closeDateModal;
    }

    return{
        // Properties
        isDateModalOpen,
        // Metodos
        openDateModal,
        closeDateModal,
        toogleDateModal
    }
}