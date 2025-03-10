

import { useState, useEffect, FocusEvent, useRef } from 'react';
import Confirm from './Confirm';

import '../styles/Incident.css';

interface BarBooleanI {
    mouseIn: boolean;
    focused: boolean;
    textIn: boolean;
}

const Incident = () => {
    const issueRef = useRef<string>('');
    const solutionRef = useRef<string>('');
    const [issue, setIssue] = useState<string>('');
    const [solution, setSolution] = useState<string>('');
    const spanHeight = useRef<number>(0);
    const barBoolean = useRef<BarBooleanI[]>([]);
    const [isModalOpen, setIsModalOpen] = useState<boolean>(false);
    const errors = useRef<number>(0);
    const [branch, setBranch] = useState<string>('');
    const [phone, setPhone] = useState<string>('');
    const [ssn, setSSN] = useState<string>('');
    const [firstName, setFirstName] = useState<string>('');
    const [lastName, setLastName] = useState<string>('');
    const [additionalDetails, setAdditionalDetails] = useState<string>('');

    const[branchSpan, setBranchSpan] = useState<string>('');
    const[phoneSpan, setPhoneSpan] = useState<string>('');
    const[ssnSpan, setSSNSpan] = useState<string>('');
    const[firstNameSpan, setFirstNameSpan] = useState<string>('');
    const[lastNameSpan, setLastNameSpan] = useState<string>('');
    const[issueSpan, setIssueSpan] = useState<string>('');
    const[solutionSpan, setSolutionSpan] = useState<string>('');
    const[closeSpan, setCloseSpan] = useState<string>('');

    useEffect(() => {
        const bars = document.getElementsByClassName('incBar');
        const spans = document.getElementsByClassName('incSpan');
        const errorSpans = document.getElementsByClassName('errorSpan');
        spanHeight.current = (spans[0] as HTMLElement).offsetHeight;

        const mutationObservers: MutationObserver[] = [];

        for (let i = 0; i < bars.length; i++) {
            const bar = bars[i] as HTMLElement;
            const span = spans[i] as HTMLElement;
            const errorSpan = errorSpans[i] as HTMLElement;

            barBoolean.current.push({
                mouseIn: false,
                focused: false,
                textIn: false
            });
            bar.setAttribute('key', i.toString());
            const rect = bar.getBoundingClientRect();

            bar.addEventListener('mouseenter', () => {
                barBoolean.current[i].mouseIn = true;

                span.style.setProperty('transition', 'none');
                if (barBoolean.current[i].focused) {
                    span.style.setProperty('color', '#367bd0');
                } else {
                    if (bar.id !== 'incSolBar' && barBoolean.current[i].textIn) span.style.setProperty('color', '#000');
                    if (bar.id === 'incSolBar' && issueRef.current !== '') {
                        span.style.setProperty('color', '#000');
                        bar.style.setProperty('border-color', '#000');
                    }
                }
            });

            bar.addEventListener('mouseleave', () => {
                barBoolean.current[i].mouseIn = false;

                span.style.setProperty('transition', 'none');
                if (!barBoolean.current[i].focused) {
                    span.style.setProperty('color', '#cacaca');
                    if (bar.id === 'incSolBar') {
                        bar.style.setProperty('border-color', '#cacaca');
                    }
                }
            });

            if (bar.id !== 'incIssueBar' && bar.id !== 'incSolBar') {
                if (bar.id === 'incADBar') {
                    span.style.setProperty('top', `${rect.top + ((rect.height / 3 / 2) - (spanHeight.current / 2) + 1) + window.scrollY}px`);
                } else {
                    span.style.setProperty('top', `${rect.top + ((rect.height / 2) - (spanHeight.current / 2) - 3) + window.scrollY}px`);
                }
                span.style.setProperty('left', `${rect.left + 10}px`);
                span.style.setProperty('font-size', '16px');
            } else {
                span.style.setProperty('top', `${rect.top - (spanHeight.current / 2) + 2}px`);
                span.style.setProperty('left', `${rect.left + 10}px`);
                span.style.setProperty('font-size', '12px');
            }

            const updatePosition = () => {
                const newRect = bar.getBoundingClientRect();
                if (bar.id !== 'incIssueBar' && bar.id !== 'incSolBar') {
                    if (barBoolean.current[i].focused || barBoolean.current[i].textIn) {
                        span.style.setProperty('top', `${newRect.top - (spanHeight.current / 2) + 2 + window.scrollY}px`);
                        span.style.setProperty('left', `${newRect.left + 10 + window.scrollX}px`);
                    } else {
                        if (bar.id === 'incADBar') {
                            span.style.setProperty('top', `${newRect.top + ((newRect.height / 3 / 2) - (spanHeight.current / 2) + 1) + window.scrollY}px`);
                        } else {
                            span.style.setProperty('top', `${newRect.top + ((newRect.height / 2) - (spanHeight.current / 2) - 3) + window.scrollY}px`);
                        }
                    }
                } else {
                    span.style.setProperty('top', `${newRect.top - (spanHeight.current / 2) + 2}px`);
                }
                span.style.setProperty('left', `${newRect.left + 10}px`);
            }


            const mutationObserver = new MutationObserver(() => setTimeout(updatePosition, 0));

            mutationObserver.observe(errorSpan, { childList: true, subtree: true, attributes: true});

            mutationObservers.push(mutationObserver);
        }

        document.body.addEventListener('scroll', handleScroll);
        window.addEventListener('resize', handleScroll);

        return () => {
            for (let i = 0; i < bars.length; i++) {
                const bar = bars[i] as HTMLElement;
                bar.removeEventListener('mouseenter', () => {});
                bar.removeEventListener('mouseleave', () => {});
            }

            document.body.removeEventListener('scroll', handleScroll);
            window.removeEventListener('resize', handleScroll);

            mutationObservers.forEach((mutationObserver) => {
                mutationObserver.disconnect();
            });
        };
    }
    , []);

    useEffect(() => {
        const form = document.getElementById('incForm') as HTMLElement;

        const updateForm = () => {
            const bars = document.getElementsByClassName('incBar');
            const spans = document.getElementsByClassName('incSpan');

            for (let i = 0; i < bars.length; i++) {
                const bar = bars[i] as HTMLElement;
                const span = spans[i] as HTMLElement;
                const newRect = bar.getBoundingClientRect();
                if (bar.id !== 'incIssueBar' && bar.id !== 'incSolBar') {
                    if (barBoolean.current[i].focused || barBoolean.current[i].textIn) {
                        span.style.setProperty('top', `${newRect.top - (spanHeight.current / 2) + 2 + window.scrollY}px`);
                        span.style.setProperty('left', `${newRect.left + 10 + window.scrollX}px`);
                    } else {
                        if (bar.id === 'incADBar') {
                            span.style.setProperty('top', `${newRect.top + ((newRect.height / 3 / 2) - (spanHeight.current / 2) + 1) + window.scrollY}px`);
                        } else {
                            span.style.setProperty('top', `${newRect.top + ((newRect.height / 2) - (spanHeight.current / 2) - 3) + window.scrollY}px`);
                        }
                    }
                } else {
                    span.style.setProperty('top', `${newRect.top - (spanHeight.current / 2) + 2}px`);
                }
                span.style.setProperty('left', `${newRect.left + 10}px`);
            }
        };

        const resizeObserver = new ResizeObserver(updateForm);

        resizeObserver.observe(form);

        return () => {
            resizeObserver.disconnect();
        }
    }, []);

    const handleScroll = () => {
        const bars = document.getElementsByClassName('incBar');
        const spans = document.getElementsByClassName('incSpan');

        for (let i = 0; i < bars.length; i++) {
            const bar = bars[i] as HTMLElement;
            const span = spans[i] as HTMLElement;
            const rect = bar.getBoundingClientRect();

            span.style.setProperty('transition', 'none');
            if (bar.id !== 'incIssueBar' && bar.id !== 'incSolBar') {
                if (barBoolean.current[i].focused || barBoolean.current[i].textIn) {
                    span.style.setProperty('top', `${rect.top - (spanHeight.current / 2) + 2 + window.scrollY}px`);
                    span.style.setProperty('left', `${rect.left + 10 + window.scrollX}px`);
                } else {
                    if (bar.id === 'incADBar') {
                        span.style.setProperty('top', `${rect.top + ((rect.height / 3 / 2) - (spanHeight.current / 2) + 1) + window.scrollY}px`);
                    } else {
                        span.style.setProperty('top', `${rect.top + ((rect.height / 2) - (spanHeight.current / 2) - 3) + window.scrollY}px`);
                    }
                    span.style.setProperty('left', `${rect.left + 10 + window.scrollX}px`);
                }
            } else {
                span.style.setProperty('top', `${rect.top - (spanHeight.current / 2) + 2 + window.scrollY}px`);
                span.style.setProperty('left', `${rect.left + 10 + window.scrollX}px`);
            }
        }
        return;
    };

    const handleBranch = (branch: string) => {
        branch = branch.replace(/[^0-9]/g, '');

        if (branchSpan === 'Branch is required') {
            if (branch !== '') {
                setBranchSpan('');
                errors.current -= 1;
                if (errors.current === 0) {
                    setCloseSpan('');
                }
            }
        }

        if (branchSpan === 'Branch must be at least 2 digits') {
            if (branch.length >= 2) {
                setBranchSpan('');
                errors.current -= 1;
                if (errors.current === 0) {
                    setCloseSpan('');
                }
            }
        }

        return branch.slice(0, 4);
    }

    const handlePhone = (phone: string) => {
        phone = phone.replace(/[^0-9]/g, '');
        if (phone.length > 0) {
            phone = '(' + phone;
        }

        if (phone.length > 4) {
            phone = phone.slice(0, 4) + ') ' + phone.slice(4);
        }

        if (phone.length > 9) {
            phone = phone.slice(0, 9) + '-' + phone.slice(9, 13);
        }

        if (phoneSpan === 'Phone is required') {
            if (phone !== '') {
                setPhoneSpan('');
                errors.current -= 1;
                if (errors.current === 0) {
                    setCloseSpan('');
                }
            }
        }

        if (phoneSpan === 'Phone must be 10 digits') {
            if (phone.length === 14) {
                setPhoneSpan('');
                errors.current -= 1;
                if (errors.current === 0) {
                    setCloseSpan('');
                }
            }
        }

        return phone;
    }

    const handleSSN = (ssn: string) => {
        ssn = ssn.replace(/[^0-9\s]/g, '');
        let formattedSearch = ssn.slice(0, 3);

        if (ssn.length > 3) {
            formattedSearch += '-' + ssn.slice(3, 5);
        }

        if (ssn.length > 5) {
            formattedSearch += '-' + ssn.slice(5, 9);
        }

        if (ssnSpan === 'SSN is required') {
            if (formattedSearch !== '') {
                setSSNSpan('');
                errors.current -= 1;
                if (errors.current === 0) {
                    setCloseSpan('');
                }
            }
        }

        if (ssnSpan === 'SSN must be 9 digits') {
            if (formattedSearch.length === 11) {
                setSSNSpan('');
                errors.current -= 1;
                if (errors.current === 0) {
                    setCloseSpan('');
                }
            }
        }

        return formattedSearch;
    }

    const handleIncChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        const bar = e.target.parentElement as HTMLElement;

        if (e.target.id === 'incBranch') {
            setBranch(handleBranch(e.target.value));
        }

        if (e.target.id === 'incPhone') {
            setPhone(handlePhone(e.target.value));
        }

        if (e.target.id === 'incSSN') {
            setSSN(handleSSN(e.target.value));
        }

        if (e.target.id === 'incFN' || e.target.id === 'incLN') {
            e.target.value = e.target.value.replace(/[^a-zA-Z]/g, '');

            if (e.target.id === 'incFN') {
                setFirstName(e.target.value);
                if (firstNameSpan !== '') {
                    if (e.target.value !== '') {
                        setFirstNameSpan('');
                        errors.current -= 1;
                        if (errors.current === 0) {
                            setCloseSpan('');
                        }
                    }
                }
            } else {
                setLastName(e.target.value);
                if (lastNameSpan !== '') {
                    if (e.target.value !== '') {
                        setLastNameSpan('');
                        errors.current -= 1;
                        if (errors.current === 0) {
                            setCloseSpan('');
                        }
                    }
                }
            }
        }

        if (e.target.id === 'incAD') {
            setAdditionalDetails(e.target.value);
        }

        const key = bar.getAttribute('key');
        if (key !== null) {
            if (e.target.value === '') {
                barBoolean.current[parseInt(key)].textIn = false;
            } else {
                barBoolean.current[parseInt(key)].textIn = true;
            }
        }
    }

    const handleIncFocus = (e: FocusEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
        const bar = e.target.parentElement as HTMLElement;
        const span = (bar.nextElementSibling as HTMLElement);
        const rect = bar.getBoundingClientRect();
        if (bar.id === 'incIssueBar' || bar.id === 'incSolBar') {
        }

        const key = bar.getAttribute('key');
        if (key !== null) {
            barBoolean.current[parseInt(key)].focused = true;
            if (bar.id !== 'incIssueBar' && bar.id !== 'incSolBar') {
                if (!barBoolean.current[parseInt(key)].textIn) {
                    span.style.setProperty('transition', 'all 0.4s');
                } else {
                    span.style.setProperty('transition', 'none');
                }
            }
        }

        span.style.setProperty('top', `${rect.top - (spanHeight.current / 2) + 2}px`);
        span.style.setProperty('font-size', '12px');
        //if (issue !== '' && e.target.id === 'incSol') {
            span.style.setProperty('color', '#367bd0');
        //}
    }

    const handleIncBlur = (e: FocusEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
        const bar = e.target.parentElement as HTMLElement;
        const span = bar.nextElementSibling as HTMLElement;

        const key = bar.getAttribute('key');
        if (key !== null) {
            barBoolean.current[parseInt(key)].focused = false;
        }

        span.style.setProperty('color', '#cacaca');
        if (bar.id === 'incSolBar') {
            bar.style.setProperty('border-color', '#cacaca');
        }

        if (bar.id !== 'incIssueBar' && bar.id !== 'incSolBar') {
            if (e.target.value === '') {
                const rect = bar.getBoundingClientRect();

                span.style.setProperty('transition', 'all 0.4s');
                if (bar.id === 'incADBar') {
                    span.style.setProperty('top', `${rect.top + ((rect.height / 3 / 2) - (spanHeight.current / 2) + 1) + window.scrollY}px`);
                } else {
                    span.style.setProperty('top', `${rect.top + ((rect.height / 2) - (spanHeight.current / 2) - 3) + window.scrollY}px`);
                }
                span.style.setProperty('font-size', '16px');
            }
        }
    }

    const handleIssueChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
        if (issueSpan !== '') {
            if (e.target.value !== '') {
                setIssueSpan('');
                errors.current -= 1;
                if (errors.current === 0) {
                    setCloseSpan('');
                }
            }
        }

        issueRef.current = e.target.value;
        setIssue(e.target.value);
    }

    const handleSolutionChange = (e: React.ChangeEvent<HTMLSelectElement>) => {

        if (solutionSpan !== '') {
            if (e.target.value !== '') {
                setSolutionSpan('');
                errors.current -= 1;
                if (errors.current === 0) {
                    setCloseSpan('');
                }
            }
        }

        solutionRef.current = e.target.value;
        setSolution(e.target.value);
    }

    const openModal = () => {
        if (branch === '' && branchSpan === '') {
            setBranchSpan('Branch is required');
            errors.current += 1;
        } else if (branch.length < 2 && branchSpan === '') {
            setBranchSpan('Branch must be at least 2 digits');
            errors.current += 1;
        } else {
            setBranchSpan('');
        }

        if (phone === '' && phoneSpan === '') {
            setPhoneSpan('Phone is required');
            errors.current += 1;
        } else if (phone.length < 14 && phoneSpan === '') {
            setPhoneSpan('Phone must be 10 digits');
            errors.current += 1;
        } else {
            setPhoneSpan('');
        }

        if (ssn === '' && ssnSpan === '') {
            setSSNSpan('SSN is required');
            errors.current += 1;
        } else if (ssn.length < 11 && ssnSpan === '') {
            setSSNSpan('SSN must be 9 digits');
            errors.current += 1;
        } else {
            setSSNSpan('');
        }

        if (firstName === '' && firstNameSpan === '') {
            setFirstNameSpan('First Name is required');
            errors.current += 1;
        } else {
            setFirstNameSpan('');
        }

        if (lastName === '' && lastNameSpan === '') {
            setLastNameSpan('Last Name is required');
            errors.current += 1;
        } else {
            setLastNameSpan('');
        }

        if (issue === '' && issueSpan === '') {
            setIssueSpan('Issue is required');
            errors.current += 1;
        } else {
            setIssueSpan('');
        }

        if (solution === '' && solutionSpan === '') {
            setSolutionSpan('Solution is required');
            errors.current += 1;
        } else {
            setSolutionSpan('');
        }
        if (errors.current > 0) {
            setCloseSpan('There is a problem with your form.');
            return;
        } else {
            setCloseSpan('');

            setIsModalOpen(true);
        }
    }
    const closeModal = () => {
        setIsModalOpen(false);
    }

    return (
        <div id="incComponent">
            <div id="outerIncContainer">
                <div id="incContainer">
                    <form id="incForm">
                        <div id="incBranchCell" className="incFormCell incFormCol1 incFormRow1">
                        <span id="incBranchBarSpan" className="errorSpan">{branchSpan}</span>
                        <div id="incBranchBarContainer">
                            <div id="incBranchBar" className="incBar">
                                <input type="text" inputMode="numeric" value={branch} id="incBranch" className="incInput" name="incBranch" min="10" max="9999" step="0" onFocus={handleIncFocus} onBlur={handleIncBlur} onChange={handleIncChange} />
                            </div>
                            <span id="incBranchSpan" className="incSpan">Branch</span>
                            <input type="button" id="incBranchSearch" className="incButton" value="Search for Branch" />
                        </div>
                        </div>
                        <div className="incFormCell incFormCol2 incFormRow1 incFormEmpty"></div>
                        <div id="incPhoneCell" className="incFormCell incFormCol1 incFormRow2">
                            <span id="incPhoneBarSpan" className="errorSpan">{phoneSpan}</span>
                            <div id="incPhoneBar" className="incBar">
                                <input type="tel" id="incPhone" value={phone} className="incInput" name="incPhone" onFocus={handleIncFocus} onBlur={handleIncBlur} onChange={handleIncChange} />
                            </div>
                            <span id="incPhoneSpan" className="incSpan">Phone</span>
                        </div>
                        <div id="incSSNCell" className="incFormCell incFormCol2 incFormRow2">
                            <span id="incSSNBarSpan" className="errorSpan">{ssnSpan}</span>
                            <div id="incSSNBar" className="incBar">
                                <input type="text" inputMode="numeric" value={ssn} id="incSSN" className="incInput" name="incSSN" onFocus={handleIncFocus} onBlur={handleIncBlur} onChange={handleIncChange} />
                            </div>
                            <span id="incSSNSpan" className="incSpan">SSN</span>
                        </div>
                        <div id="incFNCell" className="incFormCell incFormCol1 incFormRow3">
                            <span id="incFNBarSpan" className="errorSpan">{firstNameSpan}</span>
                            <div id="incFNBar" className="incBar">
                                <input type="text" id="incFN" value={firstName} className="incInput" name="incFN" onFocus={handleIncFocus} onBlur={handleIncBlur} onChange={handleIncChange} />
                            </div>
                            <span id="incFNSpan" className="incSpan">First Name</span>
                        </div>
                        <div id="incLNCell" className="incFormCell incFormCol2 incFormRow3">
                            <span id="incLNBarSpan" className="errorSpan">{lastNameSpan}</span>
                            <div id="incLNBar" className="incBar">
                                <input type="text" id="incLN" value={lastName} className="incInput" name="incLN" onFocus={handleIncFocus} onBlur={handleIncBlur} onChange={handleIncChange} />
                            </div>
                            <span id="incLNSpan" className="incSpan">Last Name</span>
                        </div>
                        <div id="incIssueCell" className="incFormCell incFormCol1 incFormRow4">
                            <span id="incIssueBarSpan" className="errorSpan">{issueSpan}</span>
                            <div id="incIssueBar" className="incBar">
                                <select id="incIssue" value={issue} className="incInput" onChange={handleIssueChange} onFocus={handleIncFocus} onBlur={handleIncBlur}>
                                    <option className="defaultValue" value="" disabled>Select an Issue</option>
                                    <option value="option1">Online Account</option>
                                    <option value="option2">Payment</option>
                                    <option value="option3">Credit Score</option>
                                </select>
                            </div>
                            <span id="incIssueSpan" className="incSpan">Issue</span>
                        </div>
                        <div id="incSolCell" className="incFormCell incFormCol2 incFormRow4">
                            <span id="incSolBarSpan" className="errorSpan">{solutionSpan}</span>
                            <div id="incSolBar" className="incBar">
                                {issue === "" ? 
                                    <select id="incSol" value={solution} className="incInput" disabled> 
                                        <option className="defaultValue" value="" disabled>Select a Solution</option>
                                    </select>
                                : 
                                    <select id="incSol" value={solution} className="incInput" onChange={handleSolutionChange} onFocus={handleIncFocus} onBlur={handleIncBlur}>
                                        <option className="defaultValue" value="" disabled>Select a Solution</option>
                                        <option value="option1">Reset Password</option>
                                        <option value="option2">Change Payment Method</option>
                                        <option value="option3">Request Credit Report</option>
                                    </select>
                                }
                            </div>
                            <span id="incSolSpan" className="incSpan">Solution</span>
                        </div>
                        <div id="incADContainer">
                            <div id="incADBar" className="incBar">
                                <textarea id="incAD" className="incInput" value={additionalDetails} name="incAD" onFocus={handleIncFocus} onBlur={handleIncBlur} onChange={handleIncChange}></textarea>
                            </div>
                            <span id="incADSpan" className="incSpan">Additional Details...</span>
                            <div id="incCloseContainer">
                                <input type="button" id="incClose" className="incButton" value="Close Ticket" onClick={openModal}/>
                                <span id="incCloseSpan" className="errorSpan">{closeSpan}</span>
                            </div>
                        </div>
                    </form>
                </div>
            </div>
            <Confirm isOpen={isModalOpen} onClose={closeModal} />
        </div>
    );
}

export default Incident;