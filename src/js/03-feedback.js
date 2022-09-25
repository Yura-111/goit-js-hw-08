import throttle from "lodash.throttle";

const formRef = document.querySelector('.feedback-form');
const LOCAL_STORAGE_KEY = 'feedback-form-state';
// const formData = [];


// function addTextIput (event) {
//     const message = event.target.value;
//     const{name, value} = event.target;
//         formData[name] = value;
//         localStorage.setItem(LOCAL_STORAGE_KEY, message);
//         console.log(formData);
// }
// formRef.addEventListener('input', addTextIput);

// -------------initPage()

// const addTextIput = event => {
//     const{name, value} = event.target;
//     formData[name] = value;
//     localStorage.setItem(LOCAL_STORAGE_KEY, formData);
// }
// formRef.addEventListener('input', addTextIput);

// function initPage() {
//     const saveData = localStorage.getItem(LOCAL_STORAGE_KEY);
//     if(saveData) {
//         const parseData = JSON.parse(saveData)
//         console.log(saveData);
//     }
// ---------}

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
        saveMassage = saveMassage ? saveMassage : [];
    
        saveMassage[name] = value;
    
        save(LOCAL_STORAGE_KEY, saveMassage);
        console.log(saveMassage);
    } catch (error) {
        console.log(error);
    }
}

const throttleFormInput = throttle(addTextIput, 1000);
formRef.addEventListener('input', throttleFormInput);

function textPage() {
    const saveMassage = load(LOCAL_STORAGE_KEY);
    console.log(saveMassage);
    if(!saveMassage) {
        return;
    }

    Object.entries(saveMassage).forEach(([name, value]) => {
        formRef.elements[name].value = value;
        console.log(name);
        console.log(value);
    })
    }

const formReset = event => {
    event.preventDefault();
    event.currentTarget.reset();
    remove(LOCAL_STORAGE_KEY);
}

formRef.addEventListener('resrt', formReset);

