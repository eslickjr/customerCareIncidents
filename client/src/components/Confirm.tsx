

import { useNavigate } from "react-router-dom";

import '../styles/Confirm.css';

interface NewCustomerProps {
    isOpen: boolean;
    onClose: () => void;
}

const NewCustomer: React.FC<NewCustomerProps> = ({ isOpen, onClose }) => {
    if (!isOpen) return null;

    const navigate = useNavigate();

    const handleConfirm = async (e: React.MouseEvent<HTMLInputElement>) => {
        e.preventDefault();
        navigate(`/`);
    }

    return (
        <>
            <div id="confirmOverlay" onClick={onClose}>
                <div id="confirmModal" onClick={(e) => e.stopPropagation()}>
                    <div id="modalHeader">
                        <h2 id="modalTitle">Confirm Ticket Close</h2>
                        <div id="modalCloseButton">
                            <span id="modalClose" className="close" onClick={onClose}>&times;</span>
                        </div>
                    </div>
                    <form id="modalForm">
                        <div id="modalMessageContainer">
                            <p id="modalMessage">Are you sure you want to close this ticket?</p>
                        </div>
                        <div id="modalButtonContainer" className="modalButtonContainer">
                            <input id="modalYes" className="modalButton" type="button" value="Yes" onClick={handleConfirm} />
                            <input id="modalNo" className="modalButton" type="button" value="No" onClick={onClose} />
                        </div>
                    </form>
                </div>
            </div>
        </>
    );
}

export default NewCustomer;