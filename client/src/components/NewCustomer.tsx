

import CustomerI from '../interfaces/customer';

import { useState, useRef } from 'react';
import { useNavigate } from "react-router-dom";

import '../styles/NewCustomer.css';

interface NewCustomerProps {
    isOpen: boolean;
    onClose: () => void;
}

const NewCustomer: React.FC<NewCustomerProps> = ({ isOpen, onClose }) => {
    if (!isOpen) return null;

    const [firstName, setFirstName] = useState<string>('');
    const [lastName, setLastName] = useState<string>('');
    const [phone, setPhone] = useState<string>('');
    const [ssn, setSsn] = useState<string>('');
    
    const [firstNameSpan, setFirstNameSpan] = useState<string>('');
    const [lastNameSpan, setLastNameSpan] = useState<string>('');
    const [phoneSpan, setPhoneSpan] = useState<string>('');
    const [ssnSpan, setSsnSpan] = useState<string>('');

    const error = useRef<boolean>(false);

    const navigate = useNavigate();

    const handleAlphaInput = (e: React.ChangeEvent<HTMLInputElement>): void => {
        e.target.value = e.target.value.replace(/[^a-zA-Z]/g, '');

        if (e.target.id === 'modalFirstName') {
            setFirstName(e.target.value);
            
            if (firstName !== '') {
                if (firstName.charAt(0) !== firstName.charAt(0).toUpperCase()) {
                    setFirstName(firstName.charAt(0).toUpperCase() + firstName.slice(1));
                }
                if (firstNameSpan !== '') setFirstNameSpan('');
            }
        }

        if (e.target.id === 'modalLastName') {
            setLastName(e.target.value);

            if (lastName !== '') {
                if (lastName.charAt(0) !== lastName.charAt(0).toUpperCase()) {
                    setLastName(lastName.charAt(0).toUpperCase() + lastName.slice(1));
                }
                if (lastNameSpan !== '') setLastNameSpan('');
            }
        }
    }

    const handlePhone = (e: React.ChangeEvent<HTMLInputElement>): void => {
        const input = e.target.value.replace(/\D/g, ''); // Remove all non-numeric characters
        let formattedNumber = '';

        if (input.length > 0) {
            formattedNumber += '(' + input.substring(0, 3);
        }
        if (input.length >= 4) {
            formattedNumber += ') ' + input.substring(3, 6);
        }
        if (input.length >= 7) {
            formattedNumber += '-' + input.substring(6, 10);
        }

        setPhone(formattedNumber);

        if (phoneSpan === 'Phone number is required') {
            if (formattedNumber !== '') setPhoneSpan('');
        } else if (phoneSpan === 'Phone number must be 10 digits') {
            if (formattedNumber.length === 14) setPhoneSpan('');
        }
    }

    const handleSsn = (e: React.ChangeEvent<HTMLInputElement>): void => {
        const input = e.target.value.replace(/\D/g, ''); // Remove all non-numeric characters
        let formattedNumber = '';

        if (input.length > 0) {
            formattedNumber += input.substring(0, 3);
        }
        if (input.length >= 4) {
            formattedNumber += '-' + input.substring(3, 5);
        }
        if (input.length >= 6) {
            formattedNumber += '-' + input.substring(5, 9);
        }

        setSsn(formattedNumber);

        if (ssnSpan === 'SSN is required') {
            if (formattedNumber !== '') setSsnSpan('');
        } else if (ssnSpan === 'SSN must be 9 digits') {
            if (formattedNumber.length === 11) setSsnSpan('');
        }
    }

    const handleNewCustomer = async (e: React.MouseEvent<HTMLInputElement>) => {
        e.preventDefault();
        error.current = false;

        if (!firstName) {
            setFirstNameSpan('First name is required')
            error.current = true;
        }

        if (!lastName) {
            setLastNameSpan('Last name is required')
            error.current = true;
        }

        if (!phone) {
            setPhoneSpan('Phone number is required')
            error.current = true;
        } else if (phone.length  < 14) {
            setPhoneSpan('Phone number must be 10 digits');
            error.current = true;
        }

        if (!ssn) {
            setSsnSpan('SSN is required');
            error.current = true;
        } else if (ssn.length < 11) {
            setSsnSpan('SSN must be 9 digits');
            error.current = true;
        }

        if (error.current) return;

        const customer: CustomerI = {
            customerId: 1,
            first_name: firstName,
            last_name: lastName,
            phone: phone
        };

        const newCustomer = customer;
        //const newCustomer = await createCustomer(customer);
        if (!newCustomer) {
            console.error(newCustomer);
        } else {
            navigate(`/noAccount/${newCustomer.customerId}`);
        }
    }

    return (
        <>
            <div id="newCustomerOverlay" onClick={onClose}>
                <div id="newCustomerModal" onClick={(e) => e.stopPropagation()}>
                    <div id="modalHeader">
                        <h2 id="modalTitle">New Customer</h2>
                        <div id="modalCloseButton">
                            <span id="modalClose" className="close" onClick={onClose}>&times;</span>
                        </div>
                    </div>
                    <form id="modalForm">
                        <div id="modalFormContainer">
                            <div id="modalLabelContainer" className="modalContainer">
                                <label id="modalFirstNameLabel" className="modalLabel" htmlFor="firstName">First Name:</label>
                                <label id="modalLastNameLabel" className="modalLabel" htmlFor="lastName">Last Name:</label>
                                <label id="modalSsnLabel" className="modalLabel" htmlFor="ssn">SSN:</label>
                                <label id="modalPhoneLabel" className="modalLabel" htmlFor="phone">Phone:</label>
                            </div>
                            <div id="modalInputContainer" className="modalContainer">
                                <input type="text" id="modalFirstName" value={firstName} className="modalInput" name="firstName" onChange={handleAlphaInput}/>
                                <input type="text" id="modalLastName" value={lastName} className="modalInput" name="lastName" onChange={handleAlphaInput}/>
                                <input type="text" inputMode='numeric' id="modalSsn" value={ssn} className="modalInput" name="ssn" onChange={handleSsn}/>
                                <input type="tel" id="modalPhone" value={phone} className="modalInput" name="phone" onChange={handlePhone}/>
                            </div>
                            <div id="modalSpanContainer" className="modalContainer">
                                <span id="modalFirstNameSpan" className="modalSpan">{firstNameSpan}</span>
                                <span id="modalLastNameSpan" className="modalSpan">{lastNameSpan}</span>
                                <span id="modalSsnSpan" className="modalSpan">{ssnSpan}</span>
                                <span id="modalPhoneSpan" className="modalSpan">{phoneSpan}</span>
                            </div>
                        </div>
                        <input id="modalSubmit" type="submit" value="Submit" onClick={handleNewCustomer} />
                    </form>
                </div>
            </div>
        </>
    );
}

export default NewCustomer;