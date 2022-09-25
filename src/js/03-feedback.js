import throttle from "lodash.throttle";

const formRef = document.querySelector('.feedback-form');
const LOCAL_STORAGE_KEY = 'feedback-form-state';


const save = (key, value) => {
    try {
        const serializedState = JSON.stringify(value);
        localStorage.setItem(key, serializedState);
    } catch (error) {
        console.error("Set state error: ", error.message);
    }
};

const load = key => {
    try {
        const serializedState = localStorage.getItem(key);
        return serializedState === null ? undefined : JSON.parse(serializedState);
    } catch (error) {
        console.error("Get state error: ", error.message);
    }
};

const remove = key => {
    try {
        localStorage.removeItem(key);
    } catch (error) {
        console.error("Get state error: ", error.message);
    }
};

textPage();

const addTextIput = event => {
    
    const {name, value} = event.target;
    try {
        let saveMassage = load(LOCAL_STORAGE_KEY);
        saveMassage = saveMassage ? saveMassage : {};
    
        saveMassage[name] = value;
    
        save(LOCAL_STORAGE_KEY, saveMassage);
    } catch (error) {
        console.log(error);
    }
}


const throttleFormInput = throttle(addTextIput, 1000);
formRef.addEventListener('input', throttleFormInput);

function textPage() {
    const saveMassage = load(LOCAL_STORAGE_KEY);
    if(!saveMassage) {
        return;
    }

    Object.entries(saveMassage).forEach(([name, value]) => {
        formRef.elements[name].value = value;
    })
    }

const formReset = event => {
    event.preventDefault();
    const {
        elements: { email, message },
    } = event.currentTarget;
    const formSubmit = {
        email: email.value,
        message: message.value,
    };
    console.log(formSubmit);
    event.currentTarget.reset();
    remove(LOCAL_STORAGE_KEY);
}

formRef.addEventListener('submit', formReset);

